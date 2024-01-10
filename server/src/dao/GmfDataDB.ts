import db from "../db/conn.mjs";
// import cron from "cron";
// import { Request,Response,RequestHandler } from "express";
// const COLLECTION_NAME = "GmfDataDB";
import { Collection } from "mongodb";

export class GmfDataDB{
    private COLLECTION_NAME = "GmfDataDB";
    private collection: Collection;
    constructor(){
        this.collection = db.collection(this.COLLECTION_NAME);
    }
    //查询 GmfData中的所有数据
    getGmfData = async (options?: any) => {
        //console.log(collection)
        const results = await this.collection.find({}).limit(100).toArray();
    
        return results;
      };
    //查询 指定日期的数据
    getGmfDataByDate = async (date: string) => {
        const results = await this.collection.find({date: date}).limit(10).toArray();
        return results;
    }
    }