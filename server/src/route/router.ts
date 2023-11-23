import express from "express";
import dashbaordController from "../controller/dashboard.js";
import d1 from "../dao/dailyData.js"
import uploadController from "../controller/upload.js";
import insertController from "../controller/insertdata.js";
import multer from "multer";
import { login } from "../controller/login.js";

const router = express.Router();

// dashboard
router.get("/getList", dashbaordController.getList);
router.get("/getBrand", dashbaordController.getBrand);
router.get("/getBrand1", dashbaordController.getBrand1);
router.get("/getBrand2", dashbaordController.getBrand2);
router.get("/deleteAll", dashbaordController.deleteAll);
router.get("/getTitle", dashbaordController.getTitle);
router.get("/getNotelist", dashbaordController.getNoteList);
router.get("/getListed", dashbaordController.getListed);
router.get("/getLnum", dashbaordController.getLnum);
router.get("/insert",insertController.insertData);
router.get("/getRecord",dashbaordController.getRecord);
router.get("/getKeyword",dashbaordController.getKeyword);
router.get("/getKeywordL",dashbaordController.getKeywordL);
<<<<<<< HEAD
=======
router.get("/getopAll",dashbaordController.getopAll);
router.get("/getnoteaco",dashbaordController.getnoteaco);
>>>>>>> 065a0ae6b5c888c780618cc02bf2866affa34d23
router.post('/login',login)

//upload
router.post(
  "/upload",
  multer().single("file"),
  uploadController.uploadXlsx
);


export default router;
