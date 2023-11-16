import db from "../db/conn.mjs";
import cron from "cron";
const COLLECTION_NAME = "OperationsRecord";

namespace operData {
  //查询所有数据
  export const getopAll  = async (options?: any) => {
    const collection = await db.collection(COLLECTION_NAME);
    //console.log(collection)
    const results = await collection.find({}).limit(100).toArray();
 
    return results;
  };

  export const getnoteaco  = async (options?: any) => {
    const collection = await db.collection(COLLECTION_NAME);
    //console.log(collection)

    const results = await collection.aggregate([
      {
        $match:{
          date: options?.date
        }
      },
      {
        $group: {
          _id: null,
          totalNoteaco: { $sum: "$noteaco" },
          exNoteexo:{ $sum: "$noteexo" },
          countNoteaco: { $sum: 1 },
        }
      },
  ])
 
    return results.toArray();
  };


  export const deleteAll = async (options?: any) => {
    const collection = await db.collection(COLLECTION_NAME);
    const results = await collection.deleteMany();
    console.log(results); 
    return results;
  };
}
// const task = new cron.CronJob("00  09 * * *", async () => {
//   try {
//     const result = await operData.deleteAll();
//     console.log("Deleted documents:", result.deletedCount);
//   } catch (error) {
//     console.error("Error executing deleteAll:", error);
//   }
// });

// task.start();



export default operData;