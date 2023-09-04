import React from "react";
import ReactECharts from "echarts-for-react";
const round = () => {
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
        data: [
          { value: 1017, name: "PMPM" },
          { value: 583, name: "丰添" },
          { value: 678, name: "OLAY" },
        ],
      },
    ],
  };
  return (
    <div>
      <ReactECharts option={option} />
    </div>
  );
};

export default round;
