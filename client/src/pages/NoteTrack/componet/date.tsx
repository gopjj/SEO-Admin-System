import React from "react";
import { Space, theme } from "antd";


const Date: React.FC = () => {
  const { token } = theme.useToken();
  const style: React.CSSProperties = {
    border: `1px solid ${token.colorPrimary}`,
    borderRadius: "50%",
  };


  return <Space size={12} direction="vertical"></Space>;
};

export default Date;
