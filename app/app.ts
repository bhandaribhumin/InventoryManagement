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
  sale_prise: number;
  shipping_discount: number;
}
interface inventory {
  mask: number;
  gloves: number;
  mask_prise: number;
  gloves_prise: number;
}
const state: stateType | any = {
  country: Country.uk,
  passport_number: "",
  uk_inventory: {
    mask: 100,
    gloves: 100,
    mask_prise: 65,
    gloves_prise: 100,
  },
  germany_inventory: {
    mask: 100,
    gloves: 50,
    mask_prise: 100,
    gloves_prise: 150,
  },
  shipping_charge: 400,
  shipping_discount: 20,
  sale_prise: 0,
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

let isPassportCountry: Country | undefined = undefined;
const initInput = () => {
  console.log("Enter Input: ");
  readline.question("", async (input: any) => {
    let glovesCount = 0;
    let maskCount = 0;
    const allInputs = input.replace(/\s/g, "").split(":");
    console.log(allInputs);
    if (allInputs.length <= 4) {
      console.log("!ERROR!Input Not Possible");
      initInput();
      return;
    }
    inputValues.purchase_country = allInputs[0].toLowerCase();
    const passportNumber = allInputs[1].toLowerCase();
    if (passportNumber.length <= 7) {
      await getInputItems(allInputs, 1);
    } else {
      await getInputItems(allInputs, 2);
      isPassportCountry = await checkCountryPassport(passportNumber);
      inputValues.passport_country = isPassportCountry;
    }
    console.log(inputValues.purchase_country);
    console.log(inputValues.purchase_country in Country);

    if (!(inputValues.purchase_country in Country)) {
      console.log("Country not valid!");
      initInput();
      return;
    }

    let shippingCharge: number = 0;

    if (inputValues.purchase_country == "uk") {
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
    glovesCount + inputValues.gloves * state.uk_inventory.gloves_prise;
  maskCount = maskCount + inputValues.mask * state.uk_inventory.mask_prise;
  state.sale_prise = glovesCount + maskCount + shippingCharge;
    console.log("Your Input ", inputValues);
    console.log("new state ", state);
    console.log(
      `${state.sale_prise}:${state.uk_inventory.mask}:${state.germany_inventory.mask} ${state.uk_inventory.gloves}:${state.germany_inventory.gloves}`
    );

    } else {
      state.germany_inventory.gloves -= inputValues.gloves;
      state.germany_inventory.mask -= inputValues.mask;
      console.log(state.germany_inventory.mask);
      console.log(state.germany_inventory.gloves);
      glovesCount = inputValues.gloves * state.germany_inventory.gloves_prise;
      maskCount = inputValues.mask * state.germany_inventory.mask_prise;
      state.sale_prise = glovesCount + maskCount + shippingCharge;

      const glovesStockCount: number =
        state.germany_inventory.gloves - inputValues.gloves;
      const maskStockCount: number = state.germany_inventory.mask - inputValues.mask;
      if (isPassportCountry == "uk") {
        state.shipping_charge -=
          (state.shipping_discount / 100) * state.shipping_charge;
      }
      if (maskStockCount < 0) {
        maskCount = await getStock(Country.uk, maskStockCount, "mask");
        state.germany_inventory.mask = 0;
        shippingCharge = state.shipping_charge;
      } else {
        state.germany_inventory.mask = maskStockCount;
      }
      if (glovesStockCount < 0) {
        glovesCount = await getStock(
          Country.uk,
          glovesStockCount,
          "gloves"
        );
        console.log(glovesCount);
        state.germany_inventory.gloves = 0;
        shippingCharge = state.shipping_charge;
      } else {
        state.germany_inventory.gloves = glovesStockCount;
      }
     
glovesCount =
    glovesCount + inputValues.gloves * state.germany_inventory.gloves_prise;
  maskCount = maskCount + inputValues.mask * state.germany_inventory.mask_prise;
  state.sale_prise = glovesCount + maskCount + shippingCharge;
    console.log("Your Input ", inputValues);
    console.log("new state ", state);
    console.log(
      `${state.sale_prise}:${state.uk_inventory.mask}:${state.germany_inventory.mask} ${state.uk_inventory.gloves}:${state.germany_inventory.gloves}`
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
  count = state[countryInventory][`${type}_prise`] * remainingStock;
  inputValues[type] -= remainingStock;
  state.shipping_charge *= Math.ceil(remainingStock / 10);
  return count;
};
/*
  Return inputType
  */
const getInputItems = (inputs: string[], index: number): inputType => {
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
  if (
    passportNumber.length == 13 &&
    passportNumber.charAt(0) === "b" &&
    !isNaN(passportNumber.substring(1, 4)) &&
    !passportNumber.substring(4, 6).match(/[0-9]/i)
  ) {
    return Country.uk;
  } else if (
    passportNumber.length == 12 &&
    passportNumber.charAt(0) === "a" &&
    isNaN(passportNumber.substring(1, 2)) &&
    isNaN(passportNumber.substring(2, 3))
  ) {
    return Country.germany;
  } else {
    return undefined;
  }
};