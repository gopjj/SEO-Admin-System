import React, { useState } from 'react';
// import './index.css';
import { Card } from 'antd';
import Coll from "./collectionTottal"
import Record from "./recordchart"
const tabList = [
  {
    key: 'tab1',
    tab: '采集数量(/周)',
  },
  {
    key: 'tab2',
    tab: '收录数量(/周)',
  },
];

const contentList: Record<string, React.ReactNode> = {
  tab1: <div><Coll /></div>,
  tab2: <div><Record /></div>
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