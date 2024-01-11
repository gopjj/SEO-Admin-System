import { Card, Collapse, Divider } from "antd";
import React, { useState } from "react";
import { cardString, detailDataString } from "../../../constants/constants";
import { Tabs } from "../../notetrack/component/Tabs";
import { Select } from "antd";
import { LineChart } from "./LineChart";
import { DataCard } from "./Datacard";
import { getBrandhrj } from "../api/Index";
import { Daily } from "./Daily";
import { Record } from "./Record";
import styles from "../style/Card.module.css";
import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import { Selectkeyword } from "./Select";

type RangeValue = [Dayjs | null, Dayjs | null] | null;
const { RangePicker } = DatePicker;

const getCollapseItems = () => {
  const prefix = "dashboard-collapse";
  const label = "展开图表";
  return [
    {
      key: prefix + "-" + label,
      label: label,
      children: (
        <div>
          <LineChart type="noteListed" timeSpan={7} />
          <LineChart type="expectedList" timeSpan={30} />
        </div>
      ),
    },
  ];
};

const getTabs = () => {
  return new Map<string, React.ReactNode>([
    ["笔记", <Daily getData={getBrandhrj} />],
    ["收录", <Record />],
  ]);
};

export const Dashboard: React.FC = () => {
  const [dates, setDates] = useState<RangeValue>(null);
  const [value, setValue] = useState<RangeValue>(null);
  const [selectedTime, setSelectedTime] = useState<string>(""); // 新增 state 用于存储选中的时间
  const onOpenChange = (open: boolean) => {
    if (open) {
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
                  } else {
                    setSelectedTime("");
                  }
                }}
                onOpenChange={onOpenChange}
                changeOnBlur
              />

              <Selectkeyword></Selectkeyword>
            </div>
          </Card>
          <Card className={styles.customCard}>
            <div>
              <p style={{ fontSize: "18px" }}>图表数据</p>
            </div>
            <DataCard />
            <div style={{ marginTop: "28px" }}>
              <Collapse items={getCollapseItems()} bordered={false}></Collapse>
            </div>
          </Card>

          <Card className={styles.customCard}>
            <div>
              <p style={{ fontSize: "20px" }}>详细数据</p>
            </div>
            <Tabs prefix="dashboard" tabs={getTabs()} />
          </Card>
        </div>
      </div>
    </>
  );
};
