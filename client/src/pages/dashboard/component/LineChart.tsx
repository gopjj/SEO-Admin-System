// import { Line, LineConfig } from "@ant-design/charts";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { API_BASE_URL } from "../../../config";
// import ApiList from "../../../config/apiList";

// const LineChartConfig = {
//   noteListed: {
//     xField: "date",
//     yField: "notelisted",
//     yLocale: "笔记上榜次数",
//     api: ApiList.getListed,
//   },
//   expectedList: {
//     xField: "date",
//     yField: "expectedlist",
//     yLocale: "采集预期上榜次数",
//     api: ApiList.getLnum,
//   },
// };

// export interface LineChartProps {
//   type: keyof typeof LineChartConfig;
//   timeSpan: number;
// }

// const fetchData = async (
//   api: string,
//   startDate: string,
//   endDate: string,
//   timeSpan: number,
//   xField: string,
//   yField: string
// ) => {
//   const currentDate = new Date();
//   const newData = [];
//   for (let i = timeSpan; i > 0; i--) {
//     const date = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate() + 1 - i
//     );
//     const formattedDate = date.toISOString().slice(0, 10);
//     const response = await axios.get(API_BASE_URL + api, {
//       params: {
//         startDate: startDate,
//       endDate: endDate,
//       },
//     });
//     const jsondata = response.data[0];
//     if (jsondata && jsondata.listedsum) {
//       newData.push({
//         [xField]: formattedDate,
//         [yField]: parseInt(jsondata.listedsum),
//       });
//     } else {
//       newData.push({
//         [xField]: formattedDate,
//         [yField]: i * i, // 或者添加其他默认值
//       });
//     }
//   }
//   return newData;
// };

// export const LineChart: React.FC<LineChartProps> = (props: LineChartProps) => {
//   const { type, timeSpan } = props;
//   const { xField, yField, yLocale, api } = LineChartConfig[type];
//   const [data, setData] = useState<Array<{}>>([]);

//   useEffect(() => {
//     fetchData(api, timeSpan, xField, yField).then((res) => {
//       setData(res);
//     });
//   }, []);
  
//   const config: LineConfig = {
//     data,
//     xField,
//     yField,
//     tooltip: {
//       formatter: (datum) => {
//         return { name: yLocale, value: datum[yField] };
//       },
//     },
//     point: {
//       size: 2,
//       shape: "circle",
//     },
//   };

//   return <Line {...config} />;
// };
export {}
