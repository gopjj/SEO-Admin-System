import React , { useState, useEffect }from "react";
import { Divider, Row, Col, Card } from "antd";
import { getList } from "../api/index";
let notesNum : any
const Datacard = () => {
  const [notesNum, setNotesNum] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const fetchData = async () => {
   
      const response = await getList();
      const returnedData = response as unknown as Array<any>;
      
      if (returnedData.length > 0) {
        setTime(returnedData[0].time);
        setNotesNum(returnedData.length);
      } else {
        setTime(0);
        setNotesNum(0);
      }
    
  }
  fetchData(); 
 
  let targetNotes = 30;
 

  return (
   
    <div>
      <p style={{ marginTop: "20px", fontSize: "14px" }}>
        <Divider orientation="left" plain>
          全部采集笔记数据
        </Divider>
      </p>
      <Row gutter={30}>
        <Col span={4}>
          <Card
            style={{
              width: 250,
              border: "1px solid #dddddd",
              borderColor: "#dddddd",
            }}
            hoverable={true}
          >
            <p
              style={{
                fontSize: "14px",
                lineHeight: "0",
                marginBottom: "28px",
              }}
            >
              目标采集笔记数:
            </p>
            <p
              style={{ fontWeight: "bold", fontSize: "20px", lineHeight: "0" }}
            >
              &nbsp;&nbsp;{targetNotes}
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card
            style={{
              width: 250,
              border: "1px solid #dddddd",
              borderColor: "#dddddd",
            }}
            hoverable={true}
          >
            <p
              style={{
                fontSize: "14px",
                lineHeight: "0",
                marginBottom: "28px",
              }}
            >
              实际采集笔记数:
            </p>
            <p
              style={{ fontWeight: "bold", fontSize: "20px", lineHeight: "0" }}
            >
              &nbsp;&nbsp;{notesNum}
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card
            style={{
              width: 250,
              border: "1px solid #dddddd",
              borderColor: "#dddddd",
            }}
            hoverable={true}
          >
            <p
              style={{
                fontSize: "14px",
                lineHeight: "0",
                marginBottom: "28px",
              }}
            >
              当前总达成:
            </p>
            <p
              style={{ fontWeight: "bold", fontSize: "20px", lineHeight: "0" }}
            >
              &nbsp;&nbsp;{((notesNum / targetNotes) * 100).toFixed(2) + '%'}
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card
            style={{
              width: 250,
              border: "1px solid #dddddd",
              borderColor: "#dddddd",
            }}
            hoverable={true}
          >
            <p
              style={{
                fontSize: "14px",
                lineHeight: "0",
                marginBottom: "28px",
              }}
            >
              当前与目标差值:
            </p>
            <p
              style={{ fontWeight: "bold", fontSize: "20px", lineHeight: "0" }}
            >
              &nbsp;&nbsp;{(100-((notesNum / targetNotes) * 100)).toFixed(2) + '%'}
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card
            style={{
              width: 250,
              border: "1px solid #dddddd",
              borderColor: "#dddddd",
            }}
            hoverable={true}
          >
            <p
              style={{
                fontSize: "14px",
                lineHeight: "0",
                marginBottom: "28px",
              }}
            >
              总采集时间:
            </p>
            <p
              style={{ fontWeight: "bold", fontSize: "20px", lineHeight: "0" }}
            >
              &nbsp;&nbsp;{time}分钟
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card
            style={{
              width: 250,
              border: "1px solid #dddddd",
              borderColor: "#dddddd",
            }}
            hoverable={true}
          >
            <p
              style={{
                fontSize: "14px",
                lineHeight: "0",
                marginBottom: "28px",
              }}
            >
              平均采集时间:
            </p>
            <p
              style={{ fontWeight: "bold", fontSize: "20px", lineHeight: "0" }}
            >
              &nbsp;&nbsp;{((time* 60 )/notesNum).toFixed(0)}秒
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Datacard;
