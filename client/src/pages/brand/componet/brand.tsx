import { Divider } from "antd";
import { Card } from "antd/lib";
import React, { useEffect, useState } from "react";
import { getBrand } from "../../dashboard/api/index";
import Day from "../../dashboard/daydata/daily";
import SearchInput from "./search";
import "../style/index.css";
import style from "./brand.module.css";

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
      <Divider orientation="left" plain className={style.divder}>
        OLAY 详情页
      </Divider>

      <Card className={style.cardChart}>
        <div className="search-input-wrapper">
          <SearchInput />
        </div>
      </Card>

      <Card title="查询表格" bordered={false} className={style.cardSearch}>
        <div>
          <Day getListFunction={getBrand} />
        </div>
      </Card>
    </>
  );
};

export default App;
