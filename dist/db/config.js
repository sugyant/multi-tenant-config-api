"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const configs_1 = require("../models/configs");
const connection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "Aprisha09",
    database: "tenant_configs",
    logging: false,
    models: [configs_1.Configs]
});
exports.default = connection;
