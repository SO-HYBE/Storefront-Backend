"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verifyAuthToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader ? authorizationHeader.split(' ')[1] : '';
        var decoded = jsonwebtoken_1["default"].verify(token, "".concat(process.env.TOKEN_SECRET));
        res.locals.userData = decoded;
        next();
    }
    catch (err) {
        err.code = 401;
        var message = err.message;
        res.status(err.code).json({ message: message });
    }
};
exports.verifyAuthToken = verifyAuthToken;
