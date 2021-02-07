import React from "react";
import { Layout, Menu, Button } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  UnorderedListOutlined,
  CarOutlined,
  SyncOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import Imaged from "../../views/Imaged";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

function AdminLayout({ children }) {
  const logout = () => {
    localStorage.clear();
  };
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[""]}>
          <Imaged />
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>

          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/driver-list"> Driver List</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<CarOutlined />}>
            <Link to="/jeepney-list"> Jeepney List</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UploadOutlined />}>
            <Link to="/barangay-list"> Barangay List</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0, textAlign: "center" }}
        >
          <h1 style={{ color: "white" }}>
            Retrack Admin
            <Button
              onClick={logout}
              href="/login"
              type="danger"
              icon={<LogoutOutlined />}
              style={{
                borderRadius: "10%",
                margin: "10px",
                float: "right",
                textAlign: "center",
              }}
            ></Button>
          </h1>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 500 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design �2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
