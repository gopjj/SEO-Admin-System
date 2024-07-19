import {convertJsonToExcel, readJson} from "../utils/JsonUtils.js";
import {runPythonScript} from "../utils/PythonUtils.js";
import {format} from "date-fns";
import {JgDataDao} from "../dao/JgDataDao.js";
import * as fs from "fs";
import {cache} from "../utils/Cache.js";


export class JgDataService {
    private jgDataDao: JgDataDao;

    constructor() {
        this.jgDataDao = new JgDataDao();
    }

    getJgYiCiTuiCiData = async (needFresh: boolean = false) => {
        if (!needFresh && cache.jgYiCiTuiCi.content) {
            return cache.jgYiCiTuiCi.content;
        }
        cache.jgYiCiTuiCi.content = await this.jgDataDao.getJgYiCiTuiCiData();
        console.log("聚光以词推词数据缓存更新成功");
        return cache.jgYiCiTuiCi.content;
    };

    scrapeJgYiCiTuiCiData = async (words: string) => {
        try {
            const output = await runPythonScript("聚光以词推词爬取", [words]);
            console.log(`stdout: ${output}`);
        } catch (error) {
            console.error(error);
        }
    }

    scrapeJgIndustryWordData = async () => {
        try {
            const output = await runPythonScript("聚光行业推词爬取", []);
            console.log(`stdout: ${output}`);
        } catch (error) {
            console.error(error);
        }
    }

    loadJgYiCiTuiCiJson = async () => {
        const today = new Date();
        const dateStr = format(today, 'yyyy-MM-dd');
        const data = await readJson(process.cwd() + '/data/jgData/' + dateStr + '_yicituici_data.json');
        await this.jgDataDao.insertJgYiCiTuiCiData(data);
    }

    getJgShangXiaYouData = async () => {
        return await this.jgDataDao.getJgShangXiaYouData();
    };

    scrapeJgShangXiaYouData = async (words: string) => {
        try {
            const output = await runPythonScript("聚光上下游推词爬取", [words]);
            console.log(`stdout: ${output}`);
        } catch (error) {
            console.error(error);
        }
    }
    transJgShangXiaYouJson = async () => {
        const today = new Date();
        const dateStr = format(today, 'yyyy-MM-dd');
        await convertJsonToExcel(process.cwd() + '/data/jgData/' + dateStr + '_shangxiayou_data.json', process.cwd() + '/data/jgData/' + dateStr + '_shangxiayou_data.xlsx')
    }

    // loadJgShangXiaYouJson = async () => {
    //     const today = new Date();
    //     const dateStr = format(today, 'yyyy-MM-dd');
    //     const data = await readJson(process.cwd() + '/data/jgData/' + dateStr + '_shangxiayou_data.json');
    //     await this.jgDataDao.insertJgShangXiaYouData(data);
    // }
    getShangXiaYouWords = async () => {
        const data = fs.readFileSync(process.cwd() + "/data/jgData/上下游推词关键词.txt", 'utf8');
        console.log(data)
        return data
    }
    getYiCiTuiCiWords = async () => {
        return fs.readFileSync(process.cwd() + "/data/jgData/以词推词关键词.txt", 'utf8')
    }
    setYiCiTuiCiWords = async (data: string) => {
        fs.writeFileSync(process.cwd() + "/data/jgData/以词推词关键词.txt", data, 'utf8');
    }
    setShangXiaYouWords = async (data: string) => {
        fs.writeFileSync(process.cwd() + "/data/jgData/上下游推词关键词.txt", data, 'utf8');
    }
}
