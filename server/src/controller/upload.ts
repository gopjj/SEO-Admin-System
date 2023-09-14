import { Request, RequestHandler, Response } from "express";
import db from "../db/conn.mjs";
import xlsx from "xlsx";
import iconv from 'iconv-lite';

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
      COLLECTION_NAME = 'dailyData'
    }else if(fileName === '收录表.xlsx'){
      COLLECTION_NAME = 'recordData'
    }else if(fileName === '关键词表.xlsx'){
      COLLECTION_NAME = 'keywordData'
    }else {
      COLLECTION_NAME = 'otherData'
    }
    
   const collection = await db.createCollection(COLLECTION_NAME, {
        validator: { $jsonSchema: { bsonType: "object", required: ["ID"], properties: { ID: { bsonType: "number" } } } },
        validationLevel: "strict",
        validationAction: "error",
      });


   
    
    const worksheetData = xlsx.read(file.buffer);
    const jsonData: { ID: number }[] = xlsx.utils.sheet_to_json(
      worksheetData.Sheets[worksheetData.SheetNames[0]]
    ) as { ID: number }[];
     const maxIdResult = await collection.findOne({}, { sort: { ID: -1 }, projection: { ID: 1 } });
    let currentId = maxIdResult ? maxIdResult.ID + 1 : 1;

    jsonData.forEach((item) => {
      item["ID"] = currentId++;
    });
    const results = await collection.insertMany(jsonData);
    res.send(results).status(200);
    };
}


export default uploadController;
