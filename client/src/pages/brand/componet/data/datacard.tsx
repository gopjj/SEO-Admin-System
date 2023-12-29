import React, { useEffect, useState, useRef } from "react";
import type { ColumnsType } from "antd/lib/table";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, InputRef, Table, Progress } from "antd";
import type { ColumnType, TableProps } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import style from "../../../dashboard/style/daily.module.css"
import dayjs from "dayjs";

type DataSource = {
  keyId: number;
  keyword: string;
  tarnotes: any;
  kpi_ps: any;
  progress: number;
  compliance: string;
  date: any;
  averagesov: String;
};

type DataIndex = keyof DataSource;

interface MyTableProps {
  getListFunction: () => Promise<any>;
}

export const Datacard: React.FC<MyTableProps> = ({ getListFunction }) => {
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
      dataIndex: "keyId",
      key: "keyId",
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
      dataIndex: "averagesov",
      key: "averagesov",
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
        const notedValues: number[] = [];
        const KeywordData: string[] = [];

        for (const data of returnedData) {
          KeywordData.push(data.keyword);
          const expectedlistDivided = data.expectedlist / 20;
          const kpidata = Math.round((data.tarnotes / 12) * 100);

          const KeywordDataMap: Map<string, string[]> = new Map();

          let averageNoted = 0; // 在条件语句块之前声明并初始化 averageNoted 变量
          for (const keyword of KeywordData) {
            KeywordDataMap.set(keyword, []);
          }

          if (KeywordDataMap.has(data.keyword)) {
            const notedValues = []; // 确保在每次循环开始时清空数组
            for (const report of data.reports) {
              const notedPercentage = (report.noted / 60) * 100;
              notedValues.push(notedPercentage);
            }
            averageNoted =
              notedValues.reduce((sum, value) => sum + value, 0) /
              notedValues.length; // 给 averageNoted 赋值
          }
          const formattedDate = dayjs(data.date).format("YYYY-MM-DD");
          const rate = Number(averageNoted.toFixed(0));
          newData.push({
            keyId: data.keyId,
            keyword: data.keyword,
            tarnotes: data.tarnotes,
            kpi_ps: kpidata + "%",
            compliance: ((averageNoted / kpidata) * 100).toFixed(2) + "%",
            date: formattedDate,
            progress: rate,
            averagesov: averageNoted.toFixed(0) + "%",
          });
        }
        setDataSource(newData);
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

export default Datacard;
