import { Request, RequestHandler, Response } from "express";
import db from "../db/conn.mjs";
import xlsx from "xlsx";

namespace uploadController {
  export const uploadXlsx: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const collection = await db.collection("startup_log");
    const file = req.file;

    if (!file) {
      res.send("Please upload a file").status(400);
      return;
    }

    const workbook = xlsx.read(file.buffer);
    const worksheet = xlsx.utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[0]]
    ) as object[];
    const results = await collection.insertMany(worksheet);

    res.send(results).status(200);
  };
}

export default uploadController;
