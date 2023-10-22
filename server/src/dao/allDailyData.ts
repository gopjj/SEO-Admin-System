import { todo } from "node:test";
import db from "../db/conn.mjs";
import cron from "cron";


var currentDate = new Date(); // 获取当前日期

var year = currentDate.getFullYear();
var month = currentDate.getMonth() + 1; // 获取的月份是基于 0 的索引，所以需要加 1
var day = currentDate.getDate();
// const COLLECTION_NAME = "daily_reports_"+ year + "_" + month + "_" + day;
const COLLECTION_NAME = "allDailyData"; //所有日报数据集合

