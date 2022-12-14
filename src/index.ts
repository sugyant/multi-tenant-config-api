require('dotenv').config();
const app = require('./app');
import { Configs } from "./models/tenantConfigModels";

app.listen(process.env.PORT,  ()=>  console.log(`server Started on port ${process.env.PORT}`));

// Insert Global DB Tenant Config 1
const createGlobalConfig = async () => {

	const DBGLOBALCONFIG = {
		tenantId: process.env.GLOBAL_DB_TENANT_ID,
		configParam: {
            "country": "NZD",
            "ccy": "50",
            "rate": "10",
			"app_id":"01"
        }
	  };
	  
	try{
	await Configs.create(DBGLOBALCONFIG);
	console.log("DB Global Config created: ",DBGLOBALCONFIG);
	}catch (err) {
	 console.log("DB Global Config may already exist or DB is unreachable!",DBGLOBALCONFIG);
	}
	};
	
createGlobalConfig();

