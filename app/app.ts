const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
export enum Country {
  uk = "uk",
  germany = "germany",
}
type ItemType = "gloves" | "mask";
interface stateType {
  country: Country;
  passport_number?: string;
  uk_inventory: inventory;
  germany_inventory: inventory;
  shipping_charge: number;
  sale_price: number;
  shipping_discount: number;
}
interface inventory {
  mask: number;
  gloves: number;
  mask_price: number;
  gloves_price: number;
}
const state: stateType | any = {
  country: Country.uk,
  passport_number: "",
  uk_inventory: {
    mask: 100,
    gloves: 100,
    mask_price: 65,
    gloves_price: 100,
  },
  germany_inventory: {
    mask: 100,
    gloves: 50,
    mask_price: 100,
    gloves_price: 150,
  },
  shipping_charge: 400,
  shipping_discount: 20,
  sale_price: 0,
};
interface inputType {
  purchase_country: Country;
  passport_country?: string;
  mask: number;
  gloves: number;
}
const inputValues: inputType | any = {
  purchase_country: Country.uk,
  passport_country: "",
  mask: 0,
  gloves: 0,
};

const UKPassportExp = /^[Bb][0-9]{3}[a-zA-Z]{2}[a-zA-Z0-9]{7}$/g;
const GermanyPassportExp = /^[Aa][a-zA-Z]{2}[a-zA-Z0-9]{9}$/g;
console.log("current Stock");
console.log(state);
console.log("Example Inputs:\n", "UK:B123AB1234567:Gloves:20:Mask:10");
console.log("Example Output:\n", "2650:90:100 80:50");
console.log("Example Inputs:\n", "Germany:B123AB1234567:Gloves:22:Mask:10");
console.log("Example Output:\n", "3910:90:100 80:48");
console.log("Example Inputs:\n", "Germany:AAB123456789:Gloves:25:Mask:50");
console.log("Example Output:\n", "8550:100:50 80:45");
console.log("Example Inputs:\n", "UK:AAB123456789:Gloves:125:Mask:70");
console.log("Example Output:\n", "19260:30:100 0:25");
console.log("Example Inputs:\n", "UK:Gloves:50:Mask:150");
console.log("Example Output:\n", "18500:0:50 50:50");
console.log("Example Inputs:\n", "UK:Gloves:250:Mask:150");
console.log("Example Output:\n", "OUT OF STOCK:100:100 100:50");

let isPassportCountry: Country | undefined = undefined;
const discountedShippingPrice =
  state.shipping_charge -
  (state.shipping_discount / 100) * state.shipping_charge;
console.log("discountShippingPrice", discountedShippingPrice);
const initInput = () => {
  console.log("Enter Input: ");
  readline.question("", async (input: any) => {
    let glovesCount = 0;
    let maskCount = 0;
    let countTotel = 0;
    const allInputs = input.replace(/\s/g, "").split(":");
    if (allInputs.length <= 4) {
      console.log("!ERROR!Input Not Possible");
      initInput();
      return;
    }
    inputValues.purchase_country = allInputs[0].toLowerCase();
    const passportNumber = allInputs[1].toLowerCase();
    isPassportCountry = await checkCountryPassport(passportNumber);
    if (passportNumber.length <= 7) {
      await bindInputsToState(allInputs, 1);
    } else {
      await bindInputsToState(allInputs, 2);
      inputValues.passport_country = isPassportCountry;
    }
    if (!(inputValues.purchase_country in Country)) {
      console.log("Country not valid!");
      initInput();
      return;
    }
    let shippingCharge: number = 0;
    const totalMaskStock =
      state.germany_inventory.mask + state.uk_inventory.mask;
    const totalGlovesStock =
      state.germany_inventory.gloves + state.uk_inventory.gloves;
    const outOfStock = "OUT OF STOCK";
    if (
      Math.sign(totalMaskStock - inputValues.mask) === -1 ||
      Math.sign(totalGlovesStock - inputValues.gloves) === -1
    ) {
      console.log(
        `${outOfStock}:${state.uk_inventory.mask}:${state.germany_inventory.mask} ${state.uk_inventory.gloves}:${state.germany_inventory.gloves}`
      );
      initInput();
      return;
    }
    if (inputValues.purchase_country == "uk") {
      const checkOutofStock =
        Math.sign(totalMaskStock - inputValues.gloves) -
        Math.sign(state.germany_inventory.mask - inputValues.mask);
      const glovesStockCount: number =
        state.uk_inventory.gloves - inputValues.gloves;
      const maskStockCount: number = state.uk_inventory.mask - inputValues.mask;
      if (isPassportCountry == "germany") {
        state.shipping_charge -=
          (state.shipping_discount / 100) * state.shipping_charge;
      }
      if (maskStockCount < 0) {
        maskCount = await getStock(Country.germany, maskStockCount, "mask");
        state.uk_inventory.mask = 0;
        shippingCharge = state.shipping_charge;
      } else {
        state.uk_inventory.mask = maskStockCount;
      }
      if (glovesStockCount < 0) {
        glovesCount = await getStock(
          Country.germany,
          glovesStockCount,
          "gloves"
        );
        state.uk_inventory.gloves = 0;
        shippingCharge = state.shipping_charge;
      } else {
        state.uk_inventory.gloves = glovesStockCount;
      }

      glovesCount =
        glovesCount + inputValues.gloves * state.uk_inventory.gloves_price;
      maskCount = maskCount + inputValues.mask * state.uk_inventory.mask_price;
      state.sale_price = glovesCount + maskCount + shippingCharge;
      console.log(
        `${state.sale_price}:${state.uk_inventory.mask}:${state.germany_inventory.mask} ${state.uk_inventory.gloves}:${state.germany_inventory.gloves}`
      );
    } else {
      //germany
      let [gQty, glovesRemaining] = (inputValues.gloves / 10)
        .toString()
        .split(".");
      let [mQty, maskRemaining] = (inputValues.mask / 10).toString().split(".");
      console.log("gQty", gQty);
      console.log("mQty", mQty);
      console.log("gQtyP", parseInt(gQty));
      console.log("mQtyP", parseInt(mQty));
      console.log("glovesRemaining", glovesRemaining);
      console.log("maskRemaining", maskRemaining);
      const glovesQty = parseInt(gQty) * 10;
      const maskQty = parseInt(mQty) * 10;

      state.uk_inventory.gloves -= glovesQty;
      if (isPassportCountry == "uk") {
        state.uk_inventory.mask -= maskQty;
        countTotel += maskQty * state.uk_inventory.mask_price;
        countTotel += glovesQty * state.uk_inventory.gloves_price;
        shippingCharge = discountedShippingPrice * parseInt(gQty);
        shippingCharge += discountedShippingPrice * parseInt(mQty);
      } else {
        state.germany_inventory.mask -= maskQty;
        countTotel += maskQty * state.germany_inventory.mask_price;
        countTotel += glovesQty * state.uk_inventory.gloves_price;
        shippingCharge += state.shipping_charge * parseInt(gQty);
      }
      if (glovesRemaining != undefined) {
        const remainingQty = parseInt(glovesRemaining);
        state.germany_inventory.gloves -= remainingQty;
        //console.log('RemainingQty germany_inventory gloves',remainingQty," after minus ",state.germany_inventory.gloves);
        countTotel += remainingQty * state.germany_inventory.gloves_price;
        //console.log('Count Price RemainingQty germany_inventory gloves',remainingQty * state.germany_inventory.gloves_price);
      }
      if (maskRemaining != undefined) {
        const remainingQty = parseInt(maskRemaining);
        state.germany_inventory.mask -= remainingQty;
        // console.log('RemainingQty germany_inventory mask ',remainingQty," after minus ",state.germany_inventory.mask);
        countTotel += remainingQty * state.germany_inventory.mask_price;
        //console.log('Count Price RemainingQty germany_inventory mask ',remainingQty * state.germany_inventory.mask_price);
      }


      
      state.sale_price = countTotel + shippingCharge;
      console.log(
        `${state.sale_price}:${state.uk_inventory.mask}:${state.germany_inventory.mask} ${state.uk_inventory.gloves}:${state.germany_inventory.gloves}`
      );
    }
    readline.close();
  });
};
initInput();
const getStock = (
  country: Country,
  stockCount: number,
  type: string
): number => {
  let count = 0;
  const countryInventory = `${country}_inventory`;
  const remainingStock = Math.abs(stockCount);
  state[countryInventory][type] -= remainingStock;
  count = state[countryInventory][`${type}_price`] * remainingStock;
  inputValues[type] -= remainingStock;
  state.shipping_charge *= Math.ceil(remainingStock / 10);
  return count;
};
/*
  Return inputType
  */
const bindInputsToState = (inputs: string[], index: number): inputType => {
  for (let i = index; i < inputs.length; i++) {
    if (inputs[i].toLowerCase() == "gloves") {
      inputValues.gloves = parseInt(inputs[i + 1]);
    } else if (inputs[i].toLowerCase() == "mask") {
      inputValues.mask = parseInt(inputs[i + 1]);
    }
  }
  return inputValues;
};
/*
  Return {boolean} if true country is UK if false country is Germany
  */
const checkCountryPassport = (passportNumber: any): Country | undefined => {
  if (UKPassportExp.test(passportNumber)) {
    state.country = Country.uk;
    return Country.uk;
  } else if (GermanyPassportExp.test(passportNumber)) {
    state.country = Country.germany;
    return Country.germany;
  } else {
    return undefined;
  }
};
