import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    Modal,
    Upload,
    UploadProps,
    Table,
    DatePicker,
    message,
    InputNumber,
    Calendar,
    FloatButton, Tooltip
} from 'antd';
import {DownloadOutlined, UploadOutlined} from '@ant-design/icons';
import styles from "../style/PccsDataTrack.module.css";
import {API_BASE_URL} from "../../../config";
import ApiList from "../../../config/apiList";
import {UploadChangeParam, UploadFile} from 'antd/lib/upload';
import {calculatePccsData, getDailyBrandData, PccsData} from "../../dashboard/api/Index";
import {Select} from 'antd';
import {PccsColumns} from "./TableColumns";
import * as XLSX from 'xlsx';

export const PccsDataTrack: React.FC = () => {
    const [isTbModalVisible, setIsTbModalVisible] = useState(false);
    const [isDailyModalVisible, setIsDailyModalVisible] = useState(false);
    const [searchDate, setSearchDate] = useState<string | undefined>(undefined);
    const [days, setDays] = useState<number>(15);
    const [allData, setAllData] = useState<Record<string, any[]>>({
        "投流数据": []
    });
    const {Option} = Select;
    const [brands, setBrands] = useState<string[]>([]);
    
    const [selectedBrand, setSelectedBrand] = useState<string | undefined>(undefined);

    const fetchData = async () => {
        try {
            const response = await getDailyBrandData();
            
            setBrands(response);
        } catch (error) {
            console.error('获取数据失败: ', error);
        }
    };

    useEffect(() => {
        fetchData();
        
    }, []);

    const showTbModal = () => {
        setIsTbModalVisible(true);
    };

    const showDailyModal = () => {
        setIsDailyModalVisible(true);
    };

    const handleTbClose = () => {
        setIsTbModalVisible(false);
    };

    const handleDailyClose = () => {
        setIsDailyModalVisible(false);
    };

    const handleDateChange = (value: string | string[] | undefined) => {
        setSearchDate(value as string);
    };

    const uploadTbProps: UploadProps = {
        name: 'file',
        accept: ".csv,.xlsx,.xls",
        action: API_BASE_URL + ApiList.uploadTb,
        onChange: (info: UploadChangeParam<UploadFile<any>>) => {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                console.log(`${info.file.name}文件上传成功`);
            } else if (info.file.status === 'error') {
                console.log(`${info.file.name}文件上传失败`);
            }
        },
    };

    const handleCalculate = async () => {
        if (!searchDate || !selectedBrand || !days) {
            message.warning('请确保选择了开始日期、计算天数和品牌！');
            return;
        }
        const response = await calculatePccsData(searchDate, selectedBrand, days);
        setAllData({"投流数据": response});
    };

    const handleDaysChange = (value: number | null) => {
        if (value !== null) {
            setDays(value);
        }
    };

    const uploadDailyProps: UploadProps = {
        name: 'file',
        accept: ".csv,.xlsx,.xls",
        action: API_BASE_URL + ApiList.uploadDaily,
        onChange: (info: UploadChangeParam<UploadFile<any>>) => {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            } else {
                fetchData();
            }
        },
    };

    const handleExport = () => {
        if (!searchDate || !selectedBrand || !days) {
            message.warning('请确保已经进行过计算！');
            return;
        }
        const data: PccsData[] = allData["投流数据"];
        const customColumnNames = {
            brand: '品牌',
            dateRange: '日期范围',
            author: '达人',
            formattedPccs: '皮尔森系数'
        };
        const exportedData = data.map(item => {
            return {
                [customColumnNames.brand]: item.brand,
                [customColumnNames.dateRange]: item.dateRange,
                [customColumnNames.author]: item.author,
                [customColumnNames.formattedPccs]: item.formattedPccs
            };
        });
        const worksheet = XLSX.utils.json_to_sheet(exportedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, selectedBrand + "-" + days + "-" + "皮尔森系数");
        XLSX.writeFile(workbook, selectedBrand + "-" + days + "-" + "皮尔森系数.xlsx");
    };

    return (
        <div className={styles.container}>
            <Tooltip title="导出">
                <FloatButton
                    className={styles.floatBtn}
                    shape="circle"
                    type="default"
                    icon={<DownloadOutlined/>}
                    onClick={handleExport}
                />
            </Tooltip>
            <Card className={styles.customCard}>
                <Button className={styles.btn} type="primary" onClick={showTbModal}>
                    上传淘搜指数数据
                </Button>
                <Modal
                    title="淘搜指数数据文件上传"
                    open={isTbModalVisible}
                    onCancel={handleTbClose}
                    footer={[
                        <Button onClick={handleTbClose}>
                            关闭
                        </Button>,
                    ]}
                >
                    <Upload.Dragger {...uploadTbProps}>
                        <p className="ant-upload-drag-icon">
                            <UploadOutlined/>
                        </p>
                        <p className="ant-upload-text">点击或者拖动文件到这个区域进行上传</p>
                        <p className="ant-upload-hint">
                            淘搜指数数据文件上传到这里。
                        </p>
                    </Upload.Dragger>
                </Modal>

                <Button className={styles.btn} type="primary" onClick={showDailyModal}>
                    上传投流数据文件
                </Button>
                <Modal
                    title="投流数据文件上传"
                    open={isDailyModalVisible}
                    onCancel={handleDailyClose}
                    footer={[
                        <Button onClick={handleDailyClose}>
                            关闭
                        </Button>,
                    ]}
                >
                    <Upload.Dragger {...uploadDailyProps}>
                        <p className="ant-upload-drag-icon">
                            <UploadOutlined/>
                        </p>
                        <p className="ant-upload-text">点击或者拖动文件到这个区域进行上传</p>
                        <p className="ant-upload-hint">
                            投流数据文件上传到这里。
                        </p>
                    </Upload.Dragger>
                </Modal>

                <DatePicker
                    className={styles.datePicker}
                    id="date"
                    placeholder="选择开始日期"
                    onChange={(_, dateString) => handleDateChange(dateString)}
                />
                <InputNumber
                    min={1}
                    className={styles.inputNumber}
                    placeholder="输入计算天数"
                    onChange={handleDaysChange}
                />
                <Select
                    className={styles.select}
                    showSearch
                    placeholder="选择品牌"
                    optionFilterProp="children"
                    onChange={value => setSelectedBrand(value)}
                    filterOption={(input, option) =>
                        option?.children
                            ? option.children.toString().toLowerCase().includes(input.toLowerCase())
                            : false
                    }
                >
                    {brands.map(brand => (
                        <Option key={brand} value={brand}>{brand}</Option>
                    ))}
                </Select>
                
                <Button className={styles.btn} type="primary" onClick={handleCalculate}>计算皮尔森系数</Button>
                <Table
                    rowKey={(record) => `${record.dateRange}-${record.author}`}
                    dataSource={allData["投流数据"]}
                    columns={PccsColumns}
                    pagination={{pageSize: 10}}
                    scroll={{x: 'max-content'}}
                />
            </Card>
        </div>
    );
};
