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
