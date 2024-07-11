import React, { useEffect, useState, useRef } from "react";
import type { ColumnsType } from "antd/lib/table";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, InputRef, Table } from "antd";
import type { ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import style from "../style/Daily.module.css";
import type { TableColumnsType } from 'antd';

type DataSource = {
  author: string;
  note_title: string;
  keyword: string;
  publish_date: string;
  brand: string;
  note_type: string;
  note_link: string;
  brand_emo: string;
  collect_date: Date;
  usertype: string;
  fan: any;
  like: any;
  favourite: any;
  comment: any;
  interaction: any;
};

type DataIndex = keyof DataSource;

interface MyTableProps {
  getList: () => Promise<any>;
}

export const Daily: React.FC<MyTableProps> = ({ getList }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [dataSource, setDataSource] = useState<DataSource[]>([]);
  const [pageIndex, setPageIndex] = useState(0);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataSource> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div className={style.selectPadding} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          className={style.searchInput}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            className={style.searchButton}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            className={style.searchButton}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataSource> = [
    {
      title: "采集日期",
      dataIndex: "collect_date",
      key: "collect_date",
      width: "12%",
      align: "center",
     
      // ...getColumnSearchProps("collect_date"),
    },
    {
      title: "品牌",
      dataIndex: "brand",
      key: "brand",
      width: "10%",
      align: "center",
     
   
      // ...getColumnSearchProps("brand"),
    },
    {
      title: "搜索关键词",
      dataIndex: "keyword",
      key: "keyword",
      width: "10%",
      // width: 150,
      align: "center",
      ...getColumnSearchProps("keyword"),
    },
    {
      title: "笔记标题",
      dataIndex: "note_title",
      key: "note_title",
      width: "16%",
      align: "left",
     
      ...getColumnSearchProps("note_title"),
      render: (text, record) => <a href={`${record.note_link}`}>{text}</a>,
    },
    // {
    //   title: "链接",
    //   dataIndex: "note_link",
    //   key: "note_link",
    //   width: "8%",
    //   // width: 150,
    
    // },
    {
      title: "类型",
      dataIndex: "note_type",
      key: "note_type",
      width: "6%",
      align: "center",
      ...getColumnSearchProps("note_type"),
    },
    {
      title: "发布日期",
      dataIndex: "publish_date",
      key: "publish_date",
      width: "8%",
      align: "center",
      // ...getColumnSearchProps("publish_date"),
    },
    {
      title: "达人",
      dataIndex: "author",
      key: "author",
      width: "6%",
      ...getColumnSearchProps("author"),
    },
    {
      title: "点赞",
      dataIndex: "like",
      key: "like",
      
      align: "center",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "收藏",
      dataIndex: "favourite",
      key: "favourite",
    
      align: "center",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "评论",
      dataIndex: "comment",
      key: "comment",
     
      align: "center",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "互动数",
      dataIndex: "interaction",
      key: "interaction",
      
      align: "center",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "用户类型",
      dataIndex: "usertype",
      key: "usertype",
    
      align: "center",
    },
    {
      title: "粉丝数",
      dataIndex: "fan",
      key: "fan",
    
      align: "center",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "情感",
      dataIndex: "brand_emo",
      key: "brand_emo",
      

      ...getColumnSearchProps("brand_emo"),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await getList();
      console.log("Response from getList:", response); // 调试信息
      if (!Array.isArray(response.data)) {
        throw new Error("Response data is not an array");
      }
      const newData: DataSource[] = response.data.map((data:any) => ({
        collect_date: data.collect_date,
        author: data.author,
        note_title: data.note_title,
        note_link: data.note_link,
        keyword: data.keyword,
        brand: data.brand,
        publish_date: data.publish_date,
        brand_emo: data.brand_emo,
        note_type: data.note_type,
        fan: data.fan,
        like: data.like,
        favourite: data.favourite,
        comment: data.comment,
        usertype: data.usertype,
        interaction: data.interaction,
      }));
      setDataSource((prevData) => [...prevData, ...newData]);
      setPageIndex((prevPageIndex) => prevPageIndex + 1);
    } catch (error) {
      console.error("Error in fetchData:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // 每30秒更新一次数据
    return () => clearInterval(interval); // 清除定时器
  }, []);

  return <Table dataSource={dataSource} columns={columns} />;
};
