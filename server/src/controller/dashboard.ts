import { Request, RequestHandler, Response } from "express";
import db from "../db/conn.mjs";

namespace dashbaordController {
  export const getList: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const collection = await db.collection("startup_log");
    const results = await collection.find({}).limit(10).toArray();

    res.send(results).status(200);
  };

  export const deleteAll: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const collection = await db.collection("startup_log");
    const results = await collection.deleteMany();

    res.send(results).status(200);
  };
}

export default dashbaordController;
