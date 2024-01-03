import { useState, useEffect } from "react";
import { Card, Col, Divider, Row } from "antd";
import { getList } from "../api/Index";
import styles from "../style/Datacard.module.css";
import {
  allDataString,
  sumDataString,
  kolDataString,
  achDataString,
  recordString,
  kocString,
  noteSumString,
} from "../../../constants/constants";

const fetchData = async () => {
  try {
    const response = await getList();
    const returnedData = response.data as unknown as Array<any>;
    if (returnedData && returnedData.length > 0) {
      return returnedData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error while fetching data:", error);
    return null;
  }
};

interface SingleDataCardProps {
  time: number;
  title: string;
  value: number;
}
const SingleDataCard: React.FC<SingleDataCardProps> = (
  props: SingleDataCardProps
) => {
  const { time, title, value } = props;
  return (
    <Col span={4}>
      <Card className={styles.dataCard} hoverable>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.fontStyle}>
          &nbsp;&nbsp;{((time * 60) / value).toFixed(0)}
        </p>
      </Card>
    </Col>
  );
};
export const DataCard = () => {
  const [notesNum, setNotesNum] = useState<number>(0);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    fetchData().then((res) => {
      if (!res) {
        setTime(0);
        setNotesNum(0);
        return;
      }

      setTime(res[0].time);
      setNotesNum(res.length);
    });
  }, []);
  return (
    <div>
      <p className={styles.cardText}>
        <Divider orientation="left" plain>
          {allDataString}
        </Divider>
      </p>
      <Row gutter={30}>
        <SingleDataCard time={time} title={sumDataString} value={notesNum} />
        <SingleDataCard time={time} title={kolDataString} value={notesNum} />
        <SingleDataCard time={time} title={achDataString} value={notesNum} />
        <SingleDataCard time={time} title={recordString} value={notesNum} />
        <SingleDataCard time={time} title={kocString} value={notesNum} />
        <SingleDataCard time={time} title={noteSumString} value={notesNum} />
      </Row>
    </div>
  );
};
