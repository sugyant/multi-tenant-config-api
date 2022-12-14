import { json, urlencoded } from "body-parser";
import express from "express";
import dbConn from "./db/tenantConfigDB";
import configRoutes from "./routes/tenantConfigRoutes"

const app = express();

app.use(json());

app.use(urlencoded({extended:true}));

app.use("/v1/config", configRoutes);

app.use((
	err:Error,
	req:express.Request,
	res:express.Response,
	next:express.NextFunction
) => {

	res.status(500).json({message:err.message});
});

dbConn.sync().then(()=>{
	console.log("db synched..")
}).catch((err) => {
	console.log("Error",err);
});

module.exports = app