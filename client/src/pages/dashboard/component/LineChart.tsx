import { Line, LineConfig } from "@ant-design/charts";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../config";
import ApiList from "../../../config/apiList";

const LineChartConfig = {
  noteListed: {
    xField: "date",
    yField: "notelisted",
    yLocale: "笔记上榜次数",
    api: ApiList.getListed,
  },
  expectedList: {
    xField: "date",
    yField: "expectedlist",
    yLocale: "采集预期上榜次数",
    api: ApiList.getLnum,
  },
};

export interface LineChartProps {
  type: keyof typeof LineChartConfig;
  timeSpan: number;
}

const fetchData = async (
  api: string,
  startDate: string,
  endDate: string
) => {
  const response = await axios.get(API_BASE_URL + api, {
    params: {
      startDate: startDate,
      endDate: endDate,
    },
  });
  
  const newData = response.data.map((item: any) => {
    return {
      date: item.date,
      count: item.listedsum || 0, // 或者添加其他默认值
    };
  });

  return newData;
};

export const LineChart: React.FC<LineChartProps> = (props: LineChartProps) => {
  const { type, timeSpan } = props;
  const { xField, yField, yLocale, api } = LineChartConfig[type];
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    const currentDate = new Date();
    const endDate = currentDate.toISOString().slice(0, 10);
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - timeSpan + 1
    ).toISOString().slice(0, 10);

    fetchData(api, startDate, endDate).then((res) => {
      setData(res);
    });
  }, [api, timeSpan]);

  const config: LineConfig = {
    data,
    xField,
    yField,
    appendPadding: [10, 10, 5, 10],
    tooltip: {
      formatter: (datum) => {
        return { name: yLocale, value: datum[yField] };
      },
    },
    point: {
      size: 2,
      shape: "circle",
    },
  };

  return <Line {...config} />;
};