import { Request, RequestHandler, Response } from "express";
import startupLogDao from "../dao/startupLogDao.js";

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
}

export default dashbaordController;
