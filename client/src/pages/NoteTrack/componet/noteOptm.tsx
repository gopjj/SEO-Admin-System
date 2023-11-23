import React, { useState } from "react";
import { Tabs, Card } from "antd";
import { getopAll } from "../../dashboard/api";
import DemoDualAxes from "./demodualAxes";
import NoteList from "./noteList";

import styles from "./styles/track.module.css"


const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const tabs = [
    {
      label: "笔记当日执行",
      key: "tab1",
    },
    {
      label: "达成总览",
      key: "tab2",
    },
    {
      label: "操作7日未上榜笔记",
      key: "tab3",
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.customCard}>
        <Tabs
          onChange={handleTabChange}
          activeKey={activeTab}
          type="card"
          tabBarGutter={18}
        >
          {tabs.map((tab) => (
            <Tabs.TabPane tab={tab.label} key={tab.key} />
          ))}
        </Tabs>
      </Card>

      {activeTab === "tab1" && (
        <div>
          <div className={styles.tabStyle}>
            <DemoDualAxes />
          </div>

          <div className={styles.noteStyle}>
            <NoteList getListFunction={getopAll} />
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
