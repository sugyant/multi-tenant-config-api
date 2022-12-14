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
exports.getTenantConfigByTenantId = exports.updateTenantConfig = exports.getAllTenantConfig = exports.deleteTenantConfig = exports.createTenantConfig = void 0;
const tenantConfigModels_1 = require("../models/tenantConfigModels");
const createTenantConfig = (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.body).length === 0) {
        return resp.status(400).json({ messages: "Request Body is required for Post!", data: "Bad Request" });
    }
    var config = yield tenantConfigModels_1.Configs.create(Object.assign({}, req.body));
    return resp.status(200).json({ messages: "Config created successfully", data: config });
});
exports.createTenantConfig = createTenantConfig;
const deleteTenantConfig = (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.params).length === 0) {
        return resp.status(400).json({ messages: "TenantId is required for Delete!", data: "Bad Request" });
    }
    const { tenantId } = req.params;
    var deleteConf = yield tenantConfigModels_1.Configs.findByPk(tenantId);
    yield tenantConfigModels_1.Configs.destroy({ where: { tenantId } });
    return resp.status(200).json({ messages: "Config deleted successfully", data: deleteConf });
});
exports.deleteTenantConfig = deleteTenantConfig;
const getAllTenantConfig = (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    const configs = yield tenantConfigModels_1.Configs.findAll();
    return resp.status(200).json({ message: "Config retrieved success", data: configs });
});
exports.getAllTenantConfig = getAllTenantConfig;
const updateTenantConfig = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.params).length === 0) {
        return res.status(400).json({ messages: "TenantId is required for Update!", data: "Bad Request" });
    }
    const { tenantId } = req.params;
    yield tenantConfigModels_1.Configs.update(Object.assign({}, req.body), { where: { tenantId } });
    const updatedConfigs = yield tenantConfigModels_1.Configs.findByPk(tenantId);
    return res.status(200).json({ message: "Config update success", data: updatedConfigs });
});
exports.updateTenantConfig = updateTenantConfig;
const getTenantConfigByTenantId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { tenantId } = req.params;
    const configs = yield tenantConfigModels_1.Configs.findByPk(tenantId);
    if ((configs && Object.keys(configs).length > 0)) {
        return res.status(200).json({ message: "Tenant Config fetch success", data: configs });
    }
    else {
        const globalDBconfig = yield tenantConfigModels_1.Configs.findByPk("GLOBAL");
        if ((globalDBconfig && Object.keys(globalDBconfig).length > 0)) {
            return res.status(200).json({ message: "Tenant's Global Config fetched from DB", data: globalDBconfig });
        }
        else {
            const appDBConfig = { 'tenantId': (_a = process.env.GLOBAL_CONFIG_PARAM_ID) !== null && _a !== void 0 ? _a : '',
                'configParam': (_b = process.env.GLOBAL_CONFIG_PARAM_VALUE) !== null && _b !== void 0 ? _b : '' };
            return res.status(200).json({ message: "Tenant's Global Config fetched from App", data: appDBConfig });
        }
    }
});
exports.getTenantConfigByTenantId = getTenantConfigByTenantId;
