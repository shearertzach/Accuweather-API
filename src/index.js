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
var f = require("node-fetch");
var Accuweather = /** @class */ (function () {
    function Accuweather(apiKey, useMetric) {
        if (useMetric === void 0) { useMetric = false; }
        this.apiKey = apiKey;
        this.useMetric = useMetric;
    }
    Accuweather.prototype.getCityByZip = function (zipCode) {
        return __awaiter(this, void 0, void 0, function () {
            var url, res, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=".concat(this.apiKey, "&q=").concat(zipCode);
                        return [4 /*yield*/, f(url)];
                    case 1:
                        res = _a.sent();
                        if (!res.ok)
                            throw Error("There was an error processing your request.");
                        return [4 /*yield*/, res.json()];
                    case 2:
                        json = _a.sent();
                        if (json.length < 1)
                            throw Error("No results found for this zip code.");
                        return [2 /*return*/, { key: json[0].Key, name: json[0].LocalizedName }];
                }
            });
        });
    };
    Accuweather.prototype.getCityByName = function (city) {
        return __awaiter(this, void 0, void 0, function () {
            var url, res, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=".concat(this.apiKey, "&q=").concat(city);
                        return [4 /*yield*/, f(url)];
                    case 1:
                        res = _a.sent();
                        if (!res.ok)
                            throw Error("There was an error processing your request.");
                        return [4 /*yield*/, res.json()];
                    case 2:
                        json = _a.sent();
                        if (json.length < 1)
                            throw Error("No results found for this city name.");
                        return [2 /*return*/, { key: json[0].Key, name: json[0].LocalizedName }];
                }
            });
        });
    };
    Accuweather.prototype.getCityInfo = function (method, query) {
        return __awaiter(this, void 0, void 0, function () {
            var locationName, locationCode, _a, zipInfo, cityInfo, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        locationName = "";
                        locationCode = "";
                        _a = method;
                        switch (_a) {
                            case "zipCode": return [3 /*break*/, 1];
                            case "cityName": return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.getCityByZip(query)];
                    case 2:
                        zipInfo = _b.sent();
                        locationCode = zipInfo.key;
                        locationName = zipInfo.name;
                        return [2 /*return*/, { locationCode: locationCode, locationName: locationName }];
                    case 3: return [4 /*yield*/, this.getCityByName(query)];
                    case 4:
                        cityInfo = _b.sent();
                        locationCode = cityInfo.key;
                        locationName = cityInfo.name;
                        return [2 /*return*/, { locationCode: locationCode, locationName: locationName }];
                    case 5: return [2 /*return*/, { locationCode: locationCode, locationName: locationName }];
                    case 6:
                        e_1 = _b.sent();
                        return [2 /*return*/, e_1.message];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Accuweather.prototype.getFiveDayForecast = function (method, query) {
        return __awaiter(this, void 0, void 0, function () {
            var cityInfo, url, res, json, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.getCityInfo(method, query)];
                    case 1:
                        cityInfo = _a.sent();
                        url = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/".concat(cityInfo.locationCode, "?apikey=").concat(this.apiKey);
                        return [4 /*yield*/, f(url)];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        json = _a.sent();
                        return [2 /*return*/, json.DailyForecasts];
                    case 4:
                        e_2 = _a.sent();
                        return [2 /*return*/, e_2.message];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Accuweather;
}());
var accu = new Accuweather("G3fj3RlExF0C0uwrU0tVXuQAVANvCOLb");
accu.getFiveDayForecast("zipCode", "42129").then(function (info) { return console.log(info); });
