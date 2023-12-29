import React, { useEffect, useState, useRef } from "react";
import type { ColumnsType } from "antd/lib/table";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, InputRef, Table, Progress } from "antd";
import type { ColumnType, TableProps } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import style from "../../../dashboard/style/daily.module.css";

type DataSource = {
  keyld: number;
  keyword: string;
  tarnotes?: any;
  noted?: number;
  kpi_ps?: any;
  sov?: any;
  progress?: number;
  compliance?: string;
  date?: number;
};

type DataIndex = keyof DataSource;

interface MyTableProps {
  getListFunction: () => Promise<any>;
}

export const MyTable: React.FC<MyTableProps> = ({ getListFunction }) => {
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
    {
      title: "序号",
      dataIndex: "keyld",
      key: "keyld",
      align: "center",
      width: "2%",
    },
    {
      title: "关键词",
      dataIndex: "keyword",
      key: "keyword",
      width: "4%",
      align: "center",
      ...getColumnSearchProps("keyword"),
    },
    {
      title: "TOP12 KPI",
      dataIndex: "tarnotes",
      key: "tarnotes",
      width: "2%",
      align: "center",
    },

    {
      title: "Top12 SOV KPI",
      dataIndex: "kpi_ps",
      key: "kpi_ps",
      width: "1%",
      align: "center",
    },
    {
      title: "累计SOV",
      dataIndex: "sov",
      key: "sov",
      width: "1%", //6
      align: "center",
    },
    {
      title: "累计SOV完成进度",
      width: "2%", //6
      align: "center",
      render: (text, datacard) => (
        <Progress
          percent={datacard.progress}
          status="active"
          strokeColor={{ "0%": "#108ee9", "70": "#87d068" }}
          className="progress-custom"
        />
      ),
    },
    {
      title: "累计compliance",
      dataIndex: "compliance",
      key: "compliance",
      width: "2%", //6
      align: "center",
    },

    {
      title: "上传日期",
      dataIndex: "date",
      key: "date",
      width: "4%",
      align: "center",
      ...getColumnSearchProps("date"),
    },
  ];
  const onChange: TableProps<DataSource>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getListFunction();

        const returnedData = response as unknown as Array<any>;
        console.log(returnedData);
        const newData: DataSource[] = [];
        for (const data of returnedData) {
          const expectedlistDivided = data.expectedlist / 20;
          const kpidata = Math.round((data.kpi / 12) * 100);
          const rate = Number(Math.round(data.sov * 100).toFixed(2));
          newData.push({
            keyld: data.key_id,
            keyword: data.keyword,
            tarnotes: data.tarnotes,
            kpi_ps: kpidata + "%",
            sov: Math.round(data.sov * 100) + "%",
            compliance: Math.round(data.compliance * 100) + "%",
            date: data.date,
            progress: rate,
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

  return (
    <Table dataSource={dataSource} columns={columns} onChange={onChange} />
  );
};

export default MyTable;
