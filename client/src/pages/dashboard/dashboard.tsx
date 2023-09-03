import React from "react";
import { Card, Divider, Col, Row, Collapse, Table, Tabs } from "antd";
import type { TabsProps } from "antd";

import Mychart from "./mychart";

import Demo from "./record";
import Daily from "./daily";
import DataCard from "./datacard";

const onChange = (key: string) => console.log(key);

const tabItems: TabsProps["items"] = [
  {
    key: "1",
    label: "日报",
    // children: <Table dataSource={dataSource} columns={columns} />
    children: (
      <div>
        {" "}
        <Daily />
      </div>
    ),
  },
  {
    key: "2",
    label: "收录",
    children: (
      <div>
        <Demo />
      </div>
    ),
  },
  {
    key: "3",
    label: "关键词",
    children: "Content of Tab Pane 3",
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
            label: "点击展开图表",
            children: (
              <p>
                <Mychart />
              </p>
            ),
          },
        ]}
      ></Collapse>
      <Divider orientation="left" plain></Divider>
      <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange}></Tabs>
    </div>
  );
};
export default Option2;
