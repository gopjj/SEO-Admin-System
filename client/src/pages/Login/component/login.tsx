import { SafetyCertificateOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, Layout } from "antd";
import axios from "axios";
import React from "react";
import { API_BASE_URL } from "../../../config";
import ApiList from "../../../config/apiList";
import homePicture from "../../../resource/pictures/Foo.jpg";
import "../css/module/login.css";
import HeaderF from "./header";

const { Header, Footer, Content } = Layout;

const onFinish = async (values: any) => {
  try {
    console.log("Success:", values);
    const params = {
      username: values.Username,
      password: values.password,
    };


    const response = await axios.post(API_BASE_URL + ApiList.login, params, {
      headers: {
        Authorization: "TestFooDigital",
        "Content-Type": "application/json",
      },
    });
    console.log("Login response:", response.data);
    window.location.href = "/dashboard";
  } catch (error) {
    console.log("Login error:", error);
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const CustomCardTitle: React.FC<{ title: string }> = ({ title }) => (
  <div style={{ fontWeight: "bold", fontSize: "20px" }}>{title}</div>
);

const Login: React.FC = () => (
  <Layout>
    <Header className="header">
      <div className="header-style">
        <HeaderF />
      </div>
    </Header>
    <Content className="content">
      <div>
        <div className="custom-div">
          <Card
            hoverable
            className="hoverable"
            cover={<img alt="example" src={homePicture} />}
          />
        </div>
        <div className="custom-form">
          <Card hoverable style={{ width: 400, height: 490 }}>
            <div className="title-style">
              <CustomCardTitle title="账号登录" />
            </div>
            <div className="card-wrapper">
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
                <div className="username-style">
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
                <div className="password-style">
                  <Form.Item
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
                <div className="remember-pwd">
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 7, span: 12 }}
                    className="move-up-checkbox"
                  >
                    <Checkbox>记住密码</Checkbox>
                  </Form.Item>
                </div>
                <div className="login-button">
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
            <div className="register-style">
              <a href="/register">立刻注册&nbsp;&nbsp;&nbsp;|</a>
            </div>
            <div className="for-pwd">
              <a href="/register">&nbsp;&nbsp;忘记密码&nbsp; | </a>
            </div>
            <div className="replace-pwd">
              <a href="/register">修改密码&nbsp;&nbsp; </a>
            </div>
          </Card>
        </div>
      </div>
    </Content>
    <Footer className="footer">
      <p style={{ margin: "0", color: "gray" }}>
        &copy; 2014-2023 Foo Digital 上海宸居有限公司.
      </p>
    </Footer>
  </Layout>
);

export default Login;
