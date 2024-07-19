import type {ColumnsType} from "antd/es/table";
import React from "react";
import styles from "../style/TableColumns.module.css";

export const PccsColumns: ColumnsType<any> = [
    {title: '品牌', dataIndex: 'brand', key: 'brand'},
    {title: '日期', dataIndex: 'dateRange', key: 'dateRange'},
    {title: '达人', dataIndex: 'author', key: 'author'},
    {title: '皮尔森系数', dataIndex: 'formattedPccs', key: 'formattedPccs'},
]

export const JgYiCiTuiCiColumns: ColumnsType<any> = [
    {title: '采集日期', dataIndex: 'collectedDate', key: 'collectedDate'},
    {title: '关键词', dataIndex: 'keyword', key: 'keyword'},
    {title: '月均搜索指数', dataIndex: 'monthpv', key: 'monthpv'},
    {title: '市场出价(元)', dataIndex: 'bid', key: 'bid'},
    {title: '竞争指数', dataIndex: 'competitionScore', key: 'competitionScore'},
    {title: '竞争水平', dataIndex: 'competitionLevel', key: 'competitionLevel'},
    {title: '推荐理由', dataIndex: 'recommendReason', key: 'recommendReason'},
]

export const PgyColumns: ColumnsType<any> = [
    {title: '采集日期', dataIndex: 'collectedDate', key: 'collectedDate'},
    {
        title: '笔记详情',
        key:'noteTitle',
        dataIndex: 'noteTitle',
        render: (text, record) => (
            <div className={styles.noteDetails}>
                <img src={record["noteCover"]} alt="封面" className={styles.noteCover} referrerPolicy="no-referrer"/>
                <div className={styles.noteDescription}>
                    <div className={styles.boldText}>{text}</div>
                    <div className={styles.grayText}>{record.noteType} ID: {record["noteId"]}</div>
                </div>
            </div>
        )
    },

    {
        title: '操作',
        dataIndex: 'noteId',
        key: 'noteLink',
        render: text => (
            <a href={"https://www.xiaohongshu.com/explore/" + text} target="_blank" className={styles.link}>
                点击跳转
            </a>
        )
    },

    {
        title: '博主信息',
        key: 'kolProfile',
        dataIndex: 'kolNickName',
        render: (text, record) => (
            <>
                <div>{text}</div>
                <div className={styles.smallText}>
                    粉丝数：{record["kolFanNum"]}
                </div>
            </>
        )
    },
    {title: '阅读UV', dataIndex: 'readUvNum', key: 'readUvNum'},
    {title: '曝光量', dataIndex: 'impNum', key: 'impNum'},
    {title: '阅读量', dataIndex: 'readNum', key: 'readNum'},
    {title: '互动数', dataIndex: 'engageNum', key: 'engageNum'},
    {title: '互动率', dataIndex: 'engageRate', key: 'engageRate'},
    {title: '平均浏览时长', dataIndex: 'avgViewTime', key: 'avgViewTime'},
    {title: '视频笔记5s播放率', dataIndex: 'videoPlay5sRate', key: 'videoPlay5sRate'},
    {title: '图文笔记3s阅读率', dataIndex: 'picRead3sRate', key: 'picRead3sRate'},
    {title: '喜欢', dataIndex: 'likeNum', key: 'likeNum'},
    {title: '收藏', dataIndex: 'favNum', key: 'favNum'},
    {title: '评论', dataIndex: 'cmtNum', key: 'cmtNum'},
    {title: '分享', dataIndex: 'shareNum', key: 'shareNum'},
    {title: '关注', dataIndex: 'followCnt', key: 'followCnt'},
    {title: '发布时间', dataIndex: 'notePublishTime', key: 'notePublishTime'},
    {title: '博主报价', dataIndex: 'kolPrice', key: 'kolPrice'},
    {title: '服务费金额', dataIndex: 'totalPlatformPrice', key: 'totalPlatformPrice'},
    {title: 'SPU名称', dataIndex: 'spuName', key: 'spuName'},
    {title: '视频总时长', dataIndex: 'duration', key: 'duration'},
    {title: '订单号', dataIndex: 'bizId', key: 'bizId'},
];