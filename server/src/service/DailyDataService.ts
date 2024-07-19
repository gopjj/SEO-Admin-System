import {readJson} from "../utils/JsonUtils.js";
import {runPythonScript} from "../utils/PythonUtils.js";
import {DailyDataDao} from "../dao/DailyDataDao.js";

export class DailyDataService {
    private dailyDataDao = new DailyDataDao();

    constructor() {
        this.dailyDataDao = new DailyDataDao();
    }

    getDailyData = async (date: any | undefined, brand: any | undefined) => {
        
        console.log(brand)
        return await this.dailyDataDao.getDailyData(date, brand);
    };
    getDailyBrandData = async () => {
        return await this.dailyDataDao.getDailyBrandData();
    };
    extractDataFromExcel = async (fileName: string) => {
        const output = await runPythonScript("清洗投流日报", [fileName]);
        console.log(`stdout: ${output}`);
    }
    loadDailyJson = async (fileName: string) => {
        const data = await readJson(process.cwd() + '/data/dailyData/' + fileName.split('.')[0] + '.json');
        console.log(data);
        await this.dailyDataDao.insertDailyData(data);
    }

}
