import { useState, useEffect } from "react";
import { Card, Col, Row } from "antd";
import { getList } from "../api/Index";
import styles from "../style/Datacard.module.css";
import {
  allDataString,
  sumListedString ,
  listDataString,
  achDataString,
  recordString,

  noteSumString,
} from "../../../constants/constants";

// import { fetchData } from "./Daily";
import {getCombinedData} from "../api/Index";

interface DataCardProps {
  data: any; // 定义一个名为 data 的prop
}


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
        <p className={styles.fontStyle}  style={{marginTop:'38px'}}>
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
      </p>
  <Row gutter={372} style={{ marginTop: '20px' }}>
  <SingleDataCard time={time} title={noteSumString} value={notesNum} />
  <SingleDataCard time={time} title={recordString} value={notesNum} />
    <SingleDataCard time={time} title={sumListedString} value={notesNum} />
    <SingleDataCard time={time} title={listDataString} value={notesNum} />
    <SingleDataCard time={time} title={achDataString} value={notesNum} />
  </Row>
    </div>

  );
};
