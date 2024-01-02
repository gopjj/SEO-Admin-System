import { todo } from "node:test";
import db from "../db/conn.mjs";
import cron from "cron";


var currentDate = new Date(); // 获取当前日期

var year = currentDate.getFullYear();
var month = currentDate.getMonth() + 1; // 获取的月份是基于 0 的索引，所以需要加 1
var day = currentDate.getDate();
// const COLLECTION_NAME = "daily_reports_"+ year + "_" + month + "_" + day;
const COLLECTION_NAME = "Daily_Reports";

namespace dailyData {
  export const getList = async (options?: any) => {
    const collection = await db.collection(COLLECTION_NAME);
    //console.log(collection)
    const results = await collection.find({}).limit(100).toArray();   //查询所有数据
 
    return results;
  };
  //TODO:多品牌请求进行合并到前端页面进行处理
  export const getBrand = async (options?: any) => {
    const collection = await db.collection(COLLECTION_NAME);
    //console.log(collection)
    const results = await collection.find({"brand":"OLAY"}).limit(100).toArray(); //查询品牌  
    console.log(results)
    return results;
  };
  export const getBrand1 = async (options?: any) => {
    const collection = await db.collection(COLLECTION_NAME);
    //console.log(collection)
    const results = await collection.find({"brand":"hbn水乳"}).limit(100).toArray();
 
    return results;
  };
  export const getBrand2 = async (options?: any) => {
    const collection = await db.collection(COLLECTION_NAME);
    //console.log(collection)
    const results = await collection.find({"brand":"PMPM"}).limit(100).toArray();
 
    return results;
  };
  //TODO:单笔记查询优化

  export const getTitle = async (option?: any) => {   //单笔记查询
    const collection = await db.collection(COLLECTION_NAME);
  
    // 构造查询条件
    const query = { note_title: option?.title };
  
    const results = await collection.find(query).limit(100).toArray();
  
    console.log(results);
    return results;
  };
  //TODO:进行笔记列表查询优化
  export const getNoteList = async(option?:any) => {  //笔记列表页查询
    const collection = await db.collection(COLLECTION_NAME);
    const query = { author:option?.author,brand:option?.brand};
    const results = await collection.find(query).limit(100).toArray();
  
    console.log(results);
    return results;
  };
  export const getKeywordL = async (option?: any) => {
    const collection = await db.collection(COLLECTION_NAME);
   
    const results = await collection.aggregate([
      { $match: { 'brand': option?.brand , date: option?.date} }, // 匹配品牌为'Olay'的文档
      {
        $group: {
          _id: '$keyword', // 根据关键词分组
          totalListed: { $sum: '$listed' } // 累加listed字段
        }
      }
    ]).limit(100).toArray();
  
    console.log(results);
    return results;
  };


  export const getListed = async (option?: any) => {
    const collection = await db.collection(COLLECTION_NAME);
    const query = {
      date: option?.date,
      listedsum: { $ne: null } // 排除 listedsum 为空的数据
    };
    const results = await collection.find(query).limit(100).toArray();
    console.log(results);
    return results;
  }


  export const getLnum = async (option?: any) => {
    const collection = await db.collection(COLLECTION_NAME);
    const query = {
      date: option?.date,
      // listed: { $ne: null }// 排除 opsum 为空的数据
    };
    const results = await collection.find(query).limit(100).toArray();
    console.log(results);
    return results;
  }


  export const deleteAll = async (options?: any) => { //删除任务
    const collection = await db.collection(COLLECTION_NAME);
    const results = await collection.deleteMany();
    console.log(results); 
    return results;
  };
}

export default dailyData;