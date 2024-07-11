import { Request, RequestHandler, Response } from "express";
import db from "../db/conn.mjs";
import xlsx from "xlsx";
import iconv from "iconv-lite";
import moment from "moment";

const fileNameToCollectionName: Map<string, string> = new Map<string, string>([
  ["收录表.xlsx", "recordData"],
  ["关键词表.xlsx", "keywordData"],
]);

namespace upload {
  export const uploadXlsx: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    req.setEncoding("utf8");
    const file = req.file;
    if (!file) {
      res.status(400).send("Please upload a file");
      return;
    }

    let fileName = iconv.decode(Buffer.from(file.originalname, "binary"), "utf-8");
    let match = fileName.match(/【(.*?)】/);
    let brandName = match?.[1];
    console.log(brandName);
    fileName = fileName.replace(/\【.*?\】/g, "");
    let collectionName: string;

    switch (fileName) {
      case "日报表.xlsx":
        const currentDate = new Date();
        const dailyDate = `${currentDate.getFullYear()}_${currentDate.getMonth() + 1}_${currentDate.getDate()}`;
        collectionName = `Daily_Reports`;
        console.log(collectionName);
        break;
      case "收录表.xlsx":
        collectionName = "recordData";
        break;
      case "关键词表.xlsx":
        collectionName = "keywordData";
        break;
      case "笔记优选.xlsx":
        collectionName = "OperationsRecord";
        break;
      default:
        collectionName = "otherData";
        break;
    }

    const existingCollection = await db.listCollections({ name: collectionName }).toArray();
    if (existingCollection.length === 0) {
      await db.createCollection(collectionName, {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: [
              "id",
              "update_date",
              "brand",
              "note_id",
              "collect_date",
              "note_title",
              "note_link",
              "note_type",
              "publish_date",
              "author",
              "like",
              "favourite",
              "comment",
              "interaction",
              "usertype",
              "fan",
              "brand_emo",
            ],
            properties: {
              id: { bsonType: "int" },
              update_date: { bsonType: "string" },
              brand: { bsonType: "string" },
              note_id: { bsonType: "int" },
              collect_date: { bsonType: "string" },
              note_title: { bsonType: "string" },
              note_link: { bsonType: "string" },
              note_type: { bsonType: "string" },
              publish_date: { bsonType: "string" },
              author: { bsonType: "string" },
              like: { bsonType: "int" },
              favourite: { bsonType: "int" },
              comment: { bsonType: "int" },
              interaction: { bsonType: "int" },
              "usertype": { bsonType: "string" },
              fan: { bsonType: "int" },
              brand_emo: { bsonType: "string" },
            },
          },
        },
        validationLevel: "strict",
        validationAction: "error",
      });
    }

    const worksheetData = xlsx.read(file.buffer);
    const jsonData: {
      id?: number;
      update_date?: string;
      brand?: string;
      note_id?: number;
      collect_date?: string;
      note_title?: string;
      note_link?: string;
      note_type?: string;
      publish_date?: string;
      author?: string;
      like?: number;
      favourite?: number;
      comment?: number;
      interaction?: number;
      "usertype"?: string;
      fan?: number;
      brand_emo?: string;
    }[] = xlsx.utils.sheet_to_json(
      worksheetData.Sheets[worksheetData.SheetNames[0]],
      { raw: false }
    );

    const maxIdResult = await db.collection(collectionName).findOne(
      {},
      { sort: { id: -1 }, projection: { id: 1 } }
    );
    let currentId = maxIdResult ? maxIdResult.id + 1 : 1;

    // Format data and assign IDs
    jsonData.forEach((item) => {
      item["id"] = currentId++;
      item["update_date"] = moment().format("YYYY-MM-DD");
      if (!item["brand"]) {
        item["brand"] = brandName;
      }
      currentId --;
      item["note_id"] = currentId++;
      item["collect_date"] = item["collect_date"] ? moment(item["collect_date"]).format("YYYY-MM-DD") : "";
      item["publish_date"] = item["publish_date"] ? moment(item["publish_date"]).format("YYYY-MM-DD") : "";
      item["like"] = item["like"] ? Number(item["like"]) : 0;                                                                                                              
      item["favourite"] = item["favourite"] ? Number(item["favourite"]) : 0;
      item["comment"] = item["comment"] ? Number(item["comment"]) : 0;
      item["interaction"] = item["interaction"] ? Number(item["interaction"]) : 0;
      item["fan"] = item["fan"] ? Number(item["fan"]) : 0;
    });

    try {
      const results = await db.collection(collectionName).insertMany(jsonData);
      console.log("Inserted data:", results);
      console.log("data:", jsonData);
      res.status(200).send(results);
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).send("Error inserting data");
    }
  };
}

export default upload;
