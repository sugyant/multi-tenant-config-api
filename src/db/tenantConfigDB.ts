import { Sequelize } from "sequelize-typescript";
import {Configs} from "../models/tenantConfigModels";

const dbConn = new Sequelize({
	dialect: "mysql",
	host:"localhost",
	username:"root",
	password:"YourPassword",
	database:"tenant_configs",
	logging: false,
	models:[Configs]
});

export default dbConn;
