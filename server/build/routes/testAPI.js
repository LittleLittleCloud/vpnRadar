"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var testAPIrouter = express_1.Router();
exports.testAPIrouter = testAPIrouter;
testAPIrouter.get("/", function (req, res, next) {
    res.send("api is working");
});
//# sourceMappingURL=testAPI.js.map