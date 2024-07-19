import {readJson} from "../utils/JsonUtils.js";
import {PgyDataDao} from "../dao/PgyDataDao.js";
import {runPythonScript} from "../utils/PythonUtils.js";
import {format} from "date-fns";
import {cache} from "../utils/Cache.js";


export class PgyDataService {
    private pgyDataDao: PgyDataDao;

    constructor() {
        this.pgyDataDao = new PgyDataDao();
    }

    getPgyData = async (needFresh: boolean = false) => {
        if (!needFresh && cache.pgy.content) {
            return cache.pgy.content;
        }
        cache.pgy.content = await this.pgyDataDao.getPgyData();
        console.log("蒲公英数据缓存更新成功");
        return cache.pgy.content;
    };

    scrapePgyData = async () => {
        try {
            const output = await runPythonScript("蒲公英笔记爬取", []);
            console.log(`stdout: ${output}`);
        } catch (error) {
            console.error(error);
        }
    }

    loadPgyJson = async () => {
        const today = new Date();
        const dateStr = format(today, 'yyyy-MM-dd');
        const data = await readJson(process.cwd() + '/data/pgyData/' + dateStr + '_notes_data.json');
        await this.pgyDataDao.insertPgyData(data);
    }
}
