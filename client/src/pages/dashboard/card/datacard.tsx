import { useState, useEffect } from "react";
import { Card, Col, Divider, Row } from "antd";
import { getList } from "../api/index";
import styles from "./datacard.module.css";

const Datacard = () => {
  const [notesNum, setNotesNum] = useState<number>(0);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getList();
        const returnedData = response.data as unknown as Array<any>;

        if (returnedData.length > 0) {
          setTime(returnedData[0].time);
          setNotesNum(returnedData.length);
        } else {
          setTime(0);
          setNotesNum(0);
        }
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p className={styles.cardText}>
        <Divider orientation="left" plain>
          全部采集笔记汇总
        </Divider>
      </p>
      <Row gutter={30}>
        <Col span={4}>
          <Card className={styles.dataCard} hoverable>
            <p className={styles.cardTitle}>总关键词数量:</p>
            <p className={styles.fontStyle}>
              &nbsp;&nbsp;{((time * 60) / notesNum).toFixed(0)}分钟
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card className={styles.dataCard} hoverable>
            <p className={styles.cardTitle}>总KOL发布:</p>
            <p className={styles.fontStyle}>
              &nbsp;&nbsp;{((time * 60) / notesNum).toFixed(0)}分钟
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card className={styles.dataCard} hoverable>
            <p className={styles.cardTitle}>总达成:</p>
            <p className={styles.fontStyle}>
              &nbsp;&nbsp;{((time * 60) / notesNum).toFixed(0)}分钟
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card className={styles.dataCard} hoverable>
            <p className={styles.cardTitle}>总收录率:</p>
            <p className={styles.fontStyle}>
              &nbsp;&nbsp;{((time * 60) / notesNum).toFixed(0)}分钟
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card className={styles.dataCard} hoverable>
            <p className={styles.cardTitle}>总KOC发布:</p>
            <p className={styles.fontStyle}>
              &nbsp;&nbsp;{((time * 60) / notesNum).toFixed(0)}分钟
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card className={styles.dataCard} hoverable>
            <p className={styles.cardTitle}>总笔记数量:</p>
            <p className={styles.fontStyle}>
              &nbsp;&nbsp;{((time * 60) / notesNum).toFixed(0)}秒
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Datacard;
