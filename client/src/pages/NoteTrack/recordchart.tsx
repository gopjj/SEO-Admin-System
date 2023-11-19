import { Bar } from "@ant-design/plots";

const DemoBar = () => {
  const data = [
    {
      type: "OALY",
      sales: 6,
    },
    {
      type: "hbn水乳",
      sales: 3,
    },
    {
      type: "PMPM",
      sales: 10,
    },
  ];
  const config = {
    data,
    xField: "sales",
    yField: "type",
    meta: {
      type: {
        alias: "类别",
      },
      sales: {
        alias: "收入笔记数",
      },
    },
    minColumnWidth: 20,
    maxColumnWidth: 20,
    width: 80, // 设置图表的宽度
    height: 320,
  };
  return <Bar {...config} />;
};
export default DemoBar;
