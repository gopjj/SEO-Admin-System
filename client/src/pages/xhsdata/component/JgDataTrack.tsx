import React, {useEffect, useMemo, useState} from 'react';
import {
    Button,
    Calendar,
    Card,
    DatePicker,
    FloatButton, Form,
    Input,
    message,
    Modal,
    notification,
    Table,
    Tooltip
} from 'antd';
import styles from "../style/JgDataTrack.module.css";
import {
    getJgShangXiaYouWords,
    getJgYiCiTuiCiData,
    getJgYiCiTuiCiWords,
    JgYiCiTuiCiData,
    scrapeJgIndustryWordData,
    scrapeJgShangXiaYouData,
    scrapeJgYiCiTuiCiData, setJgShangXiaYouWords,
    setJgYiCiTuiCiWords
} from "../../dashboard/api/Index";
import {JgYiCiTuiCiColumns} from "./TableColumns";
import {Line} from '@ant-design/charts';
import * as XLSX from "xlsx";
import {DownloadOutlined, UpOutlined} from "@ant-design/icons";

const {RangePicker} = DatePicker;

type NotificationPlacement = 'top' | 'topRight' | 'bottomLeft' | 'bottomRight';

export const JgDataTrack: React.FC = () => {
    const [api, contextHolder] = notification.useNotification();
    const [notificationPlacement, setNotificationPlacement] = useState<NotificationPlacement | null>(null);
    const [notificationMessage, setNotificationMessage] = useState<string>('');

    const [isSettingVisible, setIsSettingVisible] = useState(false);
    const [settingYiCiTuiCiKeywords, setSettingYiCiTuiCiKeywords] = useState<string>('');
    const [settingShangXiaYouKeywords, setSettingShangXiaYouKeywords] = useState<string>('');

    const openNotification = (placement: NotificationPlacement, message: string) => {
        api.success({
            message: message,
            description: "",
            placement,
        });
    };

    const openWarningNotification = (placement: NotificationPlacement, message: string) => {
        api.warning({
            message: message,
            description: "",
            placement,
        });
    };

    useEffect(() => {
        if (notificationPlacement) {
            openNotification(notificationPlacement, notificationMessage);
            setNotificationPlacement(null);
        }
    }, [notificationPlacement, notificationMessage]);

    const [keyword, setKeyword] = useState('');
    const [collectedDate, setCollectedDate] = useState<string[] | undefined>(undefined);
    const [loadingScrapeJgYiCiTuiCiData, setLoadingScrapeJgYiCiTuiCiData] = useState(false);
    const [loadingScrapeJgShangXiaYouData, setLoadingScrapeJgShangXiaYouData] = useState(false);
    const [loadingScrapeJgIndustryWordData, setLoadingScrapeJgIndustryWordData] = useState(false);
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [isTrendModalVisible, setIsTrendModalVisible] = useState(false);
    const [scrapedDates, setScrapedDates] = useState<any[]>([]);
    const [allData, setAllData] = useState<JgYiCiTuiCiData[]>([]);
    const [filteredData, setFilteredData] = useState<JgYiCiTuiCiData[]>([]);
    const [pagination, setPagination] = useState({current: 1, pageSize: 10});

    const fetchData = async () => {
        try {
            let data = await getJgYiCiTuiCiData();
            setAllData(data);
            setFilteredData(data);
            const datesSet = new Set<string>(data.map(item => item.collectedDate));
            setScrapedDates([...datesSet]);
        } catch (error) {
            console.error('获取数据失败: ', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleScrapeJgYiCiTuiCiData = async () => {
        setLoadingScrapeJgYiCiTuiCiData(true);
        try {
            await scrapeJgYiCiTuiCiData();
            await fetchData();
            setNotificationPlacement('top');
            setNotificationMessage('聚光以词推词数据爬取成功');
        } finally {
            setLoadingScrapeJgYiCiTuiCiData(false);
        }
    };

    const handleExport = () => {
        if (!collectedDate || !keyword) {
            message.warning('请确保已经选择了日期和关键词！');
            return;
        }
        const data: JgYiCiTuiCiData[] = filteredData;
        const customColumnNames = {
            collectedDate: '日期',
            keyword: '关键词',
            monthpv: '月搜索指数',
            competitionScore: '竞争指数',
            competitionLevel: '竞争水平',
            recommendReason: '推荐原因',
            bid: '出价'
        };
        const exportedData = data.map(item => {
            return {
                [customColumnNames.collectedDate]: item.collectedDate,
                [customColumnNames.keyword]: item.keyword,
                [customColumnNames.monthpv]: item.monthpv,
                [customColumnNames.competitionScore]: item.competitionScore,
                [customColumnNames.competitionLevel]: item.competitionLevel,
                [customColumnNames.recommendReason]: item.recommendReason,
                [customColumnNames.bid]: item.bid
            };
        });
        const worksheet = XLSX.utils.json_to_sheet(exportedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, keyword + "-" + "以词推词数据");
        XLSX.writeFile(workbook, collectedDate.toString() + "-" + keyword + "-" + "以词推词数据.xlsx");
    };

    const handleScrapeJgShangXiaYouData = async () => {
        setLoadingScrapeJgShangXiaYouData(true);
        try {
            await scrapeJgShangXiaYouData();
            setNotificationPlacement('top');
            setNotificationMessage('聚光上下游推词数据爬取成功');
        } finally {
            setLoadingScrapeJgShangXiaYouData(false);
        }
    };

    const handleScrapeJgIndustryWordData = async () => {
        setLoadingScrapeJgIndustryWordData(true);
        try {
            await scrapeJgIndustryWordData();
            setNotificationPlacement('top');
            setNotificationMessage('聚光行业推词数据爬取成功');
        } finally {
            setLoadingScrapeJgIndustryWordData(false);
        }
    };

    const handleFilterChange = (key: string, value: string | string[] | undefined) => {
        switch (key) {
            case 'keyword':
                setKeyword(value as string);
                break;
            case 'collectedDate':
                setCollectedDate(value as string[]);
                break;
            default:
                break;
        }
    };

    const filteredDataMemo = useMemo(() => {
        let newData = allData;
        if (collectedDate) {
            newData = newData.filter(item => {
                const date = item['collectedDate'];
                return collectedDate[0] <= date && date <= collectedDate[1];
            });
        }
        if (keyword) {
            newData = newData.filter(item => item['keyword'] === keyword);
        }
        return newData;
    }, [allData, collectedDate, keyword]);

    const handleSearch = () => {
        setFilteredData(filteredDataMemo);
        setPagination({...pagination, current: 1});
    };

    const handleReset = () => {
        setKeyword('');
        setFilteredData(allData);
    };

    const handleTableChange = (pagination: any) => {
        setPagination(pagination);
    };

    const handleTrendClick = () => {
        if (!collectedDate || !keyword) {
            openWarningNotification('top', '请先选择日期和关键词');
            return;
        }
        handleSearch();
        setIsTrendModalVisible(true);
    };

    const handleSettingClick = async () => {
        try {
            const yiCiTuiCiData = await getJgYiCiTuiCiWords();
            const shangXiaYouData = await getJgShangXiaYouWords();
            setSettingShangXiaYouKeywords(shangXiaYouData);
            setSettingYiCiTuiCiKeywords(yiCiTuiCiData);
            setIsSettingVisible(true);
        } catch (error) {
            console.error('获取设定失败: ', error);
        }
    };

    const handleSaveSetting = async () => {
        try {
            await setJgYiCiTuiCiWords(settingYiCiTuiCiKeywords);
            await setJgShangXiaYouWords(settingShangXiaYouKeywords);
            message.success('保存成功');
            setIsSettingVisible(false);
        } catch (error) {
            console.error('保存设定失败: ', error);
            message.error('保存失败');
        }
    };

    const dateCellRender = (value: any) => {
        const dateStr = value.format('YYYY-MM-DD');
        const isScraped = scrapedDates.includes(dateStr);
        const cellClassName = isScraped ? `${styles.dateCellScraped}` : `${styles.dateCell}`;
        return (
            <div className={cellClassName}>
                <span>{value.date()}</span>
            </div>
        );
    };
    const shortedData = filteredData.map(item => ({
        ...item,
        collectedDate: item.collectedDate.slice(-5).replace('-', ""),
    }));

    const config = {
        data: shortedData,
        height: 400,
        xField: 'collectedDate',
        yField: 'monthpv',
        padding: 'auto',
        point: {
            size: 5,
            shape: 'diamond',
        },
        style: {
            lineWidth: 2,
        },
    };
    const modalWidth = window.innerWidth * 0.6;

    return (
        <div className={styles.container}>
            {contextHolder}
            <FloatButton.Group
                className={styles.floatButtonGroup}
                trigger="hover"
                type="default"
                description="展开"
                shape="square"
                icon={<UpOutlined/>}
            >
                <Tooltip title="爬取关键词设定" placement="left">
                    <FloatButton type="default" description="爬取词组"
                                 shape="square" onClick={handleSettingClick}/>
                </Tooltip>
                <Tooltip title="显示以词推词爬取日历" placement="left">
                    <FloatButton type="default" description="爬取日历"
                                 shape="square" onClick={() => setIsCalendarVisible(true)}/>
                </Tooltip>
                <Tooltip title="爬取聚光以词推词数据" placement="left">
                    <FloatButton description={loadingScrapeJgYiCiTuiCiData ? "爬取中.." : "以词推词"}
                                 shape="square" type="default" onClick={handleScrapeJgYiCiTuiCiData}/>
                </Tooltip>
                <Tooltip title="爬取聚光上下游推词数据" placement="left">
                    <FloatButton description={loadingScrapeJgShangXiaYouData ? "爬取中.." : "上下游词"}
                                 shape="square" type="default" onClick={handleScrapeJgShangXiaYouData}/>
                </Tooltip>
                <Tooltip title="爬取聚光行业推词数据" placement="left">
                    <FloatButton description={loadingScrapeJgIndustryWordData ? "爬取中.." : "行业推词"}
                                 shape="square" type="default" onClick={handleScrapeJgIndustryWordData}/>
                </Tooltip>
            </FloatButton.Group>
            <Tooltip title="导出" placement="left">
                <FloatButton
                    className={styles.floatButton}
                    shape="circle"
                    type="default"
                    icon={<DownloadOutlined/>}
                    onClick={handleExport}
                />
            </Tooltip>
            <Card className={styles.customCard} extra={
                <div className={styles.rightFloat}>
                    <Modal
                        title="以词推词爬取日历"
                        open={isCalendarVisible}
                        onCancel={() => setIsCalendarVisible(false)}
                        footer={null}
                        width={800}
                    >
                        <Calendar fullscreen={false} cellRender={dateCellRender}/>
                    </Modal>
                    <span>每日10点，15，20，25分依次自动爬取</span>
                </div>
            }>
                <div>
                    <div>
                        <Input
                            className={styles.input}
                            id="keyword"
                            placeholder="输入关键词"
                            value={keyword}
                            onChange={e => handleFilterChange("keyword", e.target.value)}
                        />
                        <RangePicker
                            id="collectedDate"
                            placeholder={['开始日期', '结束日期']}
                            onChange={(_, dateStrings) => handleFilterChange("collectedDate", dateStrings)}
                        />

                        <Button className={styles.btn} type="primary" onClick={handleSearch}>搜索</Button>
                        <Button className={styles.btn} type="primary" onClick={handleReset}>重置</Button>
                        <Button
                            className={styles.btn}
                            type="primary"
                            onClick={handleTrendClick}
                        >
                            显示搜索趋势图
                        </Button>
                    </div>
                    <Table
                        rowKey={(record) => `${record.collectedDate}-${record.keyword}`}
                        columns={JgYiCiTuiCiColumns}
                        dataSource={filteredData}
                        scroll={{x: 'max-content'}}
                        pagination={pagination}
                        onChange={handleTableChange}
                    />
                    <Modal
                        width={modalWidth}
                        title="搜索趋势"
                        open={isTrendModalVisible}
                        onCancel={() => setIsTrendModalVisible(false)}
                        footer={null}
                    >
                        
                    </Modal>
                    <Modal
                        title="爬取关键词设定"
                        open={isSettingVisible}
                        onCancel={() => setIsSettingVisible(false)}
                        footer={[
                            <Button key="cancel" onClick={() => setIsSettingVisible(false)}>取消</Button>,
                            <Button key="save" type="primary" onClick={handleSaveSetting}>保存</Button>
                        ]}
                    >
                        <Form layout="vertical">
                            <Form.Item label="以词推词关键词">
                                <Input.TextArea
                                    rows={10}
                                    value={settingYiCiTuiCiKeywords}
                                    onChange={(e) => setSettingYiCiTuiCiKeywords(e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item label="上下游推词关键词">
                                <Input.TextArea
                                    rows={10}
                                    value={settingShangXiaYouKeywords}
                                    onChange={(e) => setSettingShangXiaYouKeywords(e.target.value)}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </Card>
        </div>
    );
};