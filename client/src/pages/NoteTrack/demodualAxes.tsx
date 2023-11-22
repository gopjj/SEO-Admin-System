import { DualAxes } from "@ant-design/plots";
import { useEffect, useState } from "react";

import { Card, Typography } from "antd";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import ApiList from "../../config/apiList";
import "../dashboard/componet/styles/module.css";

const DemoDualAxes = () => {
  // const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // 一周的日期
  const [data, setData] = useState<
    Array<{ year: any; 实际优化: number; 预期优化: number }>
  >([]);
  const currentDate = new Date(); // 当前日期
  // const dates = []; // 存储最近一周的日期
  useEffect(() => {
    const fetchData = async () => {
      const newData = [];
      // let expectedListSum = 0;
      for (let i = 0; i < 8; i++) {
        const date = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - 2 - i
        );
        const formattedDate = date.toISOString().slice(0, 10);
        console.log(formattedDate);
        try {
          const response = await axios.get(API_BASE_URL + ApiList.getnoteaco, {
            params: {
              date: formattedDate,
            },
          });
          const jsondata = response.data[0];
          console.log(jsondata);
          if (
            jsondata &&
            jsondata.totalNoteaco &&
            jsondata.countNoteaco &&
            jsondata.exNoteexo
          ) {
            const totalNoteaco = Math.round(
              parseInt(jsondata.totalNoteaco) / parseInt(jsondata.countNoteaco)
            );
            const exnoteexo = Math.round(
              parseInt(jsondata.exNoteexo) / parseInt(jsondata.countNoteaco)
            );

            console.log(totalNoteaco);

            newData.push({
              year: formattedDate,
              实际优化: totalNoteaco, // 将 expectedlist 替换为 expectedList
              预期优化: exnoteexo,
            });
          } else {
            newData.push({
              year: formattedDate,
              实际优化: 0,
              预期优化: 0, // 或者添加其他默认值
            });
          }
        } catch (error) {
          console.error(error);
          newData.push({
            year: formattedDate,
            实际优化: 0,
            预期优化: 0, // 或者添加其他默认值
          });
        }
      }
      setData(newData);
      newData.sort((a, b) => a.year.localeCompare(b.year));
    };

    fetchData();
  }, []);

  const config = {
    data: [data, data],
    xField: "year",
    yField: ["实际优化", "预期优化"],
    geometryOptions: [
      {
        geometry: "line",
        color: "#5B8FF9",
      },
      {
        geometry: "line",
        color: "#5AD8A6",
      },
    ],

    width: 100, // 设置图表宽度
    height: 200, // 设置图表高度
  };

  return (
    <Card className="custom-card">
      <Typography.Title level={5} className="text-center">
        最近一周的优化数据
      </Typography.Title>
      <DualAxes {...config} />
    </Card>
  );
};

export default DemoDualAxes;
