import db from "../db/conn.mjs";

const COLLECTION_NAME = "startup_log";

namespace startupLogDAO {
  export const getList = async (options?: any) => {
    const collection = await db.collection(COLLECTION_NAME);
    const results = await collection.find({}).limit(10).toArray();
    return results;
  };

  export const deleteAll = async (options?: any) => {
    const collection = await db.collection(COLLECTION_NAME);
    const results = await collection.deleteMany();

    return results;
  };
}

export default startupLogDAO;
