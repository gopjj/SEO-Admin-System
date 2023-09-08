import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { getList } from "../api/index";
type DataSource = {
 titlename: string
};
interface Item {
  name: string;
  value: number;
}

const Round = () => {
  const [dataSource, setDataSource] = useState<DataSource[]>([]);
  const [differentNamesCount, setDifferentNamesCount] = useState<number>(0);
const [namesAndCounts, setNamesAndCounts] = useState<[string, number][]>([]);
const [listData, setListData] = useState<{ name: string; value: number }[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getList();
        const returnedData = response as unknown as Array<any>;
        const newData: DataSource[] = [];
        for (const data of returnedData) {
          newData.push({
              titlename:data.brand,
          });
        }
        setDataSource(newData);
       
//         const namesSet = new Set(dataSource.map((d) => d.titlename));
// setDifferentNamesCount(namesSet.size);
// const brandLength = Array.from(namesSet).length;
// console.log(namesSet);

const nameCountMap: { [key: string]: number } =newData.reduce((countMap: { [key: string]: number }, data) => {
  const name = data.titlename
  if (countMap[name]) {
    countMap[name] += 1;
  } else {
    countMap[name] = 1;
  }
  return countMap;
}, {});

//console.log(nameCountMap);
const namesAndCounts = Object.entries(nameCountMap);
setListData(namesAndCounts.map(([name, count]) => ({ name, value: count })));
const data: Item[] = [];

namesAndCounts.forEach((item: any[], i: number) => {
  const [name, value] = item;
data.push({ value, name });
});
console.log(data[1])
setListData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  let option = {
    title: {
      text: "笔记品牌汇总",
      subtext: "本月数据",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "15%",
      left: "center",
    },
    color: ["#fc8251", "#5470c6", "#91cd77", "#ef6567", "#f9c956", "#75bedc"],
    series: [
      {
        top: "10%",
        name: "GA 数据统计",
        type: "pie",
        radius: ["40%", "60%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "40",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        
        data: listData,
      },
      
    ],
  };
// 
  return (
    <div>
      <ReactECharts option={option} />
    </div>
  );
};

export default Round;
