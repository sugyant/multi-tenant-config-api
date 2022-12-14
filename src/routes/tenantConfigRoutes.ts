import {Router} from "express";

import {
	createTenantConfig,
	deleteTenantConfig,
	getAllTenantConfig,
	updateTenantConfig,
	getTenantConfigByTenantId
} from "../controller/tenantConfigController"

const router = Router();

router.post("/",createTenantConfig);

router.get("/",getAllTenantConfig);

router.get("/:tenantId",getTenantConfigByTenantId);

router.put("/:tenantId",updateTenantConfig);

router.delete("/:tenantId",deleteTenantConfig);

router.delete("/",deleteTenantConfig);

router.put("/",updateTenantConfig);

export default router;