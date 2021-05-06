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
exports.__esModule = true;
var playwright_1 = require("playwright");
//import { launchChromium } from 'playwright-aws-lambda'
var fs = require("fs");
exports.checkAccessibility = function (req, res) {
    switch (req.method) {
        case 'POST':
            var browser_1;
            var page_1;
            (function () { return __awaiter(void 0, void 0, void 0, function () {
                var url_to_check, file, evaluationResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, playwright_1.chromium.launch()
                            //browser = await launchChromium()
                        ];
                        case 1:
                            browser_1 = _a.sent();
                            return [4 /*yield*/, browser_1.newPage()];
                        case 2:
                            //browser = await launchChromium()
                            page_1 = _a.sent();
                            url_to_check = req.query.url || 'https://www.uts.edu.au';
                            return [4 /*yield*/, page_1.goto(url_to_check)];
                        case 3:
                            _a.sent();
                            file = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
                            return [4 /*yield*/, page_1.evaluate(function (minifiedAxe) { return window.eval(minifiedAxe); }, file)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, page_1.evaluate(function () { return window.axe.run(window.document); })];
                        case 5:
                            evaluationResult = _a.sent();
                            res.send(JSON.stringify(evaluationResult.violations, null, 2));
                            return [4 /*yield*/, page_1.close()];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, browser_1.close()];
                        case 7:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            break;
        default:
            res.send({ error: 'Only POST is supported' });
            break;
    }
};
