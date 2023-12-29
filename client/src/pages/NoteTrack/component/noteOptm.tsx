import React, { useState } from "react";
import { Card } from "antd";
import { Tabs } from "./Tabs";
import styles from "./styles/track.module.css";
import DemoDualAxes from "./demodualAxes";
import NoteList from "./noteList";
import { getopAll } from "../../dashboard/api";

const getTabs = () => {
  const tabs = new Map<string, React.ReactNode>();
  tabs.set(
    "笔记当日执行",
    <div>
      <div className={styles.tabStyle}>
        <DemoDualAxes />
      </div>

      <div className={styles.noteStyle}>
        <NoteList getListFunction={getopAll} />
      </div>
    </div>
  );
  tabs.set("达成总览", undefined);
  tabs.set("操作7日未上榜", undefined);
  return tabs;
};
export const NoteOptm: React.FC = () => {
  return (
    <div className={styles.container}>
      <Card className={styles.customCard}>
        <Tabs prefix="noteOptm" tabs={getTabs()} />
      </Card>
    </div>
  );
};
