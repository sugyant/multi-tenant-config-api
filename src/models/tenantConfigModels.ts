import {Table, Model, Column, DataType, PrimaryKey } from "sequelize-typescript";
import { Json } from "sequelize/types/utils";

@Table({
	timestamps: false,
	tableName: "configs",
})

export class Configs extends Model {

	@PrimaryKey
	@Column({
	type:DataType.STRING,
    primaryKey: true,
	allowNull: false,
  })
  tenantId!:string;

  @Column ({
	type:DataType.JSON,
	allowNull: false,
  })
  configParam!:Json;

}

