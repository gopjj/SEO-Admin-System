import type { TabsProps } from "antd";
import { Collapse, Divider, Tabs } from "antd";
import React from "react";
import { getList } from "./api";
import DataCard from "./componet/datacard";
import Mychart from "./componet/dashboardChart1";
import Mychart2 from "./componet/databoardChart2";
import Daily from "./componet/daily";
import Record from "./componet/record";
import styles from "./componet/styles/dashboard.module.css"
import { detailDataString } from "../../constants/constants";

const onChange = async (key: string) => {};

const tabItems: TabsProps["items"] = [
  {
    key: "1",
    label: "日报",

    children: (
      <div>
        {" "}
        <Daily getListFunction={getList} />
      </div>
    ),
  },
  {
    key: "2",
    label: "收录",
    children: (
      <div>
        <Record />
      </div>
    ),
  },
];

const Option2: React.FC = () => {
  return (
    <div>
      <DataCard />
      <Divider orientation="left" plain></Divider>
      <Collapse
        items={[
          {
            key: "1",
            label: "点击展开周报图表",
            children: (
              <p>
                <div className={styles.expand1}>
                  <div className={styles.chart}>
                    <Mychart />
                  </div>
                  <div className={styles.chart}>
                    <Mychart2 />
                  </div>
                </div>
              </p>
            ),
          },
        ]}
      ></Collapse>
<<<<<<< HEAD
     <Divider orientation="left" plain style={{ color: 'lightgrey' }}>详细数据</Divider>
=======
      <Divider orientation="left" plain style={{ color: "lightgrey" }}>
        {detailDataString}
      </Divider>
>>>>>>> 065a0ae6b5c888c780618cc02bf2866affa34d23
      <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange}></Tabs>
    </div>
  );
};
export default Option2;
