import React from "react";
import { Card, Divider, Col, Row, Collapse, Table, Tabs } from "antd";
import type { TabsProps } from "antd";

const dataSource = [
  {
    key: "1",
    author: "土拨鼠",
    title: "Olay两款小白瓶 应该怎么选？Get牛奶肌",
    keyword: "美白精华",
    date: "2020-03-13",
    brand: "Olay",
    status: "已收录",
    number: "5",
  },
  {
    key: "2",
    author: "OLAY",
    title: "天气升温，小白伞给你美白防晒双重保护",
    keyword: "美白精华",
    date: "2020-03-23",
    brand: "Olay",
    status: "未收录",
    number: "20",
  },
  {
    key: "3",
    author: "Conybaby",
    title: "小白伞这么厉害❓❓ 防晒测评Q&A‼️",
    keyword: "美白精华",
    date: "2020-07-23",
    brand: "Olay",
    status: "未收录",
    number: "11",
  },
  {
    key: "4",
    author: "Conybaby",
    title: "小白伞这么厉害❓❓ 防晒测评Q&A‼️",
    keyword: "美白精华",
    date: "2020-07-23",
    brand: "Olay",
    status: "未收录",
    number: "11",
  },
  {
    key: "5",
    author: "Conybaby",
    title: "小白伞这么厉害❓❓ 防晒测评Q&A‼️",
    keyword: "美白精华",
    date: "2020-07-23",
    brand: "Olay",
    status: "未收录",
    number: "11",
  },
  {
    key: "6",
    author: "Conybaby",
    title: "小白伞这么厉害❓❓ 防晒测评Q&A‼️",
    keyword: "美白精华",
    date: "2020-07-23",
    brand: "Olay",
    status: "未收录",
    number: "11",
  },
  {
    key: "7",
    author: "Conybaby",
    title: "小白伞这么厉害❓❓ 防晒测评Q&A‼️",
    keyword: "美白精华",
    date: "2020-07-23",
    brand: "Olay",
    status: "未收录",
    number: "11",
  },
];
const columns = [
  {
    title: "作者",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "关键词",
    dataIndex: "keyword",
    key: "keyword",
  },
  {
    title: "笔记情况",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "发布日期",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "品牌",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "在榜次数",
    dataIndex: "number",
    key: "number",
  },
];

const MyTable = () => {
  return <Table dataSource={dataSource} columns={columns} />;
};

export default MyTable;
