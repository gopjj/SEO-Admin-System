import mongoose from 'mongoose';

const connectToDatabase = async () => {
    const dbName = 'database';
    const connectionString = process.env.MONGO_URI || '';

    try {
        await mongoose.connect(connectionString, {
            dbName: dbName,
        });
    } catch (e) {
        throw e;
    }
};
await connectToDatabase();



// 之前的代码里还是有很多有用到这个db的地方，所以现将此处的老代码保留
import { Db, MongoClient } from "mongodb";
const connectionString = process.env.MONGO_URI || "";
const client = new MongoClient(connectionString);
let db: Db;
try {
  const conn = await client.connect();
  db = conn.db("database");
} catch (e) {
  throw e;
}
export default db;