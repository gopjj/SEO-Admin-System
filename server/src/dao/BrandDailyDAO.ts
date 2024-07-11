import db from "../db/conn.mjs"; // 修改为实际路径

const COLLECTION_NAME = 'Daily_Reports';



export const getDailyList = async (query:any): Promise<any[]> => {
  const collection = await db.collection(COLLECTION_NAME);
  const results = await collection.find(query).toArray();
  return results;
};

