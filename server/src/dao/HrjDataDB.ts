import db from "../db/conn.mjs";
// import cron from "cron";
// import { Request,Response,RequestHandler } from "express";
// const COLLECTION_NAME = "GmfDataDB";
import { Collection } from "mongodb";
interface DateRange {
    startDate: Date;
    endDate: Date;
  }
export class hrjDataDB{
    private COLLECTION_NAME = "hrjData";
    private collection: Collection;
    constructor(){
        this.collection = db.collection(this.COLLECTION_NAME);
    }
    //查询 GmfData中的所有数据
    gethrjData = async (options?: any) => {
        //console.log(collection)
        const results = await this.collection.find({}).limit(100).toArray();
    
        return results;
      };
    //查询 指定日期的数据
    gethrjDataByDate = async (date: string) => {
        const results = await this.collection.find({date: date}).limit(10).toArray();
        return results;
    }

    // TODO://根据日期筛选 出一段时间的数据 
    gethrjDataByDateRange = async (startDate: any, endDate: any) => {
        const results = await this.collection.find({
          date: { $gte: startDate, $lte: endDate }
        }).limit(10).toArray();
        return results;
      } 
      



    // TODO://
    // getByKeyword = async (keyword: any) => {
    //     const results = await this.collection.find(
    //       {
    //         date: "2023-12-21",
    //         "keywords.keyword": keyword
    //       },
    //       { projection: { _id: 0, date: 1, keywords: { $elemMatch: { keyword } } } }
    //     ).limit(10).toArray();
    //     console.log(results.listed)
    //     return results;
    //   }
    getByKeyword = async (keyword: any) => {
        const results = await this.collection.find(
          {
            date: "2023-12-21",
            "keywords.keyword": keyword
          },
          { projection: { _id: 0, "keywords.$": 1 } }
        ).limit(100).toArray();
      
        // 只返回listed的值
        const listedValues = results.map((result: any) => result.keywords[0].listed);
      
        return listedValues;
      }
      getCombinedData = async (startDate:any, endDate:any, keyword:any) => {
        try {
          // 调用 gethrjDataByDateRange 获取日期范围内的数据
          const dateRangeData = await this.gethrjDataByDateRange(startDate, endDate);
      
          // 调用 getByKeyword 根据关键字获取数据
          const keywordData = await this.getByKeyword(keyword);
      
          // 返回合并后的结果
          return {
            dateRangeData: dateRangeData,
            keywordData: keywordData
          };
        } catch(error) {
          console.error(error);
          return null;
        }
      }


    }