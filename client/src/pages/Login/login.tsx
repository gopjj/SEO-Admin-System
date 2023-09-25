import React,{ useState , CSSProperties}from "react";
import { Layout,Space } from "antd";
import { Card } from 'antd';
import { Button, Checkbox, Form, Input ,Carousel} from 'antd';
import { UserOutlined ,SafetyOutlined,SafetyCertificateOutlined } from '@ant-design/icons';
import  './login.css';
import logo from './1.jpg'
import axios from 'axios';
import { API_BASE_URL } from "../../config";
import ApiList from "../../config/apiList";
import jpg1 from "./Foo.jpg";


interface CustomCardTitleProps {
  title: string;
  titleStyle?: CSSProperties;
}

const CustomCardTitle: React.FC<CustomCardTitleProps> = ({ title, titleStyle }) => (
  <div style={{ fontWeight: 'bold', fontSize: '20px', ...titleStyle }}>{title}</div>
);

const onFinish = (values: any) => {

    console.log('Success:', values);
    const params = JSON.stringify({
      username: values.Username,
      password: values.password

    });
    console.log(params)
    axios.post(API_BASE_URL + ApiList.login, params,{
      headers: {
        Authorization: "TestFooDigital",
        "Content-Type": "application/json",
     
      },
    })
    .then(response => {
      console.log('Login response:', response.data);
     
      window.location.href = '/dashboard';
   
    })
    .catch(error => {
      console.log('Login error:', error);
  
    });
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  
  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };
  
const { Header,Footer,Sider,Content } = Layout

const headerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    height: 70,
    paddingInline: 50,
    lineHeight: "40px",
    backgroundColor: "#FFFFFF"
};

const ContentStyle: React.CSSProperties = {
    textAlign: "center",
    minHeight: 900,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    backgroundColor: "#feebef"
  };

const footerStyle: React.CSSProperties = {
    textAlign: "center",
    color:"fff",
    minHeight: 50,
    backgroundColor: "#DDFFFF",
};

const CardWrapperStyle: React.CSSProperties = {
    position: "absolute",
    height: "100%",
   
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
  const Logo: React.FC = () => (
    <div style={{ position: "relative", left: "-2px", top: "-240px", fontFamily: "微软雅黑", fontSize: "24px" }}>
      <img src={logo} alt="Logo" style={{ marginTop: "0px", width: "200px", height: "auto" }} />
    </div>
  );

  const Title: React.FC = () => (
    <div style={{ position: "relative", left: "-2px", top: "-232px", fontFamily: "微软雅黑", fontSize: "24px" }}>
      Sign in to Seo
    </div>
  );
  
const App:React.FC = () => (
    <Space direction="vertical" style={{width: "100%"}} size={[0,48]}>
        <Layout>
        <Header
        style={{ display: "flex", alignItems: "center", background: "white" }}
      >
        <img src={logo} alt="Logo" style={{ height: 46, margin: -10 }} />
      </Header>
            <Content style={{...ContentStyle,color:"black"}}>
            <div style={{ textAlign: "center" }}>
            {/* <img src={logo} alt="Logo" style={{ marginTop: "0px", width: "200px", height: "auto" }}/> */}
            
          
            {/* <Title /> */}
            <div
            style={{ 
              position: 'relative', 
              top: '-90px', 
              left: '-200px' 
            }}>
            <Card
               hoverable
               style={{ width: 980,height: 380 ,borderRadius: '100px 100px 100px 100px'}}
               cover={<img alt="example" src={jpg1} />}
            >
            {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
            </Card>
            </div>
            <div
            style={{
              position: 'relative', 
              top: '-257px', 
              left: '792px' 
            }}
          >
           
            <Card 
              style={{ width: 348 ,height:494,backgroundColor: "#FfFfFf",marginTop:-214}}>
              <div
              style={{ 
                position: 'relative', 
                top: '12px', 
                left: '-30px' 
              }}>
              <CustomCardTitle title="账号登录" titleStyle={{ marginTop: "20px", marginLeft: "50px" }} />
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
                position: 'relative', 
                top: '-60px', 
                left: '14px' 
              }}>
                  <Form.Item
                    
                    name="Username"
                    
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    labelCol={{ span: 8}}
                    wrapperCol={{ span: 18 }}
                   
                >
                   <Input prefix={<UserOutlined />} placeholder="请输入用户名" style={{ width: '272px', height: '52px' }} />
                 
                    </Form.Item>
                    </div>
                    <div
              style={{
                position: 'relative', 
                top: '-58px', 
                left: '14px' 
              }}>
                    <Form.Item<FieldType>
                    // label="密码  "
                    name="password"
                    labelCol={{ span: 8}}
                    wrapperCol={{ span: 18 }}
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                    <Input.Password prefix={<SafetyCertificateOutlined />} placeholder="请输入密码" style={{ width: '272px', height: '52px' }} />
                    </Form.Item>
                    </ div>
                    <div style={{
                       position: 'relative', 
                       top: '-58px', 
                       left: '2px' 
                    }}>
                    <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 7, span: 12 }}
                    className="move-up-checkbox"
                    >
                    <Checkbox>记住密码</Checkbox>
                    </Form.Item>
                    </div>
                    <div style={{
                      position: 'relative', 
                      top: '-52px', 
                      left: '-66px' 
                      }}>
                    <Form.Item  className="move-up-checkbox" wrapperCol={{ offset: 7 ,span: 12 }}>
                    <Button type="primary" htmlType="submit" style={{width:272,height:48}}>
                        登录
                    </Button>
    </Form.Item>
    </div>
  </Form>
            </div>
            <div style={{
              position: 'relative', 
              top: '348px', 
              left: '-60px' 
            }}>
            <a href="/register">立刻注册&nbsp;&nbsp;&nbsp;|</a>
            </div>
            <div style={{
              position: 'relative', 
              top: '326px', 
              left: '15px' 
            }}>
            <a href="/register">&nbsp;&nbsp;忘记密码&nbsp; | </a>
            </div>
            <div style={{
              position: 'relative', 
              top: '304px', 
              left: '100px' 
            }}>
            <a href="/register">修改密码&nbsp;&nbsp;    </a>
            </div>
            
            </Card>
            </div>

            </div>
            
            {/* <div
            style={{
              position: 'relative', 
              top: '-58px', 
              left: '2px' 
           }}>
            <Carousel autoplay>
            <div>
               <h3 style={contentStyle}>1</h3>
            </div>
            <div>
               <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
            </div> */}
            </Content>
            <Footer style={footerStyle}>
            </Footer>
        </Layout>

    </Space>
);

export default App;