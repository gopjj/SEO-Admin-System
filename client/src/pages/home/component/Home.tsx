import { Avatar, Layout, Popover } from "antd";
import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import FooHeadImg from "../../../resource/pictures/FOOHEAD.jpg";
import logo from "../../../resource/pictures/logo.jpg";
import { AppContext } from "../../login/component/Appcontext";
import { Menu } from "../../menu/component/Menu";
import classNames from "../style/Home.module.css";

const { Header, Content, Footer, Sider } = Layout;

export const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const appConetxt = useContext(AppContext);
  const [state, setState] = useState(appConetxt.state);

  return (
    <Layout>
      <AppContext.Provider value={{ state, setState }}>
        <Header className={classNames.headerStyle}>
          <img src={logo} alt="Logo" className={classNames.logoStyle} />
          <Popover
            className={classNames.accountPopover}
            placement="topRight"
            title="Foo Digital"
            content={
              <span className={classNames.accountPopoverContent}>
                用户名: {state.userName}
              </span>
            }
          >
            <Avatar size={40} src={FooHeadImg}></Avatar>
          </Popover>
        </Header>
        <Layout>
          <Sider
            className={classNames.layoutSider}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            theme="light"
          >
            <Menu userName={state.userName} />
          </Sider>
          <Layout>
            <Content className={classNames.content}>
              <Outlet />
            </Content>
            <Footer className={classNames.footer}></Footer>
          </Layout>
        </Layout>
      </AppContext.Provider>
    </Layout>
  );
};
