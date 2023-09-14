import db from "../db/conn.mjs";
import cron from "cron";
const COLLECTION_NAME = "keywordData";

namespace keywordData {
  export const getKeyword  = async (options?: any) => {
    const collection = await db.collection(COLLECTION_NAME);
    //console.log(collection)
    const results = await collection.find({}).limit(100).toArray();
 
    return results;
  };

  export const deleteAll = async (options?: any) => {
    const collection = await db.collection(COLLECTION_NAME);
    const results = await collection.deleteMany();
    console.log(results); 
    return results;
  };
}
const task = new cron.CronJob("00  09 * * *", async () => {
  try {
    const result = await keywordData.deleteAll();
    console.log("Deleted documents:", result.deletedCount);
  } catch (error) {
    console.error("Error executing deleteAll:", error);
  }
});

task.start();

// const COLLECTION_NAME = "day";

// namespace startupLogDAO {
//   export const getList = async (options?: any) => {
//     try {
//       const collection = await db.collection(COLLECTION_NAME);
//       const results = await collection.find({}).limit(10).toArray();

//       return results;
//     } catch (error) {
//       console.error(error);
//       throw new Error("Failed to get startup logs");
//     }
//   };

//   export const deleteAll = async (options?: any) => {
//     try {
//       const collection = await db.collection(COLLECTION_NAME);
//       const results = await collection.deleteMany();

//       return results;
//     } catch (error) {
//       console.error(error);
//       throw new Error("Failed to delete all startup logs");
//     }
//   };
// }

export default keywordData;