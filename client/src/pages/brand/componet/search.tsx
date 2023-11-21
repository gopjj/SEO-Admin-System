import { Column } from "@ant-design/plots";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../config";
import ApiList from "../../../config/apiList";

const DemoColumn = () => {
  const currentDate = new Date();
  const [data, setData] = useState<
    Array<{ year: any; keyword: any; listedsum: number }>
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const newData = [];
      let prevDate: any = null;
      let prevKeyword: any = null;
      for (let i = 0; i < 5; i++) {
        const date = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - i
        );
        const formattedDate = date.toISOString().slice(0, 10);

        try {
          const response = await axios.get(API_BASE_URL + ApiList.getKeywordL, {
            params: {
              brand: "hbn水乳",
              date: formattedDate,
            },
          });
          const jsondata = response.data;

          jsondata.forEach((item: any) => {
            const { _id, totalListed } = item;
            if (prevDate !== formattedDate || prevKeyword !== _id) {
              newData.push({
                year: formattedDate,
                keyword: _id,
                listedsum: parseInt(totalListed),
              });
              prevDate = formattedDate;
              prevKeyword = _id;
            }
          });
        } catch (error) {
          console.error(error);
          newData.push({
            year: formattedDate,
            keyword: "无",
            listedsum: 0,
          });
        }
      }
      setData(newData);
      console.log(JSON.stringify(newData));
    };

    fetchData();
  }, []);
  console.log("shu" + data);

  const config = {
    data,
    isStack: true,
    xField: "year",
    yField: "listedsum",
    seriesField: "keyword",
    label: {
      layout: [
        { type: "interval-adjust-position" },
        { type: "interval-hide-overlap" },
        { type: "adjust-color" },
      ],
    },
  };

  return <Column style={{ width: 1000, height: 300 }} {...config} />;
};

export default DemoColumn;
