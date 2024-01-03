import { Collapse, Divider } from "antd";
import React from "react";
import { detailDataString } from "../../../constants/constants";
import { Tabs } from "../../notetrack/component/Tabs"
// import { Tabs } from "../../noteTrack/component/Tabs";
import { LineChart } from "./LineChart";
import { DataCard } from "./Datacard";
import { getList } from "../api/Index";
import { Daily } from "./Daily";
import { Record } from "./Record";

const getCollapseItems = () => {
  const prefix = "dashboard-collapse";
  const label = "点击展开周报图标";
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
    ["日报", <Daily getListFunction={getList}/>],
    ["收录", <Record />],
  ]);
}

export const Dashboard: React.FC = () => {
  return (
    <div>
      <DataCard />
      <Divider orientation="left" plain></Divider>
      <Collapse items={getCollapseItems()}></Collapse>
      <Divider orientation="left" plain style={{ color: "lightgrey" }}>
        {detailDataString}
      </Divider>
      <Tabs prefix='dashboard' tabs={getTabs()}/>
    </div>
  );
};
