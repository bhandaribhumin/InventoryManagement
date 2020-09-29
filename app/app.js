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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.initInput = exports.Country = void 0;
var readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});
console.log('this', this);
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
    temp_shipping: 0,
    temp_total: 0,
    take_stock_qty: 0,
    sale_price: 0,
};
var inputValues = {
    purchase_country: Country.uk,
    passport_country: "",
    mask: 0,
    gloves: 0,
};
var UKPassportExp = /^[Bb][0-9]{3}[a-zA-Z]{2}[a-zA-Z0-9]{7}$/g;
var GermanyPassportExp = /^[Aa][a-zA-Z]{2}[a-zA-Z0-9]{9}$/g;
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
var isPassportCountry = undefined;
var discountedShippingPrice = state.shipping_charge -
    (state.shipping_discount / 100) * state.shipping_charge;
console.log("discountShippingPrice", discountedShippingPrice);
exports.initInput = function (inputs) {
    console.log(_this);
    console.log("Enter Input: ");
    readline.question("", function (input) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, country, passport, calculateGlovesStock, calculateMaskStock, countTotel, allInputs, shippingCharge, totalMaskStock, totalGlovesStock, outOfStock, glovesStockCount, maskStockCount, isMaskCountNagative, isGlovesCountNagative, glovesTotel, maskTotel, _b, gQty, glovesRemaining, _c, mQty, maskRemaining, glovesQty, maskQty, isMaskCountNagative, isGlovesCountNagative, isMaskCountNagative, isGlovesCountNagative;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = input.split(":").map(function (e) { return e.toLowerCase(); }), country = _a[0], passport = _a[1];
                    input.split(":").map(function (obj, index, all) {
                        if (obj.toLowerCase() == "gloves")
                            inputValues.gloves = all[index + 1];
                        if (obj.toLowerCase() == "mask")
                            inputValues.mask = all[index + 1];
                    });
                    calculateGlovesStock = {
                        getStock: 0,
                        price: 0,
                        shipping: 0,
                    };
                    calculateMaskStock = {
                        getStock: 0,
                        price: 0,
                        shipping: 0,
                    };
                    countTotel = 0;
                    allInputs = input.replace(/\s/g, "").split(":");
                    if (allInputs.length <= 4) {
                        console.log("!ERROR!Input Not Possible");
                        exports.initInput();
                        return [2 /*return*/];
                    }
                    inputValues.purchase_country = country;
                    if (!passport) return [3 /*break*/, 2];
                    return [4 /*yield*/, checkCountryPassport(passport)];
                case 1:
                    isPassportCountry = _d.sent();
                    _d.label = 2;
                case 2:
                    if (!(inputValues.purchase_country in Country)) {
                        console.log("Country not valid!");
                        exports.initInput();
                        return [2 /*return*/];
                    }
                    shippingCharge = 0;
                    totalMaskStock = state.germany_inventory.mask + state.uk_inventory.mask;
                    totalGlovesStock = state.germany_inventory.gloves + state.uk_inventory.gloves;
                    outOfStock = "OUT OF STOCK";
                    if (Math.sign(totalMaskStock - inputValues.mask) === -1 ||
                        Math.sign(totalGlovesStock - inputValues.gloves) === -1) {
                        console.log(outOfStock + ":" + state.uk_inventory.mask + ":" + state.germany_inventory.mask + " " + state.uk_inventory.gloves + ":" + state.germany_inventory.gloves);
                        exports.initInput();
                        return [2 /*return*/];
                    }
                    if (!(inputValues.purchase_country == "uk")) return [3 /*break*/, 5];
                    glovesStockCount = state.uk_inventory.gloves - inputValues.gloves;
                    maskStockCount = state.uk_inventory.mask - inputValues.mask;
                    if (isPassportCountry == "germany") {
                        state.shipping_charge = discountedShippingPrice;
                    }
                    return [4 /*yield*/, checkGetStock(maskStockCount, Country.uk, "mask")];
                case 3:
                    isMaskCountNagative = _d.sent();
                    if (isMaskCountNagative) {
                        state.uk_inventory.mask = 0;
                    }
                    else {
                        state.uk_inventory.mask = maskStockCount;
                    }
                    return [4 /*yield*/, checkGetStock(glovesStockCount, Country.germany, "gloves")];
                case 4:
                    isGlovesCountNagative = _d.sent();
                    if (isGlovesCountNagative) {
                        state.uk_inventory.gloves = 0;
                    }
                    else {
                        state.uk_inventory.gloves = glovesStockCount;
                    }
                    glovesTotel = inputValues.gloves * state.uk_inventory.gloves_price;
                    maskTotel = inputValues.mask * state.uk_inventory.mask_price;
                    state.sale_price = glovesTotel + maskTotel + state.temp_shipping;
                    console.log(state.sale_price + ":" + state.uk_inventory.mask + ":" + state.germany_inventory.mask + " " + state.uk_inventory.gloves + ":" + state.germany_inventory.gloves);
                    return [3 /*break*/, 12];
                case 5:
                    _b = (inputValues.gloves / 10)
                        .toString()
                        .split(".")
                        .map(function (e) { return parseInt(e); }), gQty = _b[0], glovesRemaining = _b[1];
                    _c = (inputValues.mask / 10)
                        .toString()
                        .split(".")
                        .map(function (e) { return parseInt(e); }), mQty = _c[0], maskRemaining = _c[1];
                    maskRemaining = maskRemaining == undefined ? 0 : maskRemaining;
                    glovesRemaining = glovesRemaining == undefined ? 0 : glovesRemaining;
                    glovesQty = gQty === 0 ? glovesRemaining : gQty * 10;
                    maskQty = mQty === 0 ? maskRemaining : mQty * 10;
                    console.log('glove ocha', glovesQty);
                    state.uk_inventory.gloves -= glovesQty;
                    if (!(isPassportCountry == "uk")) return [3 /*break*/, 8];
                    if (mQty == 0) {
                        state.germany_inventory.mask -= maskQty;
                        countTotel += maskQty * state.germany_inventory.mask_price;
                    }
                    else {
                        state.uk_inventory.mask -= maskQty;
                    }
                    return [4 /*yield*/, checkGetStock(state.uk_inventory.mask, Country.germany, "mask")];
                case 6:
                    isMaskCountNagative = _d.sent();
                    if (isMaskCountNagative) {
                        countTotel += state.temp_total;
                        state.uk_inventory.mask = 0;
                        maskQty = maskQty - state.take_stock_qty;
                        mQty = Math.floor(maskQty / 10);
                    }
                    return [4 /*yield*/, checkGetStock(state.uk_inventory.gloves, Country.germany, "gloves")];
                case 7:
                    isGlovesCountNagative = _d.sent();
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
                    return [3 /*break*/, 11];
                case 8:
                    // Passport is local
                    state.germany_inventory.mask -= maskQty;
                    console.log("mask reduce fro germany ", state.germany_inventory.mask);
                    return [4 /*yield*/, checkGetStock(state.germany_inventory.mask, Country.uk, "mask")];
                case 9:
                    isMaskCountNagative = _d.sent();
                    if (isMaskCountNagative) {
                        countTotel += state.temp_total;
                        shippingCharge += state.temp_shipping;
                        state.germany_inventory.mask = 0;
                        maskQty = maskQty - state.take_stock_qty;
                    }
                    debugger;
                    return [4 /*yield*/, checkGetStock(state.uk_inventory.gloves, Country.germany, "gloves")];
                case 10:
                    isGlovesCountNagative = _d.sent();
                    if (isGlovesCountNagative) {
                        countTotel += state.temp_total;
                        shippingCharge += state.temp_shipping;
                        state.uk_inventory.gloves = 0;
                        glovesQty = glovesQty - state.take_stock_qty;
                    }
                    console.log('UK glovs glovesQty', glovesQty, "prise", state.uk_inventory.gloves_price, "Totel ", glovesQty * state.uk_inventory.gloves_price);
                    console.log('state.shipping_charge', state.shipping_charge, "qty", (gQty === 0 ? 1 : gQty), "total shipping", state.shipping_charge * (gQty === 0 ? 1 : gQty));
                    countTotel += maskQty * state.germany_inventory.mask_price;
                    countTotel += glovesQty * state.uk_inventory.gloves_price;
                    shippingCharge += state.shipping_charge * (gQty === 0 ? 1 : gQty);
                    _d.label = 11;
                case 11:
                    //Calculate Remaining Stock for better sales
                    if (glovesRemaining !== 0 && gQty !== 0) {
                        console.log("gloves remove from germany inv", glovesRemaining);
                        state.germany_inventory.gloves -= glovesRemaining;
                        console.log("state.germany_inventory.gloves_price", state.germany_inventory.gloves_price, "Totel", glovesRemaining * state.germany_inventory.gloves_price);
                        countTotel += glovesRemaining * state.germany_inventory.gloves_price;
                    }
                    if (maskRemaining !== 0 && mQty !== 0) {
                        console.log("mask remove from germany inv", maskRemaining);
                        state.germany_inventory.mask -= maskRemaining;
                        console.log("state.germany_inventory.mask_price", state.germany_inventory.mask_price, "Totel", maskRemaining * state.germany_inventory.mask_price);
                        countTotel += maskRemaining * state.germany_inventory.mask_price;
                    }
                    state.sale_price = countTotel + shippingCharge;
                    console.log(state.sale_price + ":" + state.uk_inventory.mask + ":" + state.germany_inventory.mask + " " + state.uk_inventory.gloves + ":" + state.germany_inventory.gloves);
                    _d.label = 12;
                case 12:
                    readline.close();
                    return [2 /*return*/];
            }
        });
    }); });
    return "2650:90:100 80:50";
};
exports.initInput();
var getStock = function (country, stockCount, type) {
    var count = 0;
    var countryInventory = country + "_inventory";
    var remainingStock = Math.abs(stockCount);
    state[countryInventory][type] -= remainingStock;
    count = state[countryInventory][type + "_price"] * remainingStock;
    inputValues[type] -= remainingStock;
    var shipping = state.shipping_charge * Math.ceil(remainingStock / 10);
    var calculateStock = {
        getStock: state[countryInventory][type],
        price: count,
        shipping: shipping,
    };
    state.temp_total = count;
    state.temp_shipping = shipping;
    state.take_stock_qty = state[countryInventory][type];
    return calculateStock;
};
/*
  Return {boolean} if true country is UK if false country is Germany
  */
var checkCountryPassport = function (passportNumber) {
    if (UKPassportExp.test(passportNumber)) {
        state.country = Country.uk;
        return Country.uk;
    }
    else if (GermanyPassportExp.test(passportNumber)) {
        state.country = Country.germany;
        return Country.germany;
    }
    else {
        return undefined;
    }
};
var checkGetStock = function (stockCount, country, type) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(stockCount < 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, getStock(country, stockCount, type)];
            case 1:
                _a.sent();
                return [2 /*return*/, true];
            case 2: return [2 /*return*/, false];
        }
    });
}); };
