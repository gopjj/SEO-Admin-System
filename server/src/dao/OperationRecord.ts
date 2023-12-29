import { Collection } from "mongodb";
import db from "../db/conn.mjs";

export class OperationRecord {
  private COLLECTION_NAME = "OperationsRecord";
  private collection: Collection<Document>;
  constructor() {
    this.collection = db.collection(this.COLLECTION_NAME);
  }
  //查询所有数据
  getopAll = async (options?: any) => {
    //console.log(collection)
    const results = await this.collection.find({}).limit(100).toArray();

    return results;
  };

  getnoteaco = async (options?: any) => {
    const results = await this.collection.aggregate([
      {
        $match: {
          date: options?.date,
        },
      },
      {
        $group: {
          _id: null,
          totalNoteaco: { $sum: "$noteaco" },
          exNoteexo: { $sum: "$noteexo" },
          countNoteaco: { $sum: 1 },
        },
      },
    ]);

    return results.toArray();
  };

  deleteAll = async (options?: any) => {
    const results = await this.collection.deleteMany();
    return results;
  };
}
