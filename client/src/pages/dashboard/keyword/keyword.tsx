import React from 'react';
import "./progress.css"
import { Table,Progress} from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: React.Key;
  brandName: string;
  keyWord: string;
  startTime: string;
  endTime: string;
  costTime: string;
  progress: number;
  noteNum: number;
  realNum: number;
  kpiData: string;
}


const columns: ColumnsType<DataType> = [
  {
    title: '品牌名称',
    width: 100,
    dataIndex: 'brandName',
    key: 'brandName',
    fixed: 'left',
    align: 'center',
  },
  {
    title: "关键词",
    width: 120,
    dataIndex: 'keyWord',
    key: 'keyWord',
    fixed: 'left',
    align: 'center',
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    key: '1',
    width: 130,
    align: 'center',
    render: (startTime) => {
        const formattedTime = new Intl.DateTimeFormat("zh-CN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(startTime));
        return formattedTime;
      },
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    key: '2',
    width: 130,
    align: 'center',
    render: (endTime) => {
        const formattedTime = new Intl.DateTimeFormat("zh-CN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(endTime));
        return formattedTime;
      },
  },
  {
    title: '项目时长',
    dataIndex: 'costTime',
    key: '3',
    width: 90,
    align: 'center',
  },
  {
    title: '需求篇数',
    dataIndex: 'noteNum',
    key: '9',
    width: 100,
    align: 'center',
  },
  
  {
    title: '实时优化',
    dataIndex: 'realNum',
    key: '10',
    width: 100,
    align: 'center',
  },
  {
    title: 'KPI达成率',
    dataIndex: 'kpiData',
    key: '8',
    width: 100,
    align: 'center',
  },

  {
    title: '当前进度',
    dataIndex: 'progress',
    key: '11',
    align: 'center',
    width: 300,
    render: (text, record) => (
    
      <Progress percent={record.progress} status="active" strokeColor={{ "0%":"#108ee9", "70": "#87d068" }} className="progress-custom" />
    
      ),
  },
//   {
//     title: 'Action',
//     key: 'operation',
//     fixed: 'right',
//     width: 100,
//     render: () => (
//       <>
//         <a>Add Action</a> {/* 添加自定义链接或按钮 */}
//         {/* 其他 action */}
//       </>
//     ),
//   },
];

// const data: DataType[] = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i,
//     name: `Edward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }

const data: DataType[] = [
    {
      key : 'brandName',
      brandName: 'OLAY',
      keyWord: "美白精华",
      startTime: '2023-09-20',
      endTime: '2023-09-28',
      costTime: '',
      kpiData: '',
      noteNum: 200,
      realNum: 190,
      progress: -1,
    },
    {
      key: 'keyWord',
      brandName: '丰添',
      keyWord: "丰添洗发水",
      startTime: '2023-08-11',
      endTime: '2023-08-20',
      costTime: '',
      kpiData: '',
      noteNum: 300,
      realNum: 200,
      progress: -1,
    },
    {
      key: 'keyWord',
      brandName: 'PMPM',
      keyWord: "水乳推荐",
      startTime: '2023-09-01',
      endTime: '2023-09-09',
      costTime: '',
      noteNum: 108,
      kpiData: '',
      progress: -1,
      realNum: 4,
    },
  ];
  data.forEach((item) => {
    const start = new Date(item.startTime);
    const end = new Date(item.endTime);
    const diffMilliseconds = end.getTime() - start.getTime();
    const diffDays = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000));
    item.costTime = `${diffDays} 天`;
  });

  data.forEach((item) => {
    const real = item.realNum;
    const note  = item.noteNum;
    //const diffMilliseconds = r
    const diffDays = (real / note) * 100; 
    //item.costTime = `${diffDays} 天`;
    const roundedDiffDays1 = diffDays.toFixed(2); 
    const roundedDiffDays =  Number(diffDays.toFixed(2));; 
    item.kpiData = `${roundedDiffDays1}%`;
    item.progress = roundedDiffDays;
  });

const App: React.FC = () => (
  <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
);

export default App;