import { useState, useEffect } from "react";
import { Card, Col, Divider, Row } from "antd";
import { getList } from "../api";
import styles from "./styles/datacard.module.css"
import {allDataString,sumDataString,kolDataString,achDataString,recordString,kocString,noteSumString} from "../../../constants/constants"


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
          {allDataString}
        </Divider>
      </p>
      <Row gutter={30}>
        <Col span={4}>
          <Card className={styles.dataCard} hoverable>
            <p className={styles.cardTitle}>{sumDataString}</p>
            <p className={styles.fontStyle}>
              &nbsp;&nbsp;{((time * 60) / notesNum).toFixed(0)}
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card className={styles.dataCard} hoverable>
            <p className={styles.cardTitle}>{kolDataString}</p>
            <p className={styles.fontStyle}>
              &nbsp;&nbsp;{((time * 60) / notesNum).toFixed(0)}
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card className={styles.dataCard} hoverable>
            <p className={styles.cardTitle}>{achDataString}</p>
            <p className={styles.fontStyle}>
              &nbsp;&nbsp;{((time * 60) / notesNum).toFixed(0)}
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card className={styles.dataCard} hoverable>
            <p className={styles.cardTitle}>{recordString}</p>
            <p className={styles.fontStyle}>
              &nbsp;&nbsp;{((time * 60) / notesNum).toFixed(0)}
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card className={styles.dataCard} hoverable>
            <p className={styles.cardTitle}>{kocString}</p>
            <p className={styles.fontStyle}>
              &nbsp;&nbsp;{((time * 60) / notesNum).toFixed(0)}
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card className={styles.dataCard} hoverable>
            <p className={styles.cardTitle}>{noteSumString}</p>
            <p className={styles.fontStyle}>
              &nbsp;&nbsp;{((time * 60) / notesNum).toFixed(0)}
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Datacard;
