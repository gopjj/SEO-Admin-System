import React from 'react';
import { Card,Divider,Col,Row ,Table,Tabs} from 'antd'
import type { TabsProps } from 'antd';

const onChange = (key: string) => {
  console.log(key);
};
const dataSource = [
  {
    key: '1',
    author: '土拨鼠',
    title: 'Olay两款小白瓶 应该怎么选？Get牛奶肌',
    keyword: '美白精华',
    date: '2020-03-13',
    brand: 'Olay',
    status: '已收录',
    number: '5'
  },
  {
    key: '2',
    author: 'OLAY',
    title: '天气升温，小白伞给你美白防晒双重保护',
    keyword: '美白精华',
    date: '2020-03-23',
    brand: 'Olay',
    status: '未收录',
    number: '20'
  },
  {
    key: '3',
    author: 'Conybaby',
    title: '小白伞这么厉害❓❓ 防晒测评Q&A‼️',
    keyword: '美白精华',
    date: '2020-07-23',
    brand: 'Olay',
    status: '未收录',
    number: '11'
  },
  {
    key: '4',
    author: 'Conybaby',
    title: '小白伞这么厉害❓❓ 防晒测评Q&A‼️',
    keyword: '美白精华',
    date: '2020-07-23',
    brand: 'Olay',
    status: '未收录',
    number: '11'
  },
  {
    key: '5',
    author: 'Conybaby',
    title: '小白伞这么厉害❓❓ 防晒测评Q&A‼️',
    keyword: '美白精华',
    date: '2020-07-23',
    brand: 'Olay',
    status: '未收录',
    number: '11'
  },
  {
    key: '6',
    author: 'Conybaby',
    title: '小白伞这么厉害❓❓ 防晒测评Q&A‼️',
    keyword: '美白精华',
    date: '2020-07-23',
    brand: 'Olay',
    status: '未收录',
    number: '11'
  },
  {
    key: '7',
    author: 'Conybaby',
    title: '小白伞这么厉害❓❓ 防晒测评Q&A‼️',
    keyword: '美白精华',
    date: '2020-07-23',
    brand: 'Olay',
    status: '未收录',
    number: '11'
  },
];
const columns = [
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',

  },
  {
    title: '关键词',
    dataIndex: 'keyword',
    key: 'keyword',
  },
  {
    title: '笔记情况',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '发布日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '品牌',
    dataIndex: 'brand',
    key: 'brand',
  },
  {
    title: '在榜次数',
    dataIndex: 'number',
    key: 'number',
  },
];

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '日报',
    children: <Table dataSource={dataSource} columns={columns} />
  },
  {
    key: '2',
    label: '收录',
    children: <div>Content of Tab Pane 2</div>,
  },
  {
    key: '3',
    label: '关键词',
    children: 'Content of Tab Pane 3',
  },
];


const Option2: React.FC = () => {
  return (
    <div>
      <p style={{ marginTop: "20px", fontSize: "14px" }}>
        <Divider orientation="left" plain>
          采集笔记数据
        </Divider>
        </p>
      <Row gutter={30}>
      <Col span={4}>
      <Card style={{ width: 250 , border: '1px solid #dddddd', borderColor: '#dddddd'}}  hoverable={true}>
        <p style={{  fontSize: "14px", lineHeight: "0" ,marginBottom: "28px" }}>优化笔记数:</p>
        <p style={{ fontWeight: "bold",fontSize: "20px", lineHeight: "0" }}>&nbsp;&nbsp;2,443</p>
      </Card>
      </Col>
      <Col span={4}>
      <Card style={{ width: 250 , border: '1px solid #dddddd', borderColor: '#dddddd'}}  hoverable={true} >
        <p style={{  fontSize: "14px", lineHeight: "0" ,marginBottom: "28px"}}>上榜笔记数:</p>
        <p style={{ fontWeight: "bold",fontSize: "20px", lineHeight: "0" }}>&nbsp;&nbsp;1,884</p>
      </Card>
      </Col>
      <Col span={4}>
      <Card style={{ width: 250 , border: '1px solid #dddddd', borderColor: '#dddddd' }}  hoverable={true}>
        <p style={{  fontSize: "14px", lineHeight: "0" ,marginBottom: "28px"}}>当前总达成:</p>
        <p style={{ fontWeight: "bold",fontSize: "20px", lineHeight: "0" }}>&nbsp;&nbsp;50.20%</p>
      </Card>
      </Col>
      <Col span={4}>
      <Card style={{ width: 250 , border: '1px solid #dddddd', borderColor: '#dddddd'}} hoverable={true}>
        <p style={{  fontSize: "14px", lineHeight: "0" ,marginBottom: "28px"}}>当前与目标差值:</p>
        <p style={{ fontWeight: "bold",fontSize: "20px", lineHeight: "0" }}>&nbsp;&nbsp;49.80%</p>
      </Card>
      </Col>
      <Col span={4}>
      <Card style={{ width: 250 , border: '1px solid #dddddd', borderColor: '#dddddd'}} hoverable={true} >
        <p style={{  fontSize: "14px", lineHeight: "0" ,marginBottom: "28px"}}>上榜笔记平均排名:</p>
        <p style={{ fontWeight: "bold",fontSize: "20px", lineHeight: "0" }}>&nbsp;&nbsp;4</p>
      </Card>
      </Col>
      <Col span={4}>
      <Card style={{ width: 250, border: '1px solid #dddddd', borderColor: '#dddddd' }}  hoverable={true}>
        <p style={{  fontSize: "14px", lineHeight: "0",marginBottom: "28px"}}>关键词:</p>
        <p style={{ fontWeight: "bold",fontSize: "20px", lineHeight: "0" }}>&nbsp;&nbsp;美白精华</p>
      </Card>
      </Col>
      </Row>
      <Divider orientation="left" plain></Divider>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
  
};
export default Option2;