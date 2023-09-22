import { Request,Response,RequestHandler } from "express";
import db from '../db/conn.mjs';

export const login:RequestHandler = async (req:Request,res:Response) => {
    const { username,password} = req.body;

    const user = await db.collection('seouser').findOne({username: username})

    if (user && user.password === password) {
        res.status(200).json({ message: '登录成功'});
    }else{
        res.status(401).json({message: '用户名或密码不正确'});
    }
};