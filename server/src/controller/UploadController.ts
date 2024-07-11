import {Request, RequestHandler, Response} from "express";
import iconv from 'iconv-lite';
import {TbDataService} from "../service/TbDataService.js";
import {DailyDataService} from "../service/DailyDataService.js";

export class UploadController {
    private tbDataService: TbDataService;
    private dailyDataService: DailyDataService;

    constructor() {
        this.tbDataService = new TbDataService();
        this.dailyDataService = new DailyDataService();

    }

    uploadTbData: RequestHandler = async (req, res, next) => {
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).send("请上传文件");
            }
            const fileName = iconv.decode(Buffer.from(file.originalname, 'binary'), 'utf-8');
            console.log(fileName + " 已上传成功");
            await this.tbDataService.extractDataFromExcel(fileName);
            await this.tbDataService.loadTbJson(fileName);
            res.status(200).send("文件上传成功");
        } catch (error) {
            next(error);
        }
    }


    uploadDailyData: RequestHandler = async (req, res, next) => {
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).send("请上传文件");
            }
            const fileName = iconv.decode(Buffer.from(file.originalname, 'binary'), 'utf-8');
            console.log(fileName + " 为焦恩俊已上传成功");
            await this.dailyDataService.extractDataFromExcel(fileName);
            await this.dailyDataService.loadDailyJson(fileName);
            res.status(200).send("文件上传成功");
        } catch (error) {
            next(error);
        }
    }


}
