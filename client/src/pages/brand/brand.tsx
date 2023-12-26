import React, { useState, useEffect } from 'react';
import { fetchData } from "../dashboard/api/test1";
import { Divider } from 'antd';
import { Card } from 'antd/lib';
import  SearchInput  from './componet/search';
import './style/index.css'
import Day from  '../dashboard/daydata/daily'
import { getList,getBrand } from "../dashboard/api/index";


const App: React.FC = () => {
  const [pageWidth, setPageWidth] = useState(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 判断品牌身份 
  return (
    <>
      <Divider orientation="left" plain style={{ fontSize: '18px', fontWeight: 'bold' }}>
        OLAY 详情页
      </Divider>
    
      <Card style={{ width: pageWidth-250, height: 320 }}>
      <div className="search-input-wrapper">
        <SearchInput/>

      </div>
      </Card>
 
      <Card title="查询表格" bordered={false} style={{ width: pageWidth-250, height:780,margin: '17px',marginLeft: '0px'  }}>
      <div>
        <Day getListFunction={getBrand}/>
      </div>
      </Card> 
    </>
  );
};

export default App;