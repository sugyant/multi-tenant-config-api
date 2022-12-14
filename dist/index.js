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
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const app = require('./app');
const tenantConfigModels_1 = require("./models/tenantConfigModels");
app.listen(process.env.PORT, () => console.log(`server Started on port ${process.env.PORT}`));
// Insert Global DB Tenant Config 1
const createGlobalConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    const DBGLOBALCONFIG = {
        tenantId: process.env.GLOBAL_DB_TENANT_ID,
        configParam: process.env.GLOBAL_DB_TENANT_PARAM
    };
    try {
        yield tenantConfigModels_1.Configs.create(DBGLOBALCONFIG);
        console.log("DB Global Config created: ", DBGLOBALCONFIG);
    }
    catch (err) {
        console.log("DB Global Config may already exist or DB is unreachable!", DBGLOBALCONFIG);
    }
});
createGlobalConfig();
