import express, { Request, Response, NextFunction } from "express";
import {DashbaordController} from "../controller/dashboard.js";
import {UploadController} from "../controller/UploadController.js";
import upload from "../controller/upload.js";
import insertController from "../controller/insertdata.js";
import multer from "multer";
import {login, postData} from "../controller/login.js";
import {DataTrackController} from "../controller/DataTrackController.js";
import iconv from "iconv-lite";
import  DataController  from "../controller/DataController.js"

const router = express.Router();

const dashbaordController = new DashbaordController();
const dataTrackController = new DataTrackController();
const dataController = new DataController();
const uploadController = new UploadController();
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
router.get("/insert", insertController.insertData);
router.get("/getRecord", dashbaordController.getRecord);
router.get("/getKeyword", dashbaordController.getKeyword);
router.get("/getKeywordL", dashbaordController.getKeywordL);
router.get("/getopAll", dashbaordController.getopAll);
router.get("/getnoteaco", dashbaordController.getnoteaco);
router.get("/getgmfData", dashbaordController.getgmfData);
router.post("/login", login);
router.post("/postData", postData);
//拿取GoodMaNFamilyDB 
router.get("/getGmfDB", dashbaordController.getGmfDB);
router.get("/getGmfDataByDate", dashbaordController.getGmfDataByDate)
router.get("/gethrjdate", dashbaordController.gethrjdate)
router.get("/getByKeyword", dashbaordController.getByKeyword)
router.get("/getCombinedData", dashbaordController.getCombinedData)
router.post("/upload", multer().single("file"), upload.uploadXlsx);//upload
const storageTb = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'data/tbData')
    },
    filename: function (req, file, cb) {
        const fileName = iconv.decode(Buffer.from(file.originalname, 'binary'), 'utf-8');
        cb(null, fileName);
    }
});
const storageDaily = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'data/dailyData')
    },
    filename: function (req, file, cb) {
        const fileName = iconv.decode(Buffer.from(file.originalname, 'binary'), 'utf-8');
        cb(null, fileName);
    }
});
const setCustomTimeout = (timeout: number) => {
    return (req: Request, res: Response, next: NextFunction) => {
        req.setTimeout(timeout);
        next();
    };
};

const uploadTb = multer({storage: storageTb});
const uploadDaily = multer({storage: storageDaily});
router.post("/uploadTb", uploadTb.single("file"), uploadController.uploadTbData);
router.post("/uploadDaily", uploadDaily.single("file"), uploadController.uploadDailyData);
router.get('/getDailyList',dataController.getDailyList)
router.get("/getPgyData", dataTrackController.getPgyData);
router.get("/getJgYiCiTuiCiWords", dataTrackController.getJgYiCiTuiCiWords);
router.get("/getJgShangXiaYouWords", dataTrackController.getJgShangXiaYouWords);
router.post("/setJgYiCiTuiCiWords", dataTrackController.setJgYiCiTuiCiWords);
router.post("/setJgShangXiaYouWords", dataTrackController.setJgShangXiaYouWords);
router.get("/getJgYiCiTuiCiData", dataTrackController.getJgYiCiTuiCiData);
router.get("/getJgShangXiaYouData", dataTrackController.getJgShangXiaYouData);
router.get("/getDailyBrandData", dataTrackController.getDailyBrandData);
router.get("/scrapePgyData", dataTrackController.scrapePgyData);
router.get("/scrapeJgYiCiTuiCiData", dataTrackController.scrapeJgYiCiTuiCiData);
router.get("/scrapeJgShangXiaYouData", dataTrackController.scrapeJgShangXiaYouData);
router.get("/scrapeJgIndustryWordData", setCustomTimeout(600000), dataTrackController.scrapeJgIndustryWordData);
router.get("/calculatePccsData", dataTrackController.calculatePccsData);

export default router;
