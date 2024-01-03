import { Card } from "antd";
import React, { ReactNode } from "react";
import jpg1 from "./Foo.jpg";
import cardStyles from "./css/card-style.module.css";
import "./login.css";

type MyComponentProps = {
  children: ReactNode;
  // 其他属性...
};

export const Content: React.FC<MyComponentProps> = ({ children }) => (
  <div>
    <div className={cardStyles.customDiv}>
      <Card
        hoverable
        style={{
          width: 980,
          height: 380,
          borderRadius: "100px 100px 100px 100px",
        }}
        cover={<img alt="example" src={jpg1} />}
      ></Card>
    </div>

    <div className={cardStyles.customform}>
      <Card style={{ width: 400, height: 490 }}></Card>
    </div>
  </div>
);

