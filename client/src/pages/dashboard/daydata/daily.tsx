import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { getList } from "../api/index";

type DataSource = {
  key: string | number;
  id: number;
  author: string;
  title: string;
  keyword: string;
  date: string;
  brand: string;
  status: string;
  number: number;
  // 其他属性...
};

const columns: ColumnsType<DataSource> = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
    width: "4%",
    align: "center",
  },
  {
    title: "作者",
    dataIndex: "author",
    key: "author",
    width: "8%",
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    width: "35%",
    
  },
  {
    title: "关键词",
    dataIndex: "keyword",
    key: "keyword",
    width: "8%",
   
  },
  {
    title: "笔记情况",
    dataIndex: "status",
    key: "status",
    width: "8%",
    align: "center",

  },
  {
    title: "发布日期",
    dataIndex: "date",
    key: "date",
    width: "8%",
    align: "center",
  },
  {
    title: "品牌",
    dataIndex: "brand",
    key: "brand",
    width: "8%",
    align: "center",
  },
  {
    title: "在榜次数",
    dataIndex: "number",
    key: "number",
    width: "6%",
    align: "center",
  },
];

const MyTable = () => {
  const [dataSource, setDataSource] = useState<DataSource[]>([]);
  const [maxId, setMaxId] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getList();
        const returnedData = response as unknown as Array<any>;
        let tempMaxId = 0;
        const newData: DataSource[] = [];
        for (const data of returnedData) {
          newData.push({
            key: data.ID,
            id: data.ID,
            author: data.author,
            title: data.note_title,
            keyword: data.keyword,
            date: data.publish_date,
            brand: data.brand,
            status: data.note_status,
            number: data.listed,
          });
          
        }

        setDataSource(newData);
        setMaxId(tempMaxId);
        console.log(returnedData.length)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return <Table dataSource={dataSource} columns={columns} />;
};

export default MyTable;