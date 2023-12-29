import { Line, LineConfig } from "@ant-design/charts";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../config";
import ApiList from "../../../config/apiList";

const LineChartConfig = {
    noteListed: {
        xField: 'date',
        yField: 'notelisted',
        yLocale: '笔记上榜次数',
        api: ApiList.getListed,
    },
    expectedList: {
        xField: 'date',
        yField: 'expectedlist',
        yLocale: '采集预期上榜次数',
        api: ApiList.getLnum
    },
}

export interface LineChartProps {
  type: keyof typeof LineChartConfig;
  timeSpan: number;
}

const fetchData = async (api: string, timeSpan: number, xField: string, yField: string) => {
  const currentDate = new Date();
  const newData = [];

  // Follow up: 
  // change this request to a one-time request instead of a circular request
  // Pass in start date and end date, and the back end returns an array
  for (let i = timeSpan; i > 0; i--) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1 - i
    );

    const formattedDate = date.toISOString().slice(0, 10);

    // Follow up:
    // Refactor to centralize the api request in api.tsx
    const response = await axios.get(API_BASE_URL + api, {
      params: {
        date: formattedDate,
      },
    });

    const jsondata = response.data[0];
    if (jsondata && jsondata.listedsum) {
    // Follow up: 
    // The data returned by the back end is formatted into the format required by the front end
    // and is not converted on the front end
    // e.g., {date: '2021-07-01', listedsum: 10}
      newData.push({
        [xField]: formattedDate,
        [yField]: parseInt(jsondata.listedsum),
      });
    } else {
      newData.push({
        [xField]: formattedDate,
        [yField]: i * i, // 或者添加其他默认值
      });
    }
  }
  console.log(newData);

  return newData;
};

export const LineChart: React.FC<LineChartProps> = (props: LineChartProps) => {
  const { type, timeSpan } = props;
  const { xField, yField, yLocale, api } = LineChartConfig[type];
  const [data, setData] = useState<Array<{}>>(
    []
  );

  useEffect(() => {
    fetchData(api, timeSpan, xField, yField).then((res) => {
      setData(res);
    });
  }, []);

  const config: LineConfig = {
    data,
    xField,
    yField,
    tooltip: {
        formatter: (datum) => {
            return { name: yLocale, value: datum[yField] };
        }
    },
    point: {
        size: 2,
        shape: 'circle',
      },
  };

  return <Line {...config} />;
};
