"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const tenantConfigModels_1 = require("../models/tenantConfigModels");
const dbConn = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "Aprisha09",
    database: "tenant_configs",
    logging: false,
    models: [tenantConfigModels_1.Configs]
});
exports.default = dbConn;
