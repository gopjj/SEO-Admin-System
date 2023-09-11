import { Request, RequestHandler, Response } from "express";
import startupLogDao from "../dao/dailyData.js";
import recordData from "../dao/recordData.js";
import keywordData from "../dao/keywordData.js"; 

namespace dashbaordController {
  export const getList: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const results = await startupLogDao.getList();
    res.send(results).status(200);
  };

  export const deleteAll: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const results = await startupLogDao.deleteAll();
    res.send(results).status(200);
  };
  
  export const getRecord:RequestHandler = async (
    req:Request,
    res:Response
  ) =>{
    const results = await recordData.getRecord();
    res.send(results).status(200);
  };

  export const getKeyword:RequestHandler = async (
    req:Request,
    res:Response
  ) =>{
    const results = await keywordData.getKeyword();
    res.send(results).status(200);
  };
}

export default dashbaordController;
