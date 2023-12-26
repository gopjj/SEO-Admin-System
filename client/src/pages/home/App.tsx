import React, { createContext, useState } from "react";
import FooHeadImg from "../../resource/pictures/FOOHEAD.jpg";
import {
  FundTwoTone,
  EditTwoTone,
  PieChartTwoTone,
  DiffTwoTone,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import logo from "../../component/images/logo.png";
import { Avatar, Popover, MenuProps } from "antd";
import style from "../home/styles/app.module.css";
import { useContext } from "react";
import {AppContext} from '../login/component/appContext'

// interface LoginContextValue {
//   value: any; // 假设 value 是一个字符串，您可以根据实际情况调整类型
//   // 其他可能的属性
// }
const { Header, Content, Footer, Sider } = Layout;

const content = (Uname: any) => (
 
  <div>
    <p>用户: </p>
    <p>退出登录</p>
  </div>
);
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const shouldShowBrand1 = true; // 设置条件，根据实际情况设置为 true 或 false
let brandIndexToShow = 0; 
 // 根据条件计算要显示的子导航项的索引

// const brandItems = [
//   getItem(<Link to="/brand/brand">OLAY</Link>, "3"),
//   getItem(<Link to="/brand/brand1">丰添</Link>, "4"),
//   getItem(<Link to="/brand/brand2">PMPM</Link>, "5"),
// ];

// const items: MenuItem[] = [

//   getItem(<Link to="dashboard">首页</Link>, "1", <PieChartTwoTone />),
//   getItem(<Link to="option2">笔记优化</Link>, "2", <FundTwoTone />),
//   getItem("品牌", "sub1", <EditTwoTone />, brandItems.slice(brandIndexToShow, brandIndexToShow + 1)),
//   getItem(<Link to="upload">上传文件</Link>, "9", <DiffTwoTone />),
// ];

const App: React.FC = () => {


  const [collapsed, setCollapsed] = useState(false);
  const appConetxt = useContext(AppContext);
  const [state, setState] = useState(appConetxt.state);
  let items: MenuItem[] = [];

  if (state.userName === "FOO") {
    items = [
      getItem(<Link to="dashboard">首页</Link>, "1", <PieChartTwoTone />),
      getItem(<Link to="option2">笔记优化</Link>, "2", <FundTwoTone />),
      getItem("品牌", "sub1", <EditTwoTone />, [
        getItem(<Link to="/brand/brand">OLAY</Link>, "3"),
        getItem(<Link to="/brand/brand1">丰添</Link>, "4"),
        getItem(<Link to="/brand/brand2">好人家</Link>, "5"),
      ]),
      getItem(<Link to="upload">上传文件</Link>, "9", <DiffTwoTone />),
    ];
  } else if (state.userName === "Olay") {
    items = [
      getItem(<Link to="dashboard">首页</Link>, "1", <PieChartTwoTone />),
      getItem(<Link to="option2">笔记优化</Link>, "2", <FundTwoTone />),
      getItem("品牌", "sub1", <EditTwoTone />, [
      getItem(<Link to="/brand/brand">OLAY</Link>, "3"),
      ]),
      getItem(<Link to="upload">上传文件</Link>, "9", <DiffTwoTone />),
    ];
  } else if (state.userName === "好人家"){
    items = [
      getItem(<Link to="dashboard">首页</Link>, "1", <PieChartTwoTone />),
      getItem(<Link to="option2">笔记优化</Link>, "2", <FundTwoTone />),
      getItem("品牌", "sub1", <EditTwoTone />, [
        getItem(<Link to="/brand/brand">好人家</Link>, "5"),
        ]),
      getItem(<Link to="upload">上传文件</Link>, "9", <DiffTwoTone />),
    
    ];
  }else{
    items = [
      getItem(<Link to="dashboard">首页</Link>, "1", <PieChartTwoTone />),
      getItem(<Link to="option2">笔记优化</Link>, "2", <FundTwoTone />),
      getItem(<Link to="upload">上传文件</Link>, "9", <DiffTwoTone />),
    ]
  }
  

  return (
 
    <Layout>
      <AppContext.Provider value={{state, setState}}>
      <Header className={style.headerStyle}>
        <img src={logo} alt="Logo" className={style.logoStyle} />

         <div className={style.divContainer}>
         <Popover 
         placement="topRight"content={
          <div>
            {/* <Avatar size={50} src={FooHeadImg} /> */}
            <p style={{ marginBottom: 20 }}>     用户名: {state.userName}</p>
          </div>
         
        }
         title="上海居宸企业管理有限公司" 
        
         >

            <Avatar size={40} src={FooHeadImg}> 
           
            
         
            </Avatar>
           
            <span className={style.userName}>
            {state.userName}
            </span>
            </Popover>

          {/* <Popover placement="topRight" content={`用户名: ${state.userName}`} title="上海居宸企业管理有限公司" >
            <a href="#">
              <Avatar size={44} src={FooHeadImg} alt="avatar" />
            </a>
          </Popover> */}
        </div> 
       
    
      </Header>

      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light" style={{ background: "#FFFFFF" }} >
          {/* <div className="demo-logo-vertical" /> */}
          <Menu
            theme="light"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>

        <Layout>
          <Content style={{ margin: "0 16px" }}>
            <Link to="option1"></Link>
            <Link to="option2"></Link>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
      </Layout>
      </AppContext.Provider>
    </Layout>

  );
};

export default App;
