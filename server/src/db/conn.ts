import { MongoClient } from "mongodb";

const connectionString = process.env.MONGO_URI || "";

const client = new MongoClient(connectionString);

async function getDb() {
  let conn: MongoClient;
  try {
    conn = await client.connect();
  } catch {
    throw new Error("Could not connect to database");
  }

  const db = conn.db("local");
}

export default getDb;
