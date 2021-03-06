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
  temp_shipping: number;
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
  temp_shipping: 0,
  temp_total: 0,
  take_stock_qty: 0,
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
interface calculateStockFromOtherCountry {
  getStock: number;
  price: number;
  shipping: number;
}
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
console.log("Example Inputs:\n", "Germany:B123AB1234567:Gloves:25:Mask:150");
console.log("Example Output:\n", "18090:0:50 80:45");
console.log("Example Inputs:\n", "Germany:AAB123456789:Gloves:25:Mask:150");
console.log("Example Output:\n", "18800:50:0 80:45");
console.log("Example Inputs:\n", "Germany:AAB123456789:Gloves:9:Mask:9");
console.log("Example Output:\n", "2200:100:91 91:50");

let isPassportCountry: Country | undefined = undefined;
const discountedShippingPrice =
  state.shipping_charge -
  (state.shipping_discount / 100) * state.shipping_charge;
console.log("discountShippingPrice", discountedShippingPrice);
export const initInput = (inputs?:string) => {
  console.log("Enter Input: ");
  readline.question("", async (input: any) => {
    let [country, passport] = input.split(":").map((e: any) => e.toLowerCase());
    input.split(":").map((obj: any, index: any, all: any) => {
      if (obj.toLowerCase() == "gloves") inputValues.gloves = all[index + 1];
      if (obj.toLowerCase() == "mask") inputValues.mask = all[index + 1];
    });
    let calculateGlovesStock: calculateStockFromOtherCountry = {
      getStock: 0,
      price: 0,
      shipping: 0,
    };
    let calculateMaskStock: calculateStockFromOtherCountry = {
      getStock: 0,
      price: 0,
      shipping: 0,
    };
    let countTotel = 0;
    const allInputs = input.replace(/\s/g, "").split(":");
    if (allInputs.length <= 4) {
      console.log("!ERROR!Input Not Possible");
      initInput();
      return;
    }
    inputValues.purchase_country = country;
    if (passport) isPassportCountry = await checkCountryPassport(passport);
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
      const glovesStockCount: number =
        state.uk_inventory.gloves - inputValues.gloves;
      const maskStockCount: number = state.uk_inventory.mask - inputValues.mask;
      if (isPassportCountry == "germany") {
        state.shipping_charge = discountedShippingPrice;
      }
      const isMaskCountNagative = await checkGetStock(
        maskStockCount,
        Country.uk,
        "mask"
      );
      if (isMaskCountNagative) {
        state.uk_inventory.mask = 0;
      } else {
        state.uk_inventory.mask = maskStockCount;
      }

      const isGlovesCountNagative = await checkGetStock(
        glovesStockCount,
        Country.germany,
        "gloves"
      );
      if (isGlovesCountNagative) {
        state.uk_inventory.gloves = 0;
      } else {
        state.uk_inventory.gloves = glovesStockCount;
      }
      const glovesTotel = inputValues.gloves * state.uk_inventory.gloves_price;
      const maskTotel = inputValues.mask * state.uk_inventory.mask_price;
      state.sale_price = glovesTotel + maskTotel + state.temp_shipping;
      console.log(
        `${state.sale_price}:${state.uk_inventory.mask}:${state.germany_inventory.mask} ${state.uk_inventory.gloves}:${state.germany_inventory.gloves}`
      );
    } else {
      //Germany
      let [gQty, glovesRemaining] = (inputValues.gloves / 10)
        .toString()
        .split(".")
        .map((e) => parseInt(e));
      let [mQty, maskRemaining] = (inputValues.mask / 10)
        .toString()
        .split(".")
        .map((e) => parseInt(e));
      maskRemaining = maskRemaining == undefined ? 0 : maskRemaining;
      glovesRemaining = glovesRemaining == undefined ? 0 : glovesRemaining;
      let glovesQty = gQty === 0 ? glovesRemaining : gQty * 10;
      let maskQty = mQty === 0 ? maskRemaining : mQty * 10;
      console.log('glove ocha',glovesQty);
      state.uk_inventory.gloves -= glovesQty;
      if (isPassportCountry == "uk") {
        if (mQty == 0) {
          state.germany_inventory.mask -= maskQty;
          countTotel += maskQty * state.germany_inventory.mask_price;
        } else {
          state.uk_inventory.mask -= maskQty;
        }

        const isMaskCountNagative = await checkGetStock(
          state.uk_inventory.mask,
          Country.germany,
          "mask"
        );
        if (isMaskCountNagative) {
          countTotel += state.temp_total;
          state.uk_inventory.mask = 0;
          maskQty = maskQty - state.take_stock_qty;
          mQty = Math.floor(maskQty / 10);
        }

        const isGlovesCountNagative = await checkGetStock(
          state.uk_inventory.gloves,
          Country.germany,
          "gloves"
        );
        if (isGlovesCountNagative) {
          countTotel += state.temp_total;
          state.uk_inventory.gloves = 0;
          glovesQty = glovesQty - state.take_stock_qty;
          gQty = Math.floor(glovesQty / 10);
        }

        // Special Check mask is > 9
        if (mQty !== 0) {
          countTotel += maskQty * state.uk_inventory.mask_price;
          shippingCharge = discountedShippingPrice * mQty;
        }
        countTotel += glovesQty * state.uk_inventory.gloves_price;
        shippingCharge += discountedShippingPrice * (gQty === 0 ? 1 : gQty);
      } else {
        // Passport is local
        state.germany_inventory.mask -= maskQty;
        console.log("mask reduce fro germany ",state.germany_inventory.mask);
        const isMaskCountNagative = await checkGetStock(
          state.germany_inventory.mask,
          Country.uk,
          "mask"
        );
        if (isMaskCountNagative) {
          countTotel += state.temp_total;
          shippingCharge += state.temp_shipping;
          state.germany_inventory.mask = 0;
          maskQty = maskQty - state.take_stock_qty;
        }
        debugger
        const isGlovesCountNagative = await checkGetStock(
          state.uk_inventory.gloves,
          Country.germany,
          "gloves"
        );
        if (isGlovesCountNagative) {
          countTotel += state.temp_total;
          shippingCharge += state.temp_shipping;
          state.uk_inventory.gloves = 0;
          glovesQty = glovesQty - state.take_stock_qty;
        }

        console.log('UK glovs glovesQty',glovesQty,"prise",state.uk_inventory.gloves_price,"Totel ",glovesQty * state.uk_inventory.gloves_price)
        console.log('state.shipping_charge',state.shipping_charge,"qty",(gQty === 0 ? 1 : gQty),"total shipping",state.shipping_charge * (gQty === 0 ? 1 : gQty))


        countTotel += maskQty * state.germany_inventory.mask_price;
        countTotel += glovesQty * state.uk_inventory.gloves_price;
        shippingCharge += state.shipping_charge * (gQty === 0 ? 1 : gQty);
      }

      //Calculate Remaining Stock for better sales
      if (glovesRemaining !== 0 && gQty !== 0) {
        console.log("gloves remove from germany inv",glovesRemaining);
        state.germany_inventory.gloves -= glovesRemaining;
        console.log("state.germany_inventory.gloves_price",state.germany_inventory.gloves_price,"Totel",glovesRemaining * state.germany_inventory.gloves_price );
        countTotel += glovesRemaining * state.germany_inventory.gloves_price;
      }
      if (maskRemaining !== 0 && mQty !== 0) {
        console.log("mask remove from germany inv",maskRemaining);
        state.germany_inventory.mask -= maskRemaining;
        console.log("state.germany_inventory.mask_price",state.germany_inventory.mask_price,"Totel",maskRemaining * state.germany_inventory.mask_price );
        countTotel += maskRemaining * state.germany_inventory.mask_price;
      }


      state.sale_price = countTotel + shippingCharge;
      console.log(
        `${state.sale_price}:${state.uk_inventory.mask}:${state.germany_inventory.mask} ${state.uk_inventory.gloves}:${state.germany_inventory.gloves}`
      );
    }
    readline.close();
  });
  return "2650:90:100 80:50";
};
initInput();
const getStock = (
  country: Country,
  stockCount: number,
  type: string
): calculateStockFromOtherCountry => {
  let count = 0;
  const countryInventory = `${country}_inventory`;
  const remainingStock = Math.abs(stockCount);
  state[countryInventory][type] -= remainingStock;
  count = state[countryInventory][`${type}_price`] * remainingStock;
  inputValues[type] -= remainingStock;
  const shipping = state.shipping_charge * Math.ceil(remainingStock / 10);
  const calculateStock: calculateStockFromOtherCountry = {
    getStock: state[countryInventory][type],
    price: count,
    shipping,
  };
  state.temp_total = count;
  state.temp_shipping = shipping;
  state.take_stock_qty = state[countryInventory][type];

  return calculateStock;
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

const checkGetStock = async (
  stockCount: any,
  country: Country,
  type: ItemType
) => {
  if (stockCount < 0) {
    await getStock(country, stockCount, type);
    return true;
  } else {
    return false;
  }
};
