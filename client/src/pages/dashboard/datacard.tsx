import React from "react";
import { Divider, Row, Col, Card } from "antd";

const datacard = () => {
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
              &nbsp;&nbsp;2,443
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
              &nbsp;&nbsp;1,884
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
              &nbsp;&nbsp;50.20%
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
              &nbsp;&nbsp;49.80%
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
              &nbsp;&nbsp;10分钟
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
              &nbsp;&nbsp;30秒
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default datacard;
