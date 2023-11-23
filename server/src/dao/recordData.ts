import db from "../db/conn.mjs";
import cron from "cron";
const COLLECTION_NAME = "recordData";

namespace recordData {
  export const getRecord = async (options?: any) => {
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
    const result = await recordData.deleteAll();
    console.log("Deleted documents:", result.deletedCount);
  } catch (error) {
    console.error("Error executing deleteAll:", error);
  }
});

task.start();


export default recordData;