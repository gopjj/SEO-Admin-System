import React from "react";

import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import {
  TablePaginationConfig,
  SorterResult,
  TableCurrentDataSource,
} from "antd/es/table/interface";

type DataType = {
  key: string;
  time: string;
  author: string;

  title: string;
  status: string;
  keyword: string;
  keyopinio: string;
};

const columns: ColumnsType<DataType> = [
  {
    title: "作者",
    dataIndex: "author",
    width: "10%",
  },
  {
    title: "标题",
    dataIndex: "title",
    width: "24%",
  },
  {
    title: "关键词",
    dataIndex: "keyword",
    width: "8%",
  },

  {
    title: "收录状态",
    dataIndex: "status",
    filters: [
      {
        text: "已收录",
        value: "已收录",
      },
      {
        text: "未收录",
        value: "未收录",
      },
    ],
    onFilter: (value: string | number | boolean, { status }) =>
      status.startsWith(value.toString()),
    width: "7%",
  },
  {
    title: "KOL/KOC",
    dataIndex: "keyopinio",
    filters: [
      {
        text: "KOL",
        value: "KOL",
      },
      {
        text: "KOC",
        value: "KOC",
      },
    ],
    onFilter: (value: string | number | boolean, { keyopinio }) =>
      keyopinio.startsWith(value.toString()),
    width: "5%",
  },
  {
    title: "收录时间",
    dataIndex: "time",
    render: (time) => {
      const formattedTime = new Intl.DateTimeFormat("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(time));
      return formattedTime;
    },
    filters: [
      {
        text: "2023.09",
        value: "2023-09",
      },
      {
        text: "2023.10",
        value: "2023-10",
      },
      {
        text: "2023.11",
        value: "2023-11",
      },
    ],
    onFilter: (value: string | number | boolean, { time }) =>
      time.startsWith(value.toString()),
    filterSearch: true,
    width: "10%",
  },

  // {
  //   title: 'Age',
  //   dataIndex: 'age',
  //   sorter: (a, b) => a.age - b.age,
  // },
];

const data: DataType[] = [
  {
    key: "1",
    author: "Beauty",
    title: "被问了无数次的水乳推荐来啦！",
    keyword: "水乳推荐",
    time: "2023-08-28",
    status: "已收录",
    keyopinio: "KOL",
  },
  {
    key: "2",
    author: "千岛",
    title: "干皮宝藏水乳推 荐，一起来看看吧！",
    keyword: "水乳推荐",
    time: "2023-11-28",
    status: "已收录",
    keyopinio: "KOC",
  },
  {
    key: "3",
    author: "不拖延の鱼",
    title: "不同肤质水乳推荐",
    keyword: "水乳推荐",
    time: "2023-09-28",
    status: "未收录",
    keyopinio: "KOL",
  },
  {
    key: "4",
    author: "跳跳糖",
    title: "实测好用的水乳推荐,干皮很可",
    keyword: "水乳推荐",
    time: "2023-10-28",
    status: "未收录",
    keyopinio: "KOC",
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const App: React.FC = () => (
  <Table columns={columns} dataSource={data} onChange={onChange} />
);

export default App;
