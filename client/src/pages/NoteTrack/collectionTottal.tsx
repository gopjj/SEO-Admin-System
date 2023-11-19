import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Column } from "@ant-design/plots";

const DemoColumn = () => {
  const data = [
    {
      type: "周一",
      sales: 10,
    },
    {
      type: "周二",
      sales: 3,
    },
    {
      type: "周三",
      sales: 12,
    },
    {
      type: "周四",
      sales: 20,
    },
    {
      type: "周五",
      sales: 1,
    },
    {
      type: "周六",
      sales: 8,
    },
    {
      type: "周日",
      sales: 30,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "类别",
      },
      sales: {
        alias: "采集笔记数",
      },
    },
    minColumnWidth: 40,
    maxColumnWidth: 40,
    width: 80, // 设置图表的宽度
    height: 320,
  };
  return <Column {...config} />;
};

export default DemoColumn;
