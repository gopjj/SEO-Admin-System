import { Card, Collapse, Divider } from "antd";
import React, { useState } from "react";
import { Tabs } from "../../notetrack/component/Tabs";
import { LineChart } from "../../dashboard/component/LineChart";
import { DataCard } from "../../dashboard/component/Datacard";
import { getDailyList } from "../../dashboard/api/Index";
import { Daily } from "../../dashboard/component/Daily";
import { Record } from "../../dashboard/component/Record";
import styles from "../style/Card.module.css";
import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import { Selectkeyword } from "../../dashboard/component/Select";
import {TTLDataCard} from "../../dataV/component/ttlcard";

type RangeValue = [Dayjs | null, Dayjs | null] | null;
const { RangePicker } = DatePicker;
// const getCollapseItems = () => {
//   const prefix = "dashboard-collapse";
//   const label = "展开图表";
//   return [
//     {
//       key: prefix + "-" + label,
//       label: label,
//       children: (
//         <div>
//           <LineChart type="noteListed" timeSpan={7} />
//           <LineChart type="expectedList" timeSpan={30} />
//         </div>
//       ),
//     },
//   ];
// };

const getTabs = (startdate: any, enddate: any,key :any) => {
  return new Map<string, React.ReactNode>([
    [
      "日报笔记",
      <Daily getList={getDailyList}/>,
    ],
    ["收录", <Record />],
  ]);
};


export const TTL: React.FC = () => {
  const [dates, setDates] = useState<RangeValue>(null);
  const [value, setValue] = useState<RangeValue>(null);
  const [selectedTime, setSelectedTime] = useState<string>(""); // 新增 state 用于存储选中的时间
  const [startdate, setstartdate] = useState<any>("");
  const [enddate, setenddate] = useState<any>("");
  const [brand,setbrand] = useState<any>("");
  const [key,setkey] =  useState<any>("");
  const hanleselect = (brand:string,key:string) => {
    setbrand(brand);
    setkey(key);
  };
  console.log("当前品牌值:"+brand);
  console.log("当前关键词:"+key);
  const onOpenChange = (open: boolean) => {
    if (open) {
      console.log();
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div>
          <Card className={styles.customCard}>
            <div>
              <p style={{ fontSize: "18px" }}>筛选数据</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <RangePicker
                style={{
                  marginTop: "10px",
                  marginLeft: "0px",
                  marginRight: "20px",
                }}
                value={dates || value}
                onCalendarChange={(val) => {
                  setDates(val);
                }}
                onChange={(val) => {
                  setValue(val);
                  if (val) {
                    setSelectedTime(
                      `Selected time range: ${val[0]?.format(
                        "YYYY-MM-DD"
                      )} to ${val[1]?.format("YYYY-MM-DD")}`
                    );
                    setstartdate(val[0]?.format("YYYY-MM-DD"));
                    setenddate(val[1]?.format("YYYY-MM-DD"));
                  } else {
                    setSelectedTime("");
                  }
                  console.log("开始时间" + startdate);
                  console.log("dd" + dates);
                }}
                onOpenChange={onOpenChange}
                changeOnBlur
              />
              <Selectkeyword onSelect={hanleselect} />
              <p></p>
            </div>
          </Card>
          <Card className={styles.customCard}>
            <div>
                <p style={{ fontSize: "18px" }}>TTL-Data 分析</p> 
            </div>
            <div> <TTLDataCard /></div>
            {/* <div>
              <p style={{ fontSize: "18px" }}>TTL Data 分析</p>
            </div>
            <DataCard />
            <div style={{ marginTop: "28px" }}>
              <Collapse items={getCollapseItems()} bordered={false}></Collapse>
            </div> */}
          </Card>
          <Card className={styles.customCard}>
            <div>
              <p style={{ fontSize: "20px" }}>详细数据</p>
            </div>
            <Tabs prefix="dashboard" tabs={getTabs(startdate, enddate,key)} />
          </Card>
        </div>
    
      </div>
    </>
  );
};
