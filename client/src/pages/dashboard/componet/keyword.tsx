import  { useEffect, useState } from "react";
import "./styles/progress.css";
import { Table, Progress } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getKeyword } from "../api";


type DataSource = {
  key: string | number;
  brandName: string;
  keyWord: string;
  startTime: string;
  endTime: string;
  costTime: string;
  progress: number;
  noteNum: number;
  realNum: number;
  kpiData: string;
};

const columns: ColumnsType<DataSource> = [
  {
    title: "品牌名称",
    width: 100,
    dataIndex: "brandName",
    key: "brandName",
    fixed: "left",
    align: "center",
  },
  {
    title: "关键词",
    width: 120,
    dataIndex: "keyWord",
    key: "keyWord",
    fixed: "left",
    align: "center",
  },
  {
    title: "开始时间",
    dataIndex: "startTime",
    key: "1",
    width: 130,
    align: "center",

  },
  {
    title: "结束时间",
    dataIndex: "endTime",
    key: "2",
    width: 130,
    align: "center",

  },
  {
    title: "项目时长",
    dataIndex: "costTime",
    key: "3",
    width: 90,
    align: "center",
  },
  {
    title: "需求篇数",
    dataIndex: "noteNum",
    key: "9",
    width: 100,
    align: "center",
  },

  {
    title: "实时优化",
    dataIndex: "realNum",
    key: "10",
    width: 100,
    align: "center",
  },
  {
    title: "KPI达成率",
    dataIndex: "kpiData",
    key: "8",
    width: 100,
    align: "center",
  },

  {
    title: "当前进度",
    dataIndex: "progress",
    key: "11",
    align: "center",
    width: 300,
    render: (text, record) => (
      <Progress
        percent={record.progress}
        status="active"
        strokeColor={{ "0%": "#108ee9", "70": "#87d068" }}
        className="progress-custom"
      />
    ),
  },

];



const MyKeyword = () => {
  const [dataSource, setDataSource] = useState<DataSource[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getKeyword();
        const returnedData = (response as unknown) as Array<any>;
        console.log(returnedData);
        const newData: DataSource[] = [];
        for (const data of returnedData) {
          const start = new Date(data.startTime);
          const end = new Date(data.endTime);
          const diffMilliseconds = end.getTime() - start.getTime();
          const costTime = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000));

          const real = data.realNote;
          const note = data.targetNote;
          const kpirate = (real / note) * 100;
          const kpiData = Number(kpirate.toFixed(2));
          newData.push({
            key: data.ID,
            brandName: data.brand,
            keyWord: data.keyword,
            startTime: data.startTime,
            endTime: data.endTime,
            costTime: `${costTime} 天`,
            noteNum: data.targetNote,
            realNum: data.realNote,
            kpiData: `${kpiData}%`,
            progress: kpiData,
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
    <Table
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: 1500, y: 300 }}
    />
  );
};

export default MyKeyword;
