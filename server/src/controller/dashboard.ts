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

  export const getBrand: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const results = await startupLogDao.getBrand();
    res.send(results).status(200);
  };

  export const getBrand1: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const results = await startupLogDao.getBrand1();
    res.send(results).status(200);
  };
  export const getBrand2: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const results = await startupLogDao.getBrand2();
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
