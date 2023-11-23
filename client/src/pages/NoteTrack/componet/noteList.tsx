import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import React, { useEffect, useRef, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Input, Space } from "antd";
import type { ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

type DataSource = {
  id: number;
  author: string;
  notetitle: string;
  keyword: string;
  date: string;
  brand: string;
  notelink: string;
  noteexo: number;
  imdate: any;
  fdate: any;
  noteaco: number;
};

type DataIndex = keyof DataSource;

interface MyTableProps {
  getListFunction: () => Promise<any>;
}

const MyTable: React.FC<MyTableProps> = ({ getListFunction }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [dataSource, setDataSource] = useState<DataSource[]>([]);

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

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataSource> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
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
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffffff", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataSource> = [
    {
      title: "序号",
      dataIndex: "id",
      width: "4%",
    },
    {
      title: "品牌",
      dataIndex: "brand",
      width: "8%",
      ...getColumnSearchProps("brand"),
    },
    {
      title: "执行日期",
      dataIndex: "imdate",
      width: "8%",
      ...getColumnSearchProps("imdate"),
    },
    {
      title: "筛选日期",
      dataIndex: "fdate",
      width: "8%",
    },
    {
      title: "关键词",
      dataIndex: "keyword",
      width: "8%",
    },
    {
      title: "昵称",
      dataIndex: "author",
      width: "8%",
    },
    {
      title: "笔记标题",
      dataIndex: "notetitle",
      width: "24%",
      render: (text, record) => <a href={`${record.notelink}`}>{text}</a>,
    },
    // {
    //     title: '笔记链接',
    //     dataIndex: 'notelink',
    //     width: '12%',
    //     render: (text, record) => (

    //         <a href={`${record.notelink}`}>{text}</a>
    //       ),

    // },
    {
      title: "预期优化次数",
      dataIndex: "noteexo",
      width: "8%",
    },
    {
      title: "实际优化次数",
      dataIndex: "noteaco",
      width: "8%",
    },
    {
      title: "上传日期",
      dataIndex: "date",
      width: "8%",
      ...getColumnSearchProps("date"),
    },
   
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getListFunction();

        const returnedData = (response as unknown) as Array<any>;
        console.log(returnedData);
        const newData: DataSource[] = [];
        for (const data of returnedData) {
          // const expectedlistDivided = data.expectedlist / 20;
          newData.push({
            id: data.id,
            author: data.author,
            notetitle: data.notetitle,
            notelink: data.notelink,
            keyword: data.keyword,
            brand: data.brand,
            noteexo: data.noteexo,
            date: data.date,
            noteaco: data.noteaco,
            imdate: data.imdate,
            fdate: data.fdate,
          });
        }

        setDataSource(newData);

        console.log(returnedData.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return <Table dataSource={dataSource} columns={columns} />;
};

export default MyTable;
