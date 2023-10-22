import React, { useState } from 'react';
// import './index.css';
import { Card } from 'antd';
import Coll from "./collectionTottal"
import Record from "./recordchart"
import axios from "axios";
import { getOpnum } from "../dashboard/api/index";
import { API_BASE_URL } from "../../config";
import ApiList from "../../config/apiList";

const tabList = [
  {
    key: 'tab1',
    tab: '采集数量(/周)',
  },
  {
    key: 'tab2',
    tab: '收录数量(/周)',
  },
  {
    key: 'tab3',
    tab: '测试',
  },
];

const fetchData = async (date:any) => {
  try {
    const response = await axios.get(API_BASE_URL + ApiList.getOpnum, {
      params: {
        date: date // 将日期作为查询字符串参数发送
      }
    });
    console.log(response.data[0].opsum);

  } catch (error) {
    console.error(error);
  }

}

const onButtonClick = () => {
  // 处理按钮点击事件
  fetchData('2023-10-17');
};

const contentList: Record<string, React.ReactNode> = {
  tab1: <div><Coll /></div>,
  tab2: <div><Record /></div>,
  tab3: <button onClick={onButtonClick}>测试按钮</button>
};
const App: React.FC = () => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');
  

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };


  return (
    <>
      <Card
        style={{ width: '60%', marginTop: '18px',marginLeft: '-2px' }}
        title="总采集笔记"
        // extra={<a href="#">More</a>}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}


      </Card>
    </>
  );
};

export default App;