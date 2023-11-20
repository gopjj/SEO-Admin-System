import React from "react";
import { Space, theme } from "antd";
import type { Dayjs } from "dayjs";
import type { CellRenderInfo } from "rc-picker/es/interface";

const Date: React.FC = () => {
  const { token } = theme.useToken();
  const style: React.CSSProperties = {
    border: `1px solid ${token.colorPrimary}`,
    borderRadius: "50%",
  };


  return <Space size={12} direction="vertical"></Space>;
};

export default Date;
