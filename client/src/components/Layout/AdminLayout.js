import React from "react";
import { Layout, Menu, Button } from "antd";
import {
  SnippetsOutlined,
  UserOutlined,
  CarOutlined,
  LogoutOutlined,
  HomeOutlined,
  FundViewOutlined,
} from "@ant-design/icons";
import Imaged from "../../views/Imaged";
import { Link } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";

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
        <Menu
          className="sidebar"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
        >
          <Imaged />

          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>

          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/driver-list"> Driver List</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<CarOutlined />} title="Jeepneys">
            <Menu.Item key="3">
              <Link to="/jeepney-list"> Jeepney List</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/assigned-driver">Assign Drivers</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="5" icon={<SnippetsOutlined />}>
            <Link to="/barangay-list"> Barangay List</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<UserOutlined />}>
            <Link to="/users-list"> Users List</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<FundViewOutlined />}>
            <Link to="/funfacts-list"> Fun Facts List</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{
            padding: 0,
            textAlign: "center",
            backgroundColor: "rgb(2, 19, 46)",
          }}
        >
          <h1 style={{ color: "white", backgroundColor: "#001529" }}>
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
