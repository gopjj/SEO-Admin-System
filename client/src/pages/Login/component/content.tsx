import React,{  ReactNode,useState , CSSProperties}from "react";
import { Card } from 'antd';
import jpg1 from "./Foo.jpg";
import './css/card-style.css'
import { Layout,Space } from "antd";
import { Button, Checkbox, Form, Input ,Carousel} from 'antd';
import { UserOutlined ,SafetyOutlined,SafetyCertificateOutlined } from '@ant-design/icons';
import  './login.css';
import logo from './1.jpg'
import axios from 'axios';
import { API_BASE_URL } from "D:/CodeRepository/SEO-Admin-System/client/src/config/index";
import ApiList from "D:/CodeRepository/SEO-Admin-System/client/src/config/apiList";

type MyComponentProps = {
  children: ReactNode;
  // 其他属性...
};

const App:React.FC<MyComponentProps> = ({ children }) => (
    <div>
        <div className="customDiv">
            <Card
               hoverable
               style={{ width: 980,height: 380 ,borderRadius: '100px 100px 100px 100px'}}
               cover={<img alt="example" src={jpg1} />}
            >
          </Card>
        </div>
            
        <div className="customform">
            <Card style={{ width: 400 ,height:490}}>
            
    
            </Card>
        </div>
    </div>
)
export default App;