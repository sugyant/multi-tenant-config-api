"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express_1 = __importDefault(require("express"));
const tenantConfigDB_1 = __importDefault(require("./db/tenantConfigDB"));
const tenantConfigRoutes_1 = __importDefault(require("./routes/tenantConfigRoutes"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use("/v1/config", tenantConfigRoutes_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
tenantConfigDB_1.default.sync().then(() => {
    console.log("db synched..");
}).catch((err) => {
    console.log("Error", err);
});
module.exports = app;
