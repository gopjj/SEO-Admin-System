import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Row } from "antd";
import styles from "../style/Datacard.module.css";

interface SingleDataCardProps {
  value: any;
  title: string;
  dataField: number;
}

interface Data {
  keyword: string;
  kpi: number;
  sovkpi: number;
  totalsov: number;
  totalcom: number;
}

const SingleDataCard: React.FC<SingleDataCardProps> = ({ value, title }) => (
  <Col span={4}>
    <Card className={styles.dataCard} hoverable>
      <p className={styles.cardTitle}>{title}</p>
      <p className={styles.fontStyle} style={{ marginTop: '38px' }}>
      &nbsp;&nbsp; &nbsp; {value}
      </p>
    </Card>
  </Col>
);

export const TTLDataCard: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.10:8888/getttldata?keyword=发膜推荐'); // 替换为实际的后端接口路径
        const result = response.data;
        console.log(result);
        if (result.code === 200 && result.data.length > 0) {
          setData(result.data[0]); // 假设我们只关心第一个结果
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // 空数组表示只在组件挂载时运行一次

  if (!data) {
    return <div>Loading...</div>;
  }

  // 将值转换为百分比格式
  const sovkpiPercentage = (data.sovkpi * 100).toFixed(2) + '%';
  const totalsovPercentage = (data.totalsov * 100).toFixed(2) + '%';
  const totalcomPercentage = (data.totalcom * 100).toFixed(2) + '%';

  return (
    <div>
      <Row gutter={[330, 16]} style={{ marginTop: '20px' }}>
        <SingleDataCard dataField={data.kpi} title={`关键词: ${data.keyword}`} value={data.keyword} />
        <SingleDataCard dataField={data.kpi} title="KPI:" value={data.kpi} />
        <SingleDataCard dataField={data.kpi} title="Top12-PS SOV KPI:" value={sovkpiPercentage} />
        <SingleDataCard dataField={data.kpi} title="累计SOV:" value={totalsovPercentage} />
        <SingleDataCard dataField={data.kpi} title="累计compliance:" value={totalcomPercentage} />
      </Row>
    </div>
  );
};
