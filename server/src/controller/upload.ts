import { Request, RequestHandler, Response } from "express";
import db from "../db/conn.mjs";
import xlsx from "xlsx";

namespace uploadController {
  export const uploadXlsx: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const collection = await db.createCollection("daily_statement", {
      validator: { $jsonSchema: { bsonType: "object", required: ["ID"], properties: { ID: { bsonType: "number" } } } },
      validationLevel: "strict",
      validationAction: "error",
    });
    const file = req.file;

    if (!file) {
      res.send("Please upload a file").status(400);
      return;
    }
    
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
//     const workbook = xlsx.read(file.buffer);
//     const worksheet = xlsx.utils.sheet_to_json(
//       workbook.Sheets[workbook.SheetNames[0]]
//     ) as object[];
//     const results = await collection.insertMany(worksheet);

//     res.send(results).status(200);
//   };
// }

export default uploadController;
