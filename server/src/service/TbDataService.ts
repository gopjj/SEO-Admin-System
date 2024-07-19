import {readJson} from "../utils/JsonUtils.js";
import {runPythonScript} from "../utils/PythonUtils.js";
import {TbDataDao} from "../dao/TbDataDao.js";

export class TbDataService {
    private tbDataDao = new TbDataDao();

    constructor() {
        this.tbDataDao = new TbDataDao();
    }

    getTbData = async (date: any | undefined, brand: any | undefined) => {
        return await this.tbDataDao.getTbData(date, brand);
    }
    extractDataFromExcel = async (fileName: string) => {
        const output = await runPythonScript("清洗淘搜数据", [fileName]);
        console.log(`stdout: ${output}`);
    }

    loadTbJson = async (fileName: string) => {
        const data = await readJson(process.cwd() + '/data/tbData/' + fileName.split('.')[0] + '.json');
        await this.tbDataDao.insertTbData(data);
    }

}
