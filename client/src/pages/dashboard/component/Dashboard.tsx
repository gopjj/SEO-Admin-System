import { Card, Collapse, Divider } from "antd";
import React, { useState } from 'react';
import { cardString, detailDataString } from "../../../constants/constants";
import { Tabs } from "../../notetrack/component/Tabs"
import {Select} from "antd";
// import { LineChart } from "./LineChart";
import { DataCard } from "./Datacard";
import { getGdb  } from "../api/Index";

import { Daily } from "./Daily";
import { Record } from "./Record";
import styles from  "../style/Card.module.css"
import { DatePicker } from "antd";


import type { Dayjs } from 'dayjs';
type RangeValue = [Dayjs | null, Dayjs | null] | null;
const { RangePicker } = DatePicker;

// const getCollapseItems = () => {
//   const prefix = "dashboard-collapse";
//   const label = "点击展开周报图标";
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

const getTabs = () => {
  return new Map<string, React.ReactNode>([
    ["日报", <Daily getData={getGdb}/>],
    ["收录", <Record />],
  ]);
}

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
    <div>
      {/* <DataCard /> */}
      {/* <Divider orientation="left" plain></Divider> */}
      {/* <Collapse items={getCollapseItems()}></Collapse> */}
      <Divider orientation="left" plain style={{ color: "lightgrey" }}>
        {detailDataString}
      </Divider>
      
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {/* <Card style={{ width: '100%', padding: '2px' }}> */}
        {/* <span className={styles.fontsize}>{cardString}</span> */}
        <Select
          defaultValue="好人家"
          style={{ width: 120, marginLeft: '1200px', marginTop: '16px' }}
          allowClear
          options={[
             { value: '依泉', label: '依泉' },
             { value: '好人家', label: '好人家' },
             { value: 'replenix', label: 'replenix' },
          ]}
         />
        <RangePicker
            style={{ marginTop: '16px' ,marginLeft:'10px'}}
            value={dates || value}
            onCalendarChange={val => {
            setDates(val);
          }}
         onChange={val => {
         setValue(val);
        if (val) {
        setSelectedTime(
          `Selected time range: ${val[0]?.format('YYYY-MM-DD')} to ${val[1]?.format(
            'YYYY-MM-DD'
          )}`
        );
      } else {
        setSelectedTime('');
      }
    }}
    onOpenChange={onOpenChange}
    changeOnBlur
  />
{/* </Card> */}
       </div>
         <Divider orientation="left" plain></Divider>
         <DataCard />
         <Divider orientation="left" plain></Divider>
         <Tabs prefix='dashboard' tabs={getTabs()}/>
    
    
      {/* <div>{selectedTime}</div> 显示选中的时间 */}
     
    </div>
  );
};
