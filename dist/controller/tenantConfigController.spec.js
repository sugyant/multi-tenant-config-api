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
const request = require('supertest');
const app2 = require('../app');
jest.setTimeout(10000);
describe('TenantConfig Route Controller Test', () => {
    test('should validate for Empty Request Body in Post request', () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield request(app2).post("/v1/config/").send({});
        expect(resp.statusCode).toEqual(400);
    }));
    test('should validate for Empty Request Parameter in Update request', () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield request(app2).put("/v1/config/");
        expect(resp.statusCode).toEqual(400);
    }));
    test('should validate for Empty Request Parameter in Delete request', () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield request(app2).delete("/v1/config/");
        expect(resp.statusCode).toEqual(400);
    }));
    test('should create New Tenant Config', () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield request(app2).post("/v1/config/").send({ tenantId: "12345678", configParam: "NZD 13000" });
        expect(resp.statusCode).toEqual(200);
    }));
    test('should Update Existing Tenant Config', () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield request(app2).put("/v1/config/12345678").send({ tenantId: "12345678", configParam: "NZD 14000" });
        expect(resp.statusCode).toEqual(200);
    }));
    test('should get a single Tenant Config from DB', () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield request(app2).get("/v1/config/12345678");
        expect(resp.statusCode).toEqual(200);
    }));
    test('should get Global DB Config if single Tenant Config not present in DB', () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield request(app2).get("/v1/config/1000000");
        expect(resp.statusCode).toEqual(200);
    }));
    test('should get Global APPLICATION Config if DB Global Value is Missing', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request(app2).delete("/v1/config/GLOBAL");
        const resp = yield request(app2).get("/v1/config/1000000");
        expect(resp.statusCode).toEqual(200);
    }));
    test('should create Global DB Value', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request(app2).delete("/v1/config/GLOBAL");
        const resp = yield request(app2).get("/v1/config/1000000");
        expect(resp.statusCode).toEqual(200);
    }));
    test('should get All Configs from DB', () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield request(app2).post("/v1/config/").send({ tenantId: "GLOBAL", configParam: "NZD 1000000" });
        expect(resp.statusCode).toEqual(200);
    }));
    test('should Delete Existing Tenant Config', () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield request(app2).delete("/v1/config/12345678");
        expect(resp.statusCode).toEqual(200);
    }));
});
