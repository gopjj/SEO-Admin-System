import schedule from 'node-schedule';
import {PgyDataService} from "../service/PgyDataService.js";
import axios from 'axios';
import {JgDataService} from "../service/JgDataService.js";
const WEBHOOK_URL = process.env.WEBHOOK_URL || '';
const pgyDataService = new PgyDataService();
await pgyDataService.getPgyData();
const jgDataService = new JgDataService();
await jgDataService.getJgYiCiTuiCiData();

async function sendWebhookMessage(taskName: string) {
    const params = {
        "msgtype": "text",
        "text": {
            "content": taskName,
        }
    }
    try {
        const response = await axios.post(WEBHOOK_URL, params);
        console.log(`Webhook发送成功："${taskName}":`, response.status);
    } catch (error) {
        console.error(`webhook发送失败："${taskName}":`, error);
    }
}

export function setupScheduledTasks() {
    schedule.scheduleJob('0 10 10 * * *', async function () {
        await pgyDataService.scrapePgyData();
        await pgyDataService.loadPgyJson();
        console.log("蒲公英数据爬取完成，当前时间：", new Date().toLocaleTimeString());
        await sendWebhookMessage("蒲公英数据爬取完成")
        await pgyDataService.getPgyData(true);
    });
    schedule.scheduleJob('0 15 10 * * *', async function () {
        const words = await jgDataService.getYiCiTuiCiWords();
        await jgDataService.scrapeJgYiCiTuiCiData(words);
        await jgDataService.loadJgYiCiTuiCiJson();
        console.log("聚光以词推词数据爬取完成，当前时间：", new Date().toLocaleTimeString());
        await sendWebhookMessage("聚光以词推词数据爬取完成")
        await jgDataService.getJgYiCiTuiCiData(true);
    });
    schedule.scheduleJob('0 20 10 * * *', async function () {
        const words = await jgDataService.getShangXiaYouWords();
        await jgDataService.scrapeJgShangXiaYouData(words);
        await jgDataService.transJgShangXiaYouJson();
        console.log("聚光上下游推词数据爬取完成，当前时间：", new Date().toLocaleTimeString());
        await sendWebhookMessage("聚光上下游推词数据爬取完成")
    });
    schedule.scheduleJob('0 25 10 * * *', async function () {
        await jgDataService.scrapeJgIndustryWordData();
        console.log("聚光行业推词数据爬取完成，当前时间：", new Date().toLocaleTimeString());
        await sendWebhookMessage("聚光行业推词数据爬取完成")
    });
}

