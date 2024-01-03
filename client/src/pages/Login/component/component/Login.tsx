import { SafetyCertificateOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, Layout } from "antd";
import axios from "axios";
import { API_BASE_URL } from "../../../../config";
import ApiList from "../../../../config/apiList";
import homePicture from "../../../resource/pictures/Foo.jpg";
import style from "./style/Login.module.css";
import { copyRightString } from "../../../../constants/constants";
import logo from "../../../resource/pictures/logo.jpg";
import { Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { AppContext } from "./Appcontext";
// import {LoginContext} from './LoginContext'
// import {appContext} from '../component/appContext'

const { Header, Footer, Content } = Layout;
interface loginUserParams {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const appContext = useContext(AppContext);

  const [redirectToDashboard, setRedirectToDashboard] = React.useState(false);

  const onFinish = async (values: any) => {
    try {
      console.log("Success:", values);

      const params: loginUserParams = {
        username: values.Username,
        password: values.password,
      };
      console.log("Login response:", params.username);
      const response = await axios.post(API_BASE_URL + ApiList.login, params, {
        headers: {
          Authorization: "TestFooDigital",
          "Content-Type": "application/json",
        },
      });

      if (response) {
        setRedirectToDashboard(true);
        const appState = appContext.state;
        appState.userName = params.username;
        appContext.setState(appState);
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout>
      {redirectToDashboard && <Navigate to="/dashboard" />}
      <Header className={style.header}>
        {/* <div className={style.headerStyle}> */}
        <img src={logo} alt="Logo" className={style.headerStyle} />;
        {/* </div> */}
      </Header>
      <Content className={style.content}>
        <div>
          <div className={style.customDiv}>
            <Card
              hoverable
              className={style.hoverable}
              cover={<img alt="example" src={homePicture} />}
            />
          </div>
          <div className={style.customForm}>
            <Card hoverable className={style.loginCard}>
              <div className={style.titleStyle}>
                <p>账号登录 </p>
              </div>
              <div className={style.formWrapper}>
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
                  <div className={style.username}>
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
                  <div className={style.password}>
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
                  <div className={style.rememberPwd}>
                    <Form.Item
                      name="remember"
                      valuePropName="checked"
                      wrapperCol={{ offset: 7, span: 12 }}
                      className={style.moveUpCheckbox}
                    >
                      <Checkbox>记住密码</Checkbox>
                    </Form.Item>
                  </div>
                  <div className={style.loginButton}>
                    <Form.Item
                      className={style.moveUpCheckbox}
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
              <div className={style.register}>
                <a href="/register">立刻注册&nbsp;&nbsp;&nbsp;|</a>
              </div>
              <div className={style.forPwd}>
                <a href="/register">&nbsp;&nbsp;忘记密码&nbsp; | </a>
              </div>
              <div className={style.replacePwd}>
                <a href="/register">修改密码&nbsp;&nbsp; </a>
              </div>
            </Card>
          </div>
        </div>
        {/* <div>{username1}</div> */}
      </Content>
      <Footer className={style.footer}>
        <p style={{ margin: "0", color: "gray" }}>&copy;{copyRightString}</p>
      </Footer>
    </Layout>
  );
};

