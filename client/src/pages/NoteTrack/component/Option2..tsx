import React, { useState } from 'react';
import { Tabs } from 'antd';
import { Card } from 'antd/lib';
import '../dashboard/css/card.css';
import DemoDualAxes from './NoteChart';
const { TabPane } = Tabs;

const onChange = (key: string) => {
  console.log(key);
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const tabs = [
    {
      label: '笔记当日执行',
      key: 'tab1',
    },
    {
      label: '达成总览',
      key: 'tab2',
    },
    {
      label: '操作7日未上榜笔记',
      key: 'tab3',
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <>
      <div className="container">
        <Card className="custom-card">
          <Tabs onChange={handleTabChange} activeKey={activeTab} type="card" tabBarGutter={18}>
            {tabs.map((tab) => (
              <TabPane tab={tab.label} key={tab.key} />
            ))}
          </Tabs>
        </Card>
        {activeTab === 'tab1' && (
          <div>
          <Card className="custom-card2">
            <DemoDualAxes />
          </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default App;