import { Request, RequestHandler, Response } from "express";
import db from "../db/conn.mjs";

const COLLECTION_NAME_A = "daily_reports_2023_10_18";
const COLLECTION_NAME_B = "Daily_Reports";

namespace insertController {
    export const insertData: RequestHandler = async(req: Request,res:Response) => {
        try
        {
            const sourceData = await db.collection(COLLECTION_NAME_A).find().toArray();

            await db.collection(COLLECTION_NAME_B).insertMany(sourceData);

            res.status(200).json({ message: "数据插入成功" });
        } catch (err) 
                {
                    console.error("数据插入错误:", err);
                    res.status(500).json({ message: "数据插入失败" });
                }
    };
}
export default insertController;