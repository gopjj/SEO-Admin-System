import React, { useState } from "react";
import { Card } from "antd";
import  {Tabs}  from "../../notetrack/component/Tabs";
import styles from "../style/Track.module.css";
import { DemoDualAxes } from "./DemoDualAxes";
import { NoteList } from "./NoteList";
import { getopAll } from "../../dashboard/api/Index";

const getTabs = () => {
  return new Map<string, React.ReactNode>([
    [
      "笔记当日执行",
      <div>
        <div className={styles.tabStyle}>
          <DemoDualAxes />
        </div>
        <div className={styles.noteStyle}>
          <NoteList getListFunction={getopAll} />
        </div>
      </div>,
    ],
    ["达成总览", undefined],
    ["操作7日未上榜", undefined],
  ]);
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
