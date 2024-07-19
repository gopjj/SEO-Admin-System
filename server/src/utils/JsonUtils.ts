import {readFile} from "fs/promises";
import * as XLSX from 'xlsx';
import * as fs from 'fs';
XLSX.set_fs(fs);
export async function readJson(filePath: string): Promise<any[]> {
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
}

export async function convertJsonToExcel(filePath: string, outputFilePath: string) {
    try {
        const jsonData = readJson(filePath)
        const worksheet = XLSX.utils.json_to_sheet(await jsonData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        XLSX.writeFile(workbook, outputFilePath);
        console.log(`${filePath} 生成Excel成功，文件： ${outputFilePath}`);
    } catch (error) {
        console.error('转化JSON数据到Excel失败', error);
    }
}

