"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = void 0;
var readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});
var Country;
(function (Country) {
    Country["uk"] = "uk";
    Country["germany"] = "germany";
})(Country = exports.Country || (exports.Country = {}));
var state = {
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
var inputValues = {
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
console.log("Example Inputs:\n", "UK:Gloves:250:Mask:150");
console.log("Example Output:\n", "OUT OF STOCK:100:100 100:50");
var isPassportCountry = undefined;
var discountedShippingPrice = state.shipping_charge -
    (state.shipping_discount / 100) * state.shipping_charge;
console.log("discountShippingPrice", discountedShippingPrice);
var initInput = function () {
    console.log("Enter Input: ");
    readline.question("", function (input) { return __awaiter(void 0, void 0, void 0, function () {
        var glovesCount, maskCount, countTotel, allInputs, passportNumber, shippingCharge, totalMaskStock, totalGlovesStock, isOutOfStock, outOfStock, checkOutofStock, glovesStockCount, maskStockCount, _a, gQty, glovesRemaining, _b, mQty, maskRemaining, glovesQty, maskQty, remainingQty, remainingQty;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    glovesCount = 0;
                    maskCount = 0;
                    countTotel = 0;
                    allInputs = input.replace(/\s/g, "").split(":");
                    if (allInputs.length <= 4) {
                        console.log("!ERROR!Input Not Possible");
                        initInput();
                        return [2 /*return*/];
                    }
                    inputValues.purchase_country = allInputs[0].toLowerCase();
                    passportNumber = allInputs[1].toLowerCase();
                    if (!(passportNumber.length <= 7)) return [3 /*break*/, 2];
                    return [4 /*yield*/, getInputItems(allInputs, 1)];
                case 1:
                    _c.sent();
                    return [3 /*break*/, 5];
                case 2: return [4 /*yield*/, getInputItems(allInputs, 2)];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, checkCountryPassport(passportNumber)];
                case 4:
                    isPassportCountry = _c.sent();
                    inputValues.passport_country = isPassportCountry;
                    _c.label = 5;
                case 5:
                    if (!(inputValues.purchase_country in Country)) {
                        console.log("Country not valid!");
                        initInput();
                        return [2 /*return*/];
                    }
                    shippingCharge = 0;
                    totalMaskStock = state.germany_inventory.mask + state.uk_inventory.mask;
                    totalGlovesStock = state.germany_inventory.gloves + state.uk_inventory.gloves;
                    isOutOfStock = false;
                    outOfStock = "OUT OF STOCK";
                    if (Math.sign(totalMaskStock - inputValues.mask) === -1 ||
                        Math.sign(totalGlovesStock - inputValues.gloves) === -1) {
                        console.log(outOfStock + ":" + state.uk_inventory.mask + ":" + state.germany_inventory.mask + " " + state.uk_inventory.gloves + ":" + state.germany_inventory.gloves);
                        initInput();
                        return [2 /*return*/];
                    }
                    if (!(inputValues.purchase_country == "uk")) return [3 /*break*/, 12];
                    checkOutofStock = Math.sign(totalMaskStock - inputValues.gloves) -
                        Math.sign(state.germany_inventory.mask - inputValues.mask);
                    glovesStockCount = state.uk_inventory.gloves - inputValues.gloves;
                    maskStockCount = state.uk_inventory.mask - inputValues.mask;
                    if (isPassportCountry == "germany") {
                        state.shipping_charge -=
                            (state.shipping_discount / 100) * state.shipping_charge;
                    }
                    if (!(maskStockCount < 0)) return [3 /*break*/, 7];
                    return [4 /*yield*/, getStock(Country.germany, maskStockCount, "mask")];
                case 6:
                    maskCount = _c.sent();
                    state.uk_inventory.mask = 0;
                    shippingCharge = state.shipping_charge;
                    return [3 /*break*/, 8];
                case 7:
                    state.uk_inventory.mask = maskStockCount;
                    _c.label = 8;
                case 8:
                    if (!(glovesStockCount < 0)) return [3 /*break*/, 10];
                    return [4 /*yield*/, getStock(Country.germany, glovesStockCount, "gloves")];
                case 9:
                    glovesCount = _c.sent();
                    state.uk_inventory.gloves = 0;
                    shippingCharge = state.shipping_charge;
                    return [3 /*break*/, 11];
                case 10:
                    state.uk_inventory.gloves = glovesStockCount;
                    _c.label = 11;
                case 11:
                    glovesCount =
                        glovesCount + inputValues.gloves * state.uk_inventory.gloves_price;
                    maskCount = maskCount + inputValues.mask * state.uk_inventory.mask_price;
                    state.sale_price = glovesCount + maskCount + shippingCharge;
                    console.log(state.sale_price + ":" + state.uk_inventory.mask + ":" + state.germany_inventory.mask + " " + state.uk_inventory.gloves + ":" + state.germany_inventory.gloves);
                    return [3 /*break*/, 13];
                case 12:
                    _a = (inputValues.gloves / 10)
                        .toString()
                        .split("."), gQty = _a[0], glovesRemaining = _a[1];
                    _b = (inputValues.mask / 10).toString().split("."), mQty = _b[0], maskRemaining = _b[1];
                    console.log("gQty", gQty);
                    console.log("mQty", mQty);
                    console.log("gQtyP", parseInt(gQty));
                    console.log("mQtyP", parseInt(mQty));
                    console.log("glovesRemaining", glovesRemaining);
                    console.log("maskRemaining", maskRemaining);
                    glovesQty = parseInt(gQty) * 10;
                    maskQty = parseInt(mQty) * 10;
                    state.uk_inventory.gloves -= glovesQty;
                    if (isPassportCountry == "uk") {
                        state.uk_inventory.mask -= maskQty;
                        countTotel += maskQty * state.uk_inventory.mask_price;
                        countTotel += glovesQty * state.uk_inventory.gloves_price;
                        shippingCharge = discountedShippingPrice * parseInt(gQty);
                        shippingCharge += discountedShippingPrice * parseInt(mQty);
                    }
                    else {
                        state.germany_inventory.mask -= maskQty;
                        countTotel += maskQty * state.germany_inventory.mask_price;
                        countTotel += glovesQty * state.uk_inventory.gloves_price;
                        shippingCharge += state.shipping_charge * parseInt(gQty);
                    }
                    if (glovesRemaining != undefined) {
                        remainingQty = parseInt(glovesRemaining);
                        state.germany_inventory.gloves -= remainingQty;
                        //console.log('RemainingQty germany_inventory gloves',remainingQty," after minus ",state.germany_inventory.gloves);
                        countTotel += remainingQty * state.germany_inventory.gloves_price;
                        //console.log('Count Price RemainingQty germany_inventory gloves',remainingQty * state.germany_inventory.gloves_price);
                    }
                    if (maskRemaining != undefined) {
                        remainingQty = parseInt(maskRemaining);
                        state.germany_inventory.mask -= remainingQty;
                        // console.log('RemainingQty germany_inventory mask ',remainingQty," after minus ",state.germany_inventory.mask);
                        countTotel += remainingQty * state.germany_inventory.mask_price;
                        //console.log('Count Price RemainingQty germany_inventory mask ',remainingQty * state.germany_inventory.mask_price);
                    }
                    state.sale_price = countTotel + shippingCharge;
                    console.log(state.sale_price + ":" + state.uk_inventory.mask + ":" + state.germany_inventory.mask + " " + state.uk_inventory.gloves + ":" + state.germany_inventory.gloves);
                    _c.label = 13;
                case 13:
                    readline.close();
                    return [2 /*return*/];
            }
        });
    }); });
};
initInput();
var getStock = function (country, stockCount, type) {
    var count = 0;
    var countryInventory = country + "_inventory";
    var remainingStock = Math.abs(stockCount);
    state[countryInventory][type] -= remainingStock;
    count = state[countryInventory][type + "_price"] * remainingStock;
    inputValues[type] -= remainingStock;
    state.shipping_charge *= Math.ceil(remainingStock / 10);
    return count;
};
/*
  Return inputType
  */
var getInputItems = function (inputs, index) {
    for (var i = index; i < inputs.length; i++) {
        if (inputs[i].toLowerCase() == "gloves") {
            inputValues.gloves = parseInt(inputs[i + 1]);
        }
        else if (inputs[i].toLowerCase() == "mask") {
            inputValues.mask = parseInt(inputs[i + 1]);
        }
    }
    return inputValues;
};
/*
  Return {boolean} if true country is UK if false country is Germany
  */
var checkCountryPassport = function (passportNumber) {
    if (passportNumber.length == 13 &&
        passportNumber.charAt(0) === "b" &&
        !isNaN(passportNumber.substring(1, 4)) &&
        !passportNumber.substring(4, 6).match(/[0-9]/i)) {
        return Country.uk;
    }
    else if (passportNumber.length == 12 &&
        passportNumber.charAt(0) === "a" &&
        isNaN(passportNumber.substring(1, 2)) &&
        isNaN(passportNumber.substring(2, 3))) {
        return Country.germany;
    }
    else {
        return undefined;
    }
};
