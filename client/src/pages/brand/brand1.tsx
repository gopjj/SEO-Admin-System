import { Divider } from "antd";
import { Card } from "antd/lib";
import React, { useEffect, useState } from "react";
import { getBrand1 } from "../dashboard/api/index";
import Day from "../dashboard/daydata/daily";
import SearchInput from "./componet/search1";
import "./style/index.css";
const App: React.FC = () => {
  const [pageWidth, setPageWidth] = useState(
    window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(
        window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Divider
        orientation="left"
        plain
        style={{ fontSize: "18px", fontWeight: "bold" }}
      >
        丰添 详情页
      </Divider>
      <Card style={{ width: pageWidth - 250, height: 320 }}>
        <div className="search-input-wrapper">
          <SearchInput />
        </div>
      </Card>
      <Card
        title="查询表格"
        bordered={false}
        style={{
          width: pageWidth - 250,
          height: 780,
          margin: "17px",
          marginLeft: "0px",
        }}
      >
        <div>
          <Day getListFunction={getBrand1} />
        </div>
      </Card>
    </>
  );
};

export default App;
