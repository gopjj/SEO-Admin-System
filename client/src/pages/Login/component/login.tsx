import { SafetyCertificateOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, Layout } from "antd";
import axios from "axios";
import React, { CSSProperties } from "react";
import { API_BASE_URL } from "../../../config";
import ApiList from "../../../config/apiList";
import jpg1 from "../../../resource/pictures/Foo.jpg";
import "../css/font-style.css";
import "../css/login.css";
import cardStyles from "../css/card-style.module.css";

import HeaderF from "./header";

const { Header, Footer, Content } = Layout;

const onFinish = (values: any) => {
  console.log("Success:", values);
  const params = JSON.stringify({
    username: values.Username,
    password: values.password,
  });

  console.log(params);
  axios
    .post(API_BASE_URL + ApiList.login, params, {
      headers: {
        Authorization: "TestFooDigital",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("Login response:", response.data);

      window.location.href = "/dashboard";
    })
    .catch((error) => {
      console.log("Login error:", error);
    });
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

interface CustomCardTitleProps {
  title: string;
  titleStyle?: CSSProperties;
}

const CustomCardTitle: React.FC<CustomCardTitleProps> = ({
  title,
  titleStyle,
}) => (
  <div style={{ fontWeight: "bold", fontSize: "20px", ...titleStyle }}>
    {title}
  </div>
);

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 60,
  paddingInline: 50,
  lineHeight: "50px",
  backgroundColor: "#FFFFFF",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 800,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  backgroundColor: "#feebef",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  backgroundColor: "#eff1f8",
};

const CardWrapperStyle: React.CSSProperties = {
  position: "absolute",
  height: "100%",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Login: React.FC = () => (
  <Layout>
    <Header style={headerStyle}>
      <div style={{ position: "relative", left: "-840px", top: "12px" }}>
        <HeaderF />
        {/* <h1 className="pageTitle" style = {h1Style}>下单平台</h1> */}
      </div>
    </Header>

    <Content style={contentStyle}>
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
          <Card style={{ width: 400, height: 490 }}>
            <div>
              <CustomCardTitle
                title="账号登录"
                titleStyle={{
                  marginTop: "24px",
                  marginLeft: "0px",
                  letterSpacing: "4px",
                }}
              />
            </div>
            <div style={CardWrapperStyle}>
              <Form
                name="basic"
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <div
                  style={{
                    position: "relative",
                    top: "-60px",
                    left: "38px",
                  }}
                >
                  <Form.Item
                    name="Username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 18 }}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="请输入用户名"
                      style={{ width: "272px", height: "52px" }}
                    />
                  </Form.Item>
                </div>
                <div
                  style={{
                    position: "relative",
                    top: "-54px",
                    left: "38px",
                  }}
                >
                  <Form.Item<FieldType>
                    // label="密码  "
                    name="password"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 18 }}
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<SafetyCertificateOutlined />}
                      placeholder="请输入密码"
                      style={{ width: "272px", height: "52px" }}
                    />
                  </Form.Item>
                </div>
                <div
                  style={{
                    position: "relative",
                    top: "-54px",
                    left: "28px",
                  }}
                >
                  <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 7, span: 12 }}
                    className="move-up-checkbox"
                  >
                    <Checkbox>记住密码</Checkbox>
                  </Form.Item>
                </div>
                <div
                  style={{
                    position: "relative",
                    top: "-54px",
                    left: "-40px",
                  }}
                >
                  <Form.Item
                    className="move-up-checkbox"
                    wrapperCol={{ offset: 7, span: 12 }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: 272, height: 48 }}
                    >
                      登录
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
            <div
              style={{
                position: "relative",
                top: "338px",
                left: "-80px",
              }}
            >
              <a href="/register">立刻注册&nbsp;&nbsp;&nbsp;|</a>
            </div>
            <div
              style={{
                position: "relative",
                top: "316px",
                left: "0px",
              }}
            >
              <a href="/register">&nbsp;&nbsp;忘记密码&nbsp; | </a>
            </div>
            <div
              style={{
                position: "relative",
                top: "295px",
                left: "84px",
              }}
            >
              <a href="/register">修改密码&nbsp;&nbsp; </a>
            </div>
          </Card>
        </div>
      </div>
    </Content>
    <Footer style={footerStyle}>
      <p style={{ margin: "0", color: "gray" }}>
        &copy; 2014-2023 Foo Digital 上海宸居有限公司.
      </p>
    </Footer>
  </Layout>
);

export default Login;
