import db from "../db/conn.mjs";
import cron from "cron";
import { Request, Response, NextFunction, RequestHandler } from 'express';
const COLLECTION_NAME = "GoodMFamily";

namespace GoodmanFamily{
    export const getgmfData = async (option?:any) =>{
        const collection = await db.collection(COLLECTION_NAME);
        const results = await collection.find({}).limit(100).toArray();

        return results;
    };
    export const postData: RequestHandler = async (req: Request, res: Response) => {
        // 从请求中获取数据
        const data = req.body;
        
        // 在这里处理POST请求的数据，并进行数据库操作或其他逻辑处理
        // ...
        
        // 假设你已经将数据存储到数据库中，现在返回一个成功的响应
        res.send("Data received and stored successfully.").status(200);
    };
}


export default GoodmanFamily;