import React, {useEffect, useState, useMemo} from 'react';
import {Button, Calendar, Card, DatePicker, Input, Modal, notification, Table} from 'antd';
import styles from "../style/PgyDataTrack.module.css";
import {getPgyData, PgyData, scrapePgyData} from "../../dashboard/api/Index";
import {PgyColumns} from "./TableColumns";
import {NotificationPlacement} from "antd/es/notification/interface";

const {RangePicker} = DatePicker;

export const PgyDataTrack: React.FC = () => {
    const [api, contextHolder] = notification.useNotification();
    const [notificationPlacement, setNotificationPlacement] = useState<NotificationPlacement | null>(null);
    const [notificationMessage, setNotificationMessage] = useState<string>('');
    const [noteId, setNoteId] = useState('');
    const [noteTitle, setNoteTitle] = useState('');
    const [collectedDate, setCollectedDate] = useState<string[] | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [scrapedDates, setScrapedDates] = useState<any[]>([]);
    const [allData, setAllData] = useState<PgyData[]>([]);
    const [filteredData, setFilteredData] = useState<PgyData[]>([]);
    const [pagination, setPagination] = useState({current: 1, pageSize: 10});

    const openNotification = (placement: NotificationPlacement, message: string) => {
        api.success({
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

    const fetchData = async () => {
        try {
            let data = await getPgyData();
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

    const handleScrapePgyData = async () => {
        setLoading(true);
        await scrapePgyData();
        setLoading(false);
        await fetchData();
        setNotificationPlacement('top');
        setNotificationMessage('蒲公英数据爬取成功');
    };
    const handleFilterChange = (key: string, value: string | string[] | undefined) => {
        switch (key) {
            case 'noteId':
                setNoteId(value as string);
                break;
            case 'noteTitle':
                setNoteTitle(value as string);
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
        if (noteTitle) {
            newData = newData.filter(item => item['noteTitle'].includes(noteTitle));
        }
        if (noteId) {
            newData = newData.filter(item => item['noteId'].includes(noteId));
        }
        return newData;
    }, [allData, collectedDate, noteTitle, noteId]);

    const handleSearch = () => {
        setFilteredData(filteredDataMemo);
        setPagination({...pagination, current: 1});
    };

    const handleReset = () => {
        setNoteId('');
        setNoteTitle('');
        setFilteredData(allData);
        setPagination({...pagination, current: 1});
    };

    const dateCellRender = (value: {
        format: (arg0: string) => any;
        date: () => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
    }) => {
        const dateStr = value.format('YYYY-MM-DD');
        const isScraped = scrapedDates.includes(dateStr);
        const cellClassName = `${styles.dateCell} ${isScraped ? styles.dateCellScraped : ''}`;
        return (
            <div className={cellClassName}>
                {value.date()}
            </div>
        );
    };

    const handleTableChange = (pagination: any) => {
        setPagination(pagination);
    };

    return (
        <div className={styles.container}>
            {contextHolder}
            <Card className={styles.customCard} extra={
                <div className={styles.rightFloat}>
                    <Modal
                        title="数据爬取日历"
                        open={isCalendarVisible}
                        onCancel={() => setIsCalendarVisible(false)}
                        footer={null}
                        width="60%"
                    >
                        <Calendar fullscreen={false} cellRender={dateCellRender}/>
                    </Modal>
                    <span>每日10:10自动爬取</span>
                    <Button className={styles.btn} type="primary"
                            onClick={() => setIsCalendarVisible(true)}>显示爬取日历</Button>
                    <Button className={styles.btn}
                            type="primary"
                            onClick={handleScrapePgyData}
                            loading={loading}
                    >
                        爬取蒲公英数据
                    </Button>
                </div>
            }>
                <div>
                    <div>
                        <Input
                            className={styles.input}
                            id="noteId"
                            placeholder="输入笔记ID"
                            value={noteId}
                            onChange={e => handleFilterChange("noteId", e.target.value)}
                        />
                        <Input
                            className={styles.input}
                            id="noteTitle"
                            placeholder="输入笔记标题"
                            value={noteTitle}
                            onChange={e => handleFilterChange("noteTitle", e.target.value)}
                        />
                        <RangePicker
                            id="collectedDate"
                            placeholder={['开始日期', '结束日期']}
                            onChange={(_, dateStrings) => handleFilterChange("collectedDate", dateStrings)}
                        />

                        <Button className={styles.btn} type="primary" onClick={handleSearch}>搜索</Button>
                        <Button className={styles.btn} type="primary" onClick={handleReset}>重置</Button>
                    </div>
                    <Table
                        rowKey={(record) => `${record.collectedDate}-${record.noteId}`}
                        columns={PgyColumns}
                        dataSource={filteredData}
                        scroll={{x: 'max-content'}}
                        pagination={pagination}
                        onChange={handleTableChange}
                    />
                </div>
            </Card>
        </div>
    );
};
