import express from "express";
import dashbaordController from "../controller/dashboard.js";
import uploadController from "../controller/upload.js";
import multer from "multer";

const router = express.Router();

// dashboard
router.get("/getList", dashbaordController.getList);
router.get("/deleteAll", dashbaordController.deleteAll);

//upload
router.post(
  "/uploadTest",
  multer().single("file"),
  uploadController.uploadXlsx
);

export default router;
