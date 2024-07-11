import {Request, RequestHandler, Response} from "express";
import {PgyDataService} from "../service/PgyDataService.js";
import {DailyDataService} from "../service/DailyDataService.js";
import {TbDataService} from "../service/TbDataService.js";
import * as ss from 'simple-statistics';
import {ParsedQs} from "qs";
import {JgDataService} from "../service/JgDataService.js";

export class DataTrackController {
    private pgyDataService: PgyDataService;
    private dailyDataService: DailyDataService;
    private tbDataService: TbDataService;
    private jgDataService: JgDataService;

    constructor() {
        this.pgyDataService = new PgyDataService();
        this.dailyDataService = new DailyDataService();
        this.tbDataService = new TbDataService();
        this.jgDataService = new JgDataService();
    }

    getJgYiCiTuiCiWords: RequestHandler = async (req, res, next) => {
        try {
            const results = await this.jgDataService.getYiCiTuiCiWords();
            res.status(200).send(results);
        } catch (error) {
            next(error);
        }
    }
    setJgYiCiTuiCiWords: RequestHandler = async (req, res, next) => {
        try {
            const {content} = req.body;
            const results = await this.jgDataService.setYiCiTuiCiWords(content);
            res.status(200).send(results);
        } catch (error) {
            next(error);
        }
    }

    setJgShangXiaYouWords: RequestHandler = async (req, res, next) => {
        try {
            const {content} = req.body;
            const results = await this.jgDataService.setShangXiaYouWords(content);
            res.status(200).send(results);
        } catch (error) {
            next(error);
        }
    }
    getJgShangXiaYouWords: RequestHandler = async (req, res, next) => {
        try {
            const results = await this.jgDataService.getShangXiaYouWords();
            res.status(200).send(results);
        } catch (error) {
            next(error);
        }
    }
    getPgyData: RequestHandler = async (req, res, next) => {
        try {
            const results = await this.pgyDataService.getPgyData();
            res.status(200).send(results);
        } catch (error) {
            next(error);
        }
    };

    getJgYiCiTuiCiData: RequestHandler = async (req, res, next) => {
        try {
            const results = await this.jgDataService.getJgYiCiTuiCiData();
            res.status(200).send(results);
        } catch (error) {
            next(error);
        }
    };

    getJgShangXiaYouData: RequestHandler = async (req, res, next) => {
        try {
            const results = await this.jgDataService.getJgShangXiaYouData();
            res.status(200).send(results);
        } catch (error) {
            next(error);
        }
    };

    getDailyBrandData: RequestHandler = async (req, res, next) => {
        try {
            const results = await this.dailyDataService.getDailyBrandData();
            res.status(200).send(results);
        } catch (error) {
            next(error);
        }
    };

    scrapePgyData: RequestHandler = async (req, res, next) => {
        try {
            await this.pgyDataService.scrapePgyData();
            await this.pgyDataService.loadPgyJson();
            await this.pgyDataService.getPgyData(true);
            res.status(200).send();
        } catch (error) {
            next(error);
        }
    };

    scrapeJgYiCiTuiCiData: RequestHandler = async (req, res, next) => {
        try {
            const words = await this.jgDataService.getYiCiTuiCiWords();
            await this.jgDataService.scrapeJgYiCiTuiCiData(words);
            await this.jgDataService.loadJgYiCiTuiCiJson();
            await this.jgDataService.getJgYiCiTuiCiData(true);
            res.status(200).send();
        } catch (error) {
            next(error);
        }
    };

    scrapeJgShangXiaYouData: RequestHandler = async (req, res, next) => {
        try {
            const words = await this.jgDataService.getShangXiaYouWords();
            await this.jgDataService.scrapeJgShangXiaYouData(words);
            await this.jgDataService.transJgShangXiaYouJson();
            res.status(200).send();
        } catch (error) {
            next(error);
        }
    };

    scrapeJgIndustryWordData: RequestHandler = async (req, res, next) => {
        try {
            await this.jgDataService.scrapeJgIndustryWordData();
            res.status(200).send();
        } catch (error) {
            next(error);
        }
    };

    calculatePccsData: RequestHandler = async (req, res, next) => {
        try {
            const nowDate = new Date();
            const year = nowDate.getFullYear();
            const month = (nowDate.getMonth() + 1).toString().padStart(2, '0');
            const day = nowDate.getDate().toString().padStart(2, '0');

            const endDate = `${year}-${month}-${day}`;
            const startDate = req.query.date;

            const dateList = [startDate, endDate];

            const brand = req.query.brand;
            const days = parseInt(req.query.days as string);
            const dailyData = await this.dailyDataService.getDailyData(dateList, brand);
            const dates = [...new Set(dailyData.map(item => item.date))].sort();

            interface AuthorData {
                [key: string]: number;
            }

            interface AuthorsData {
                [author: string]: AuthorData;
            }

            interface DailyData {
                [author: string]: number[];
            }

            interface DateData {
                [author: string]: string[];
            }

            const authorsData: AuthorsData = {};
            dailyData.forEach(item => {
                if (!authorsData[item.author]) {
                    authorsData[item.author] = {};
                    dates.forEach(date => {
                        authorsData[item.author][date] = 0;
                    });
                }
                authorsData[item.author][item.date] = item.data;
            });

            const finalDailyData: DailyData = {};
            const results: {
                brand: string | ParsedQs | string[] | ParsedQs[] | undefined;
                dateRange: string;
                author: string;
                formattedPccs: string;
            }[] = [];

            Object.keys(authorsData).forEach(author => {
                finalDailyData[author] = dates.map(date => authorsData[author][date] || 0);
            });

            const dateData: DateData = {};

            Object.keys(authorsData).forEach(author => {
                dateData[author] = [];
                dates.forEach(date => {
                    if (authorsData[author][date] !== 0) {
                        dateData[author].push(date);
                    }
                });
            });
            const tbData = await this.tbDataService.getTbData(dateList, brand);
            const tbDataList = tbData.map(item => item.search);
            Object.keys(finalDailyData).forEach(author => {
                let filteredAuthorData: number[] = [];
                let filteredTbData: any[] = [];
                let dateRange = "";
                let dateIndex = 0;
                for (let index = 0; index < finalDailyData[author].length; index++) {
                    const value = finalDailyData[author][index];
                    if (value !== 0) {
                        if (filteredAuthorData.length < days) {
                            filteredAuthorData.push(value);
                            filteredTbData.push(tbDataList[index]);
                            if (filteredAuthorData.length === 1) {
                                dateRange = dateData[author][dateIndex];
                            } else if (filteredAuthorData.length === days) {
                                dateRange += " ~ " + dateData[author][dateIndex];
                                break;
                            }
                        }
                        dateIndex += 1;
                    } else {
                        filteredAuthorData = [];
                        filteredTbData = [];
                        dateRange = "";
                    }
                }

                if (filteredAuthorData.length < days) {
                    dateRange = "";
                }
                if (filteredAuthorData.length >= days && filteredTbData.length >= days) {
                    const pccs = ss.sampleCorrelation(filteredAuthorData, filteredTbData);
                    const formattedPccs = (pccs * 100).toFixed(2) + '%';
                    results.push({
                        brand,
                        dateRange,
                        author,
                        formattedPccs
                    });
                }
            });
            res.send(results).status(200);
        } catch (error) {
            next(error);
        }
    }
}
