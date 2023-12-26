import { Request,Response,RequestHandler } from "express";
import db from '../db/conn.mjs';
const COLLECTION_NAME = "GoodMFamily";

export const login:RequestHandler = async (req:Request,res:Response) => {
    const { username,password} = req.body;

    const user = await db.collection('seouser').findOne({username: username})

    if (user && user.password === password) {
        res.status(200).json({ message: '登录成功'});
    }else{
        res.status(401).json({message: '用户名或密码不正确'});
    }
};
export const postData: RequestHandler = async (req: Request, res: Response) => {
    // 从请求中获取数据
    const { keyword,noted,date} = req.body;
    
    // 在这里处理POST请求的数据，并进行数据库操作或其他逻辑处理
    // ...
    console.log(keyword,noted,date);
    const collection = await db.collection(COLLECTION_NAME);
    const result = await collection.updateOne({ keyword: keyword }, { $push: { "reports": { date: date, noted: noted } } });
    // 假设你已经将数据存储到数据库中，现在返回一个成功的响应
    console.log(result);
    res.send("Data received and stored successfully.").status(200);
};


