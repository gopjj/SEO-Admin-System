import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import logo from "../component/images/logo.png";

const { Header, Content, Footer, Sider } = Layout;

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

const items: MenuItem[] = [
  getItem(<Link to="dashboard">首页</Link>, "1", <PieChartOutlined />),
  getItem(<Link to="option2">报表</Link>, "2", <DesktopOutlined />),
  getItem("品牌", "sub1", <UserOutlined />, [
    getItem("OLAY", "3"),
    getItem("丰添", "4"),
    getItem("PMPM", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem(<Link to="upload">上传文件</Link>, "9", <FileOutlined />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{ display: "flex", alignItems: "center", background: "white" }}
      >
        <img src={logo} alt="Logo" style={{ height: 32, margin: -20 }} />
      </Header>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
          style={{ background: "#FFFFFF" }} // 修改为您想要的背景色
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            // style={{ width: 200}}
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
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
