import { RequestHandler } from "express";

import {Configs} from "../models/tenantConfigModels";


export const createTenantConfig: RequestHandler = async (req, resp, next) => {

	if(Object.keys(req.body).length === 0 ){
		return resp.status(400).json({ messages:"Request Body is required for Post!",data:"Bad Request"});
	}
	var config = await Configs.create({ ...req.body });
	return resp.status(200).json({ messages: "Config created successfully", data: config });
}

export const deleteTenantConfig: RequestHandler = async (req, resp, next) => {
	
	if(Object.keys(req.params).length === 0){
		return resp.status(400).json({ messages:"TenantId is required for Delete!",data:"Bad Request"});
	}

	const {tenantId} = req.params;
	var deleteConf: Configs|null = await Configs.findByPk(tenantId);
	await Configs.destroy({where:{tenantId}});
	return resp.status(200).json({ messages: "Config deleted successfully",data:deleteConf });
}


export const getAllTenantConfig: RequestHandler = async(req, resp, next)=>{
	 const configs:Configs[] | null = await Configs.findAll();
	 return resp.status(200).json({message:"Config retrieved success", data:configs});

}

export const updateTenantConfig: RequestHandler = async(req, res, next)=>{

	if(Object.keys(req.params).length === 0){
		return res.status(400).json({ messages:"TenantId is required for Update!",data:"Bad Request"});
	}

	const {tenantId} = req.params;
	await Configs.update({...req.body},{where:{tenantId}});
	const updatedConfigs:Configs | null = await Configs.findByPk(tenantId);
	return res.status(200).json({message:"Config update success", data:updatedConfigs });

}

export const getTenantConfigByTenantId: RequestHandler = async(req, res, next)=>{
	const {tenantId} = req.params;
	const configs:Configs | null = await Configs.findByPk(tenantId);
	if((configs && Object.keys(configs).length > 0 )){
	return res.status(200).json(configs?.configParam??'Not found');
	}
	else{
		const globalDBconfig:Configs | null = await Configs.findByPk("GLOBAL");
		if((globalDBconfig && Object.keys(globalDBconfig).length > 0 )){
		
		console.log("Fetching Tenant's Config fetched from DB Global Value");
		return res.status(200).json(globalDBconfig?.configParam??'Not Found');
		}
		else{
		const appDBConfig: Configs = {tenantId:process.env.GLOBAL_CONFIG_PARAM_ID??'',
		configParam:process.env.GLOBAL_CONFIG_PARAM_VALUE??{}} as Configs	

		console.log("Fetching Tenant's Config from App Global Setting");

		return res.status(200).json(appDBConfig?.configParam??'not found');
		}
	}


}



	
