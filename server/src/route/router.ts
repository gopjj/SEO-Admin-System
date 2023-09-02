import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();

router.get("/getList", async (req, res) => {
  const collection = await db.collection("startup_log");
  const results = await collection.find({}).limit(10).toArray();

  res.send(results).status(200);
});

router.get("/uploadTest", async (req, res) => {
  const collection = await db.collection("startup_log");
  const data = {
    name: "test",
    age: 1,
  };
  const results = await collection.insertOne(data);

  res.send(results).status(200);
});

// Post request, data is in req.body
router.get("/upload", async (req, res) => {
  const collection = await db.collection("startup_log");
  const results = await collection.insertOne(req.body);

  res.send(results).status(200);
});

export default router;
