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
exports.getConfigByTenantId = exports.updateConfig = exports.getAllConfig = exports.deleteConfig = exports.createConfig = void 0;
const configs_1 = require("../models/configs");
const createConfig = (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    var config = yield configs_1.Configs.create(Object.assign({}, req.body));
    return resp.status(200).json({ messages: "Config created successfully", data: config });
});
exports.createConfig = createConfig;
const deleteConfig = (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenantId } = req.params;
    var deleteConf = yield configs_1.Configs.findByPk(tenantId);
    yield configs_1.Configs.destroy({ where: { tenantId } });
    return resp.status(200).json({ messages: "Config deleted successfully", data: deleteConf });
});
exports.deleteConfig = deleteConfig;
const getAllConfig = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const configs = yield configs_1.Configs.findAll();
    return res.status(200).json({ message: "Config retrieved success", data: configs });
});
exports.getAllConfig = getAllConfig;
const updateConfig = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenantId } = req.params;
    yield configs_1.Configs.update(Object.assign({}, req.body), { where: { tenantId } });
    const updatedConfigs = yield configs_1.Configs.findByPk(tenantId);
    return res.status(200).json({ message: "Config update success", data: updatedConfigs });
});
exports.updateConfig = updateConfig;
const getConfigByTenantId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenantId } = req.params;
    const configs = yield configs_1.Configs.findByPk(tenantId);
    return res.status(200).json({ message: "Tenant Config fetch success", data: configs });
});
exports.getConfigByTenantId = getConfigByTenantId;
