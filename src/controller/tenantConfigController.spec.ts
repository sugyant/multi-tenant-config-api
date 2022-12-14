const request = require('supertest');
const app2 = require('../app');
jest.setTimeout(10000);


describe('TenantConfig Route Controller Test',()=>{

	test('should validate for Empty Request Body in Post request',async ()=>{

		const resp = await request(app2).post("/v1/config/").send({});
		expect(resp.statusCode).toEqual(400);

	});

	test('should validate for Empty Request Parameter in Update request',async ()=>{

		const resp = await request(app2).put("/v1/config/");
		expect(resp.statusCode).toEqual(400);
		
	});

	test('should validate for Empty Request Parameter in Delete request',async ()=>{

		const resp = await request(app2).delete("/v1/config/");
		expect(resp.statusCode).toEqual(400);

	});

	test('should create New Tenant Config',async ()=>{

		const resp = await request(app2).post("/v1/config/").send({"tenantId":"12345678", 
		configParam:{"country":"IND","ccy": "34","rate":"56","app_id":"03"}});
		expect(resp.statusCode).toEqual(200);

	});

	test('should Update Existing Tenant Config',async ()=>{

		const resp = await request(app2).put("/v1/config/12345678").send({"tenantId":"12345678", 
		configParam:{"country":"IND","ccy": "40","rate":"76","app_id":"03"}});

		expect(resp.statusCode).toEqual(200);
		
	});
	
	test('should get a single Tenant Config from DB',async ()=>{

		const resp = await request(app2).get("/v1/config/12345678");
		expect(resp.statusCode).toEqual(200);

	});

	test('should get Global DB Config if single Tenant Config not present in DB',async ()=>{

		const resp = await request(app2).get("/v1/config/1000000");
		expect(resp.statusCode).toEqual(200);

	});

	test('should get Global APPLICATION Config if DB Global Value is Missing',async ()=>{

		await request(app2).delete("/v1/config/GLOBAL");

		const resp = await request(app2).get("/v1/config/1000000");
		expect(resp.statusCode).toEqual(200);

	});

	test('should create Global DB Value',async ()=>{

		await request(app2).delete("/v1/config/GLOBAL");

		const resp = await request(app2).post("/v1/config/").send({tenantId:"GLOBAL",
		configParam:{"country": "NZD","ccy": "43.5","rate": "10","app_id":"01"}});
		expect(resp.statusCode).toEqual(200);
		
	});

	test('should get All Configs from DB',async ()=>{
		
		const resp = await request(app2).get("/v1/config/");
		expect(resp.statusCode).toEqual(200);
		
	});
	
	test('should Delete Existing Tenant Config',async ()=>{

		const resp = await request(app2).delete("/v1/config/12345678");
		expect(resp.statusCode).toEqual(200);
		
	});

});
