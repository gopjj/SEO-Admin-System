import React ,{useState} from "react";
import { Divider, Row, Col, Card } from "antd";
import Mychart from "./mychart";
import Dashboard from "./dashboard";


enum Page{
  CONTENT = 'content',
  NOTENUM_COMPONENT = 1,
  COMPLETE_COMPONENT = 2,
  ACQTIME_COMPONENT = 3,
}

const handleComponentClick = (component: Page) => {
  // 在这里可以处理收到的参数，比如将其打印出来
  console.log(component);
  
};
const App : React.FC = () => {

  const [currentPage, setCurrentPage] = useState(Page.CONTENT);
  const value = "Hello, World!";
  const handleGridClick = (page: Page) => {
    setCurrentPage(page);
  };


  return (
    <div>
      <p style={{ marginTop: "20px", fontSize: "14px" }}>
        <Divider orientation="left" plain>
          全部采集笔记数据
        </Divider>
      </p>
      {currentPage === Page.CONTENT ? (
      <Row gutter={30}>
        <Col span={4}>
          <Card
            style={{ width: 250, border: "1px solid #dddddd", borderColor: "#dddddd" }}
            hoverable={true} onClick={() => handleGridClick(Page.NOTENUM_COMPONENT)}
          >
            <p style={{ fontSize: "14px", lineHeight: "0", marginBottom: "28px" }}>
              目标采集笔记数:
            </p>
            <p style={{ fontWeight: "bold", fontSize: "20px", lineHeight: "0" }}>
              &nbsp;&nbsp;2,443
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ width: 250, border: "1px solid #dddddd", borderColor: "#dddddd" }}
            hoverable={true} onClick={() => handleGridClick(Page.NOTENUM_COMPONENT)}
          >
            <p style={{ fontSize: "14px", lineHeight: "0", marginBottom: "28px" }}>
              实际采集笔记数:
            </p>
            <p style={{ fontWeight: "bold", fontSize: "20px", lineHeight: "0" }}>
              &nbsp;&nbsp;1,884
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ width: 250, border: "1px solid #dddddd", borderColor: "#dddddd" }}
            hoverable={true} onClick={() => handleGridClick(Page.COMPLETE_COMPONENT)}
          >
            <p style={{ fontSize: "14px", lineHeight: "0", marginBottom: "28px" }}>
              当前总达成:
            </p>
            <p style={{ fontWeight: "bold", fontSize: "20px", lineHeight: "0" }}>
              &nbsp;&nbsp;50.20%
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ width: 250, border: "1px solid #dddddd", borderColor: "#dddddd" }}
            hoverable={true} onClick={() => handleGridClick(Page.COMPLETE_COMPONENT)}
          >
            <p style={{ fontSize: "14px", lineHeight: "0", marginBottom: "28px" }}>
              当前与目标差值:
            </p>
            <p style={{ fontWeight: "bold", fontSize: "20px", lineHeight: "0" }}>
              &nbsp;&nbsp;49.80%
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card
            style={{ width: 250, border: "1px solid #dddddd", borderColor: "#dddddd" }}
            hoverable={true} onClick={() => handleGridClick(Page.ACQTIME_COMPONENT)}
          >
            <p style={{ fontSize: "14px", lineHeight: "0", marginBottom: "28px" }}>
              总采集时间:
            </p>
            <p style={{ fontWeight: "bold", fontSize: "20px", lineHeight: "0" }}>
              &nbsp;&nbsp;10分钟
            </p>
          
          </Card>
          
        </Col>

        <Col span={4}>
          <Card
            style={{ width: 250, border: "1px solid #dddddd", borderColor: "#dddddd" }}
            hoverable={true} onClick={() => handleGridClick(Page.ACQTIME_COMPONENT)}
          >
            <p style={{ fontSize: "14px", lineHeight: "0", marginBottom: "28px" }}>
              平均采集时间:
            </p>
            <p style={{ fontWeight: "bold", fontSize: "20px", lineHeight: "0" }}>
              &nbsp;&nbsp;30秒
            </p>
          </Card>
        </Col>
      </Row>
      
     ) : currentPage === Page.NOTENUM_COMPONENT ? (
        <NotenumComponent value="Notenum Value" />
      ): currentPage === Page.COMPLETE_COMPONENT ? (
        <CompleteComponent />
      ): currentPage === Page.ACQTIME_COMPONENT ? (
        <AcqtimeComponent />
      ): null}
     
    </div>
   
  );
};
const NotenumComponent: React.FC<{ value: string }> = ({ value }) => {
  return <div>{value}</div>;
};
const CompleteComponent: React.FC = () => {
  return <div>This is CompleteComponent</div>;
};
const AcqtimeComponent: React.FC = () => {
  return <div>This is AcqtimeComponent</div>;
};

export default App;