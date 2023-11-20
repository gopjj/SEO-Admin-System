import type { TabsProps } from "antd";
import { Collapse, Divider, Tabs } from "antd";
import React from "react";

import { getList } from "./api";
import DataCard from "./card/datacard";
import Mychart from "./chart/mychart";
import Mychart2 from "./chart/mychart2";
import Daily from "./daydata/daily";
import Record from "./record/record";

const onChange = async (key: string) => {
  // get request sample
  // const data = await getList();
  ///console.log(key);
};

const tabItems: TabsProps["items"] = [
  {
    key: "1",
    label: "日报",
    // children: <Table dataSource={dataSource} columns={columns} />
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
  // {
  //   key: "3",
  //   label: "关键词",
  //   children: (
  //     <div>
  //       <Keyword />
  //     </div>
  //   ),
  // },
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ width: "800px", height: "320px" }}>
                    <Mychart />
                  </div>
                  <div style={{ width: "800px", height: "320px" }}>
                    <Mychart2 />
                  </div>
                </div>
              </p>
            ),
          },
        ]}
      ></Collapse>
      <Divider orientation="left" plain style={{ color: "lightgrey" }}>
        详细数据
      </Divider>
      <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange}></Tabs>
    </div>
  );
};
export default Option2;
