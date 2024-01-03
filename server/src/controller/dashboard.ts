import { Request, RequestHandler, Response } from "express";
import startupLogDao from "../dao/dailyData.js";
import recordData from "../dao/recordData.js";
import keywordData from "../dao/keywordData.js";
import { OperationRecord } from "../dao/OperationRecord.js";
import GoodmanFamily from "../dao/gmfamilyData.js";

export class DashbaordController {
  private operationRecord: OperationRecord;
  constructor() {
    this.operationRecord = new OperationRecord();
  }
  getList: RequestHandler = async (req: Request, res: Response) => {
    const results = await startupLogDao.getList();
    res.send(results).status(200);
  };

  getBrand: RequestHandler = async (req: Request, res: Response) => {
    const results = await startupLogDao.getBrand();
    res.send(results).status(200);
  };

  getgmfData: RequestHandler = async (req: Request, res: Response) => {
    const results = await GoodmanFamily.getgmfData();
    res.send(results).status(200);
  };

  getBrand1: RequestHandler = async (req: Request, res: Response) => {
    const results = await startupLogDao.getBrand1();
    res.send(results).status(200);
  };
  getBrand2: RequestHandler = async (req: Request, res: Response) => {
    const results = await startupLogDao.getBrand2();
    res.send(results).status(200);
  };

  deleteAll: RequestHandler = async (req: Request, res: Response) => {
    const results = await startupLogDao.deleteAll();
    res.send(results).status(200);
  };

  //单笔记按标题查询 api 请求
  getTitle: RequestHandler = async (req: Request, res: Response) => {
    // const results = await startupLogDao.getTitle();

    const option = {
      title: "🎁一看就懂！夏天精简护肤搭配❗️快收好！⭐️",
    };

    const results = await startupLogDao.getTitle(option);
    res.send(results).status(200);
  };

  getNoteList: RequestHandler = async (req: Request, res: Response) => {
    // const results = await startupLogDao.getTitle();

    const option = {
      author: "HBN",
      brand: "hbn水乳",
    };

    const results = await startupLogDao.getNoteList(option);
    res.send(results).status(200);
  };

  getListed: RequestHandler = async (req: Request, res: Response) => {
    const option = {
      date: req.query.date, // 从 API 请求的 body 中获取日期值，假设日期值的字段名为 date
    };

    const results = await startupLogDao.getListed(option);
    res.send(results).status(200);
  };

  getLnum: RequestHandler = async (req: Request, res: Response) => {
    const option = {
      date: req.query.date, // 从 API 请求的 body 中获取日期值，假设日期值的字段名为 date
    };

    const results = await startupLogDao.getLnum(option);
    res.send(results).status(200);
  };

  getRecord: RequestHandler = async (req: Request, res: Response) => {
    const results = await recordData.getRecord();
    res.send(results).status(200);
  };
  getnoteaco: RequestHandler = async (req: Request, res: Response) => {
    // const results = await startupLogDao.getTitle();

    const options = {
      date: req.query.date,
    };

    const results = await this.operationRecord.getnoteaco(options);
    res.send(results).status(200);
  };

  //查询关键词 + 上榜次数
  getKeywordL: RequestHandler = async (req: Request, res: Response) => {
    // const results = await startupLogDao.getTitle();

    const option = {
      brand: req.query.brand,
      date: req.query.date,
    };

    const results = await startupLogDao.getKeywordL(option);
    res.send(results).status(200);
  };

  getKeyword: RequestHandler = async (req: Request, res: Response) => {
    const results = await keywordData.getKeyword();
    res.send(results).status(200);
  };

  getopAll: RequestHandler = async (req: Request, res: Response) => {
    const results = await this.operationRecord.getopAll();
    res.send(results).status(200);
  };
  postData: RequestHandler = async (req: Request, res: Response) => {
    // 从请求中获取数据
    const data = req.body;

    // 在这里处理POST请求的数据，并进行数据库操作或其他逻辑处理
    // ...

    // 假设你已经将数据存储到数据库中，现在返回一个成功的响应
    res.send("Data received and stored successfully.").status(200);
  };
}
