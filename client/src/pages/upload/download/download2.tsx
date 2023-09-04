import React from 'react';
import { message, Upload,Card,Button,Divider,Col,Row } from "antd";
import { DownloadOutlined } from '@ant-design/icons';
const handleDownload = () => {
  const fileUrl = "./index.css"; // 文件的下载链接
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = "index.css"; // 下载后保存的文件名
  link.click();
};

const DownloadButton: React.FC = () => (
    <Button type="primary"  onClick={handleDownload} shape="round" icon={<DownloadOutlined  /> } >
    收录表.xlsx
  </Button>
)
export default DownloadButton;