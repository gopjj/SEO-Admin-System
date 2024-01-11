import React, { useEffect, useState, useRef } from "react";
import type { ColumnsType } from "antd/lib/table";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, InputRef, Table } from "antd";
import type { ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import style from "../style/Daily.module.css";


type DataSource = {

  author: string;
  title: string;
  keyword: string;
  Pdate: string;
  brand: string;
  noteType: string;
  number: number;
  link: string;
  count: number;
  // TopKpi: number;
  interNum: any;
  date: Date;
  expectlist: number;
};

type DataIndex = keyof DataSource;

interface MyTableProps {
  getData: () => Promise<any>;
}

export const Daily: React.FC<MyTableProps> = ({ getData }) => {
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
      title: "日期",
      dataIndex: "date",
      key: "date",
      width: "8%",
      align: "center",
      ...getColumnSearchProps("date"),
    },

    {
      title: "关键词",
      dataIndex: "keyword",
      key: "keyword",
      width: "8%",
      align: "center",
      ...getColumnSearchProps("keyword"),
    },


    {
      title: "笔记",
      dataIndex: "title",
      key: "title",
      width: "18%", //6
      render: (text, record) => <a href={`${record.link}`}>{text}</a>,
      ...getColumnSearchProps("title"),
    },
    {
      title: "笔记链接",
      dataIndex: "title",
      key: "title",
      width: "18%", //6
      render: (text, record) => <a href={`${record.link}`}>{text}</a>,
    },
    {
      title: "发布日期",
      dataIndex: "Pdate",
      key: "Pdate",
      width: "8%",
      align: "center",
      ...getColumnSearchProps("Pdate"),
    },
   
    {
      title: "达人昵称",
      dataIndex: "author",
      key: "author",
      width: "8%",
      ...getColumnSearchProps("author"),
    },
    {
      title: "预期上榜", //TODO:做筛选日期每天笔记的上榜次数
      dataIndex: "expectlist",
      key: "expectlist",
      width: "8%",
      align: "center",

      sorter: (a, b) => a.number - b.number,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "上榜笔记", //TODO:做筛选日期每天笔记的上榜次数
      dataIndex: "count",
      key: "count",
      width: "8%",
      align: "center",

      sorter: (a, b) => a.number - b.number,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "互动数",
      width: "6%",
      dataIndex: "interNum",
      key: "interNum",
      align: "center",
    },
    {
      title: "KOL/KOC",
      dataIndex: "noteType",
      key: "noteType",
      width: "4%",
      align: "center",
    },

  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const KeywordDataMap: Map<string, string[]> = new Map();
        const response = await getData();
        const returnedData = response as unknown as Array<any>;
        const newData: DataSource[] = [];
        const KeywordData: string[] = [];
        console.log(returnedData);
        let counter = 0; // 自增计数器


        const titleLinkCombinations: string[] = []; // 保存已经出现过的标题加链接的组合
      // 初始化用于存储标题链接组合计数的 Map
// 初始化用于存储标题链接组合计数的 Map
let countMap: Map<string, number> = new Map();

returnedData.forEach((data, index) => {
  data.keySum.forEach((keywordList: any) => {
    const keyword =keywordList.keyword;
    const listed =keywordList.listed;
    const titleLinkCombinations: string[] = []; // 每个关键词范围内的标题加链接组合

    keywordList["note-detail"].forEach((noteDetail: any) => {
      const expectedlistDivided = 2;
      const titleLinkCombination = `${noteDetail["note-title"]}_${noteDetail["note-link"]}`; // 标题加链接的组合

      let count = countMap.get(titleLinkCombination); // 获取当前标题加链接的计数值
      if (!count) {
        count = 0; // 如果不存在，则初始计数值为0
      }

      // 判断当前标题加链接的组合是否已经存在于当前关键词范围内的标题加链接组合数组中
      if (!titleLinkCombinations.includes(titleLinkCombination)) {
        const id = parseInt(`${index}${newData.length}`); // 自动生成的ID格式为 "索引值_数组长度"

        count++; // 将计数值加1

        newData.push({
          keyword: keyword,
          author: noteDetail.author,
          title: noteDetail["note-title"],
          link: noteDetail["note-link"],
          Pdate: noteDetail.date,
          brand: noteDetail.brander,
          interNum: noteDetail["in-count"],
          noteType: noteDetail["kol-c"],
          number: listed,
          expectlist: expectedlistDivided,
          count: count, // 加入计数值
          date: data.date,
        });

        titleLinkCombinations.push(titleLinkCombination);

        countMap.set(titleLinkCombination, count); // 更新计数器
      } else {
        count++; // 已存在，则累加计数值
        countMap.set(titleLinkCombination, count); // 更新计数器

        // 更新重复笔记的计数值
        const existingNote = newData.find(
          (note) =>
            note.title === noteDetail["note-title"] &&
            note.link === noteDetail["note-link"]
        );
        if (existingNote) {
          existingNote.count = count;
        }
      }
    });
  });
});

          
        // for (const data of returnedData) {
        //   const expectedlistDivided = data.expectedlist / 20;
        //   newData.push({
        //     id: data.keyId,
        //     keyword: data.keyword,
        //     author: data.author,
        //     title: data.note_title,
        //     link: data.note_link,            
        //     Pdate: data.publish_date,
        //     brand: data.brand,
        //     status: data.note_status,
        //     number: data.listed,
        //     expectlist: expectedlistDivided,
        //     TopKpi: data.Top12_KPI,
        //     date: data.date,
        //   });
        // }

        setDataSource(newData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return <Table dataSource={dataSource} columns={columns} />;
};

