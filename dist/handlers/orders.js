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
var authMiddleware_1 = require("../middlewares/authMiddleware");
var order_1 = require("../models/order");
var store = new order_1.OrderStore();
var createOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, crt_order, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                order = {
                    user_id: req.body.user_id,
                    status: req.body.status
                };
                return [4 /*yield*/, store.createOrder(order)];
            case 1:
                crt_order = _a.sent();
                res.json(crt_order);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400);
                res.json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, store.index()];
            case 1:
                order = _a.sent();
                res.json(order);
                return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderId = req.params.id;
                return [4 /*yield*/, store.show(orderId)];
            case 1:
                order = _a.sent();
                return [2 /*return*/, res.json(order)];
        }
    });
}); };
var addProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product_id, order_id, quantity, addedProduct, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                product_id = req.body.product_id;
                order_id = req.params.id;
                quantity = req.body.quantity;
                console.log(1);
                console.log(typeof (product_id));
                console.log(product_id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.addProduct(quantity, product_id, order_id)];
            case 2:
                addedProduct = _a.sent();
                res.json(addedProduct);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2 + product_id);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var selectOrdersById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, store.selectOrdersById(req.params.user_id)];
            case 1:
                orders = _a.sent();
                res.json(orders);
                return [2 /*return*/];
        }
    });
}); };
var deleteOrder = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, store.deleteAll()];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.json(user)];
        }
    });
}); };
var orderRoutes = function (app) {
    app.post('/orders', createOrder);
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders/:id/products', addProduct);
    app.get('/orders/:user_id', authMiddleware_1.verifyAuthToken, selectOrdersById);
    app["delete"]('/orders/delete', deleteOrder);
};
exports["default"] = orderRoutes;
