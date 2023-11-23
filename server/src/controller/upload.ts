import { Request, RequestHandler, Response } from "express";
import db from "../db/conn.mjs";
import xlsx from "xlsx";
import iconv from 'iconv-lite';
import moment from 'moment';

const COLLECTION_NAME_B = "Daily_Reports";
namespace uploadController {
  export const uploadXlsx: RequestHandler = async (
    req: Request,
    res: Response
    
  ) => {
    req.setEncoding('utf8');
    const file = req.file;
    if (!file) {
      res.send("Please upload a file").status(400);
      return;
    }
    const fileName = iconv.decode(Buffer.from(file.originalname, 'binary'), 'utf-8');
    let COLLECTION_NAME 
    console.log(fileName);
    if(fileName === "日报表.xlsx"){
      var currentDate = new Date();
      var year = currentDate.getFullYear();
      var month = currentDate.getMonth() + 1; // 获取的月份是基于 0 的索引，所以需要加 1
      var day = currentDate.getDate();
      console.log(year+"." + month+"."+day)
      var dailyDate = year + '_' + month + '_' + day;
      COLLECTION_NAME = "Daily_Reports";
    }else if(fileName === '收录表.xlsx'){
      COLLECTION_NAME = 'recordData'
    }else if(fileName === '关键词表.xlsx'){
      COLLECTION_NAME = 'keywordData'
    }else if(fileName === '笔记优化.xlsx'){
      COLLECTION_NAME = 'OperationsRecord'
    }else {
      COLLECTION_NAME = 'otherData'
    }
    
    const collection = await db.createCollection(COLLECTION_NAME, {
      validator: { 
        $jsonSchema: { 
          bsonType: "object", 
          required: ["ID"], 
          properties: { 
            ID: { bsonType: "number" } 
          } 
        } 
      },
      validationLevel: "strict",
      validationAction: "error",
    });
    const worksheetData = xlsx.read(file.buffer);
    const jsonData: { ID?: number, date?: any}[] = xlsx.utils.sheet_to_json(
      worksheetData.Sheets[worksheetData.SheetNames[0]],
      { raw: false } // 添加 raw: false 选项，以确保日期被解析为 Date 对象
    ) as { ID?: number }[];
    
    const maxIdResult = await collection.findOne({}, { sort: { ID: -1 }, projection: { ID: 1 } });
    let currentId = maxIdResult ? maxIdResult.ID + 1 : 1;

    jsonData.forEach((item) => {
      item["ID"] = currentId++;
      const formattedDate = moment(item["date"]).format('YYYY-MM-DD'); // 将日期格式化为 "YYYY-MM-DD" 形式
      item["date"] = formattedDate.toString(); // 将格式化后的日期字符串赋值给属性
      console.log(formattedDate);
    });

    const results = await collection.insertMany(jsonData);
    const ret = res.send(results).status(200);
   
  };
};

export default uploadController;