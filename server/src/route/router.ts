import express from "express";
import dashbaordController from "../controller/dashboard.js";
import d1 from "../dao/dailyData.js"
import uploadController from "../controller/upload.js";
import multer from "multer";

const router = express.Router();

// dashboard
router.get("/getList", dashbaordController.getList);
router.get("/deleteAll", dashbaordController.deleteAll);
router.get("/getRecord",dashbaordController.getRecord);
router.get("/getKeyword",dashbaordController.getKeyword);

//upload
router.post(
  "/upload",
  multer().single("file"),
  uploadController.uploadXlsx
);


export default router;
