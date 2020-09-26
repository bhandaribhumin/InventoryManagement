const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const state = {
  country: "uk",
  passport_number: "",
  uk_inventory: {
      mask: 100,
      gloves: 100,
      mask_prise: 65,
      gloves_prise: 100
  },
  germany_inventory: {
      mask: 100,
      gloves: 50,
      mask_prise: 100,
      gloves_prise: 150 * 2
  },
  shipping_charge:400,
  shipping_discount:20,
  sale_prise:0,
  
};

const inputValues = {
  purchase_country: 'uk',
  passport_country: "",
  mask: 0,
  gloves: 0
}
console.log(state);
console.log("Example Inputs:\n","UK:B123AB1234567:Gloves:20:Mask:10");
console.log("Example Output:\n","2650:90:100 80:50");
let isPassportCountry = undefined;
const initInput = () => {
  console.log("Enter Input: ");
  readline.question("", async (input) => {
      const allInputs = input.replace(/\s/g, "").split(":");
      console.log(allInputs);
      if (allInputs.length <= 4) {
          console.log("!ERROR!Input Not Possible");
          initInput();
          return;
      }
      inputValues.purchase_country = allInputs[0].toLowerCase();
      const passportNumber = allInputs[1].toLowerCase();
      if(passportNumber.length <= 7){
          await getInputItems(allInputs,1)
      }else{
          await getInputItems(allInputs,2)
          isPassportCountry = await checkCountryPassport(passportNumber);
          inputValues.passport_country = isPassportCountry;
      }
      console.log('Your Input ',inputValues);
      readline.close();
  });
};
initInput();
/*
Return inputType
*/
const getInputItems = (inputs,index) => {
  for(let i = index; i < inputs.length; i++){
      if(inputs[i].toLowerCase() == 'gloves'){
          inputValues.gloves = parseInt(inputs[i+1]);
      }else if(inputs[i].toLowerCase() == 'mask'){
          inputValues.mask = parseInt(inputs[i+1]);
      } 
  }
  return inputValues;
} 
/*
Return {boolean} if true country is UK if false country is Germany
*/
const checkCountryPassport = (passportNumber) => {
  if (
      passportNumber.length == 13 &&
      passportNumber.charAt(0) === "b" &&
      !isNaN(passportNumber.substring(1, 4)) &&
      !passportNumber.substring(4, 6).match(/[0-9]/i)
  ) {
      return "uk";
  } else if (
      passportNumber.length == 12 &&
      passportNumber.charAt(0) === "a" &&
      isNaN(passportNumber.substring(1, 2)) &&
      isNaN(passportNumber.substring(2, 3))
  ) {
      return "germany";
  } else {
      return undefined;
  }
};
