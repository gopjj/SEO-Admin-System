import React, { useEffect, useState, useRef } from "react";
import type { ColumnsType } from "antd/lib/table";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, InputRef, Table } from "antd";
import type { ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import style from "./daily.module.css";

type DataSource = {
  key: string | number;
  id: number;
  author: string;
  title: string;
  keyword: string;
  Pdate: string;
  brand: string;
  status: string;
  number: number;
  link: string;
  TopKpi: number;
  date: Date;
  expectlist: number;
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
      <div
        className={style.selectPadding}
        onKeyDown={(e) => e.stopPropagation()}
      >
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
          className={style.selectInput}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            className={style.selectButton}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            className={style.selectButton}
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
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataSource> = [
    // {
    //   title: "序号",
    //   dataIndex: "id",
    //   key: "id",
    //   width: "5%",
    //   align: "center",
    //   ...getColumnSearchProps("id")
    // },
    {
      title: "关键词",
      dataIndex: "keyword",
      key: "keyword",
      width: "5%",
      ...getColumnSearchProps("keyword"),
    },
    {
      title: "Top12         SOV KPI",
      dataIndex: "TopKpi",
      key: "TopKpi",
      width: "4%",
      align: "center",
    },
    {
      title: "品牌",
      dataIndex: "brand",
      key: "brand",
      width: "4%",
      align: "center",
      ...getColumnSearchProps("brand"),
    },
    {
      title: "达人昵称",
      dataIndex: "author",
      key: "author",
      width: "8%",
      ...getColumnSearchProps("author"),
    },
    {
      title: "笔记标题",
      dataIndex: "title",
      key: "title",
      width: "16%", //6
      render: (text, record) => <a href={`${record.link}`}>{text}</a>,
      ...getColumnSearchProps("title"),
    },
    {
      title: "笔记链接",
      dataIndex: "title",
      key: "title",
      width: "14%", //6
      render: (text, record) => <a href={`${record.link}`}>{text}</a>,
    },

    {
      title: "发布日期",
      dataIndex: "Pdate",
      key: "Pdate",
      width: "5%",
      align: "center",
      ...getColumnSearchProps("Pdate"),
    },
    {
      title: "预期上榜次数（当日）", //TODO:做筛选日期每天笔记的上榜次数
      dataIndex: "expectlist",
      key: "expectlist",
      width: "7%",
      align: "center",

      sorter: (a, b) => a.number - b.number,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "实际上榜次数（当日）", //TODO:做筛选日期每天笔记的上榜次数
      dataIndex: "number",
      key: "number",
      width: "7%",
      align: "center",

      sorter: (a, b) => a.number - b.number,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "上传日期",
      dataIndex: "date",
      key: "date",
      width: "6%",
      align: "center",
      ...getColumnSearchProps("date"),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getListFunction();

        const returnedData = response as unknown as Array<any>;
        console.log(returnedData);
        const newData: DataSource[] = [];
        for (const data of returnedData) {
          const expectedlistDivided = data.expectedlist / 20;
          newData.push({
            key: data.ID,
            id: data.ID,
            author: data.author,
            title: data.note_title,
            link: data.note_link,
            keyword: data.keyword,
            Pdate: data.publish_date,
            brand: data.brand,
            status: data.note_status,
            number: data.listed,
            expectlist: expectedlistDivided,
            TopKpi: data.Top12_KPI,
            date: data.date,
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
