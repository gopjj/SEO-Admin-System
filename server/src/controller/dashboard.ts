import { Request, RequestHandler, Response } from "express";
import startupLogDao from "../dao/dailyData.js";
import recordData from "../dao/recordData.js";
import keywordData from "../dao/keywordData.js"; 
import operData from "../dao/oRdata.js";
import oRdata from "../dao/oRdata.js";
import GoodmanFamily from "../dao/gmfamilyData.js";


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

  export const getgmfData: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const results = await GoodmanFamily.getgmfData();
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

//单笔记按标题查询 api 请求
  export const getTitle: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    // const results = await startupLogDao.getTitle();

    const option = {
      title: '🎁一看就懂！夏天精简护肤搭配❗️快收好！⭐️'
    };
    
    const results = await startupLogDao.getTitle(option);
    res.send(results).status(200);
  };
  
  export const getNoteList : RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    // const results = await startupLogDao.getTitle();

    const option = {
      author: 'HBN',
      brand:"hbn水乳"
    };
    
    const results = await startupLogDao.getNoteList(option);
    res.send(results).status(200);
  };

  export const getListed: RequestHandler = async (req: Request, res: Response) => {
    const option = {
      date: req.query.date, // 从 API 请求的 body 中获取日期值，假设日期值的字段名为 date
    };
  
    const results = await startupLogDao.getListed(option);
    res.send(results).status(200);
  };

  export const getLnum: RequestHandler = async (req: Request, res: Response) => {
    const option = {
      date: req.query.date, // 从 API 请求的 body 中获取日期值，假设日期值的字段名为 date
    };
  
    const results = await startupLogDao.getLnum(option);
    res.send(results).status(200);
  };

  export const getRecord:RequestHandler = async (
    req:Request,
    res:Response
  ) =>{
    const results = await recordData.getRecord();
    res.send(results).status(200);
  };
  

  //   // 查询关键词 + 上榜次数
  // export const getKeywordL : RequestHandler = async (
  //   req: Request,
  //   res: Response
  // ) => {
  //   // const results = await startupLogDao.getTitle();

  //   const option = {
  //     brand:req.query.brand,
  //     date: req.query.date
  //   };
    
  //   const results = await startupLogDao.getKeywordL(option);
  //   res.send(results).status(200);
  // };
  
  export const getnoteaco : RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    // const results = await startupLogDao.getTitle();

    const options = {
      date: req.query.date
    };
    
    const results = await oRdata.getnoteaco(options);
    res.send(results).status(200);
  };

    //查询关键词 + 上榜次数
  export const getKeywordL : RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    // const results = await startupLogDao.getTitle();

    const option = {
      brand:req.query.brand,
      date: req.query.date
    };
    
    const results = await startupLogDao.getKeywordL(option);
    res.send(results).status(200);
  };
  
  export const getKeyword:RequestHandler = async (
    req:Request,
    res:Response
  ) =>{
    const results = await keywordData.getKeyword();
    res.send(results).status(200);
  };

  export const getopAll:RequestHandler = async (
    req:Request,
    res:Response
  ) =>{
    const results = await operData.getopAll();
    res.send(results).status(200);
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




export default dashbaordController;
