import React, { useContext, useState } from "react";
import {
  Layout,
  Menu,
  Popover,
  Button,
  Typography,
  Image,
  Divider,
} from "antd";
import { UserOutlined, LogoutOutlined, HomeOutlined } from "@ant-design/icons";

import { Link, withRouter } from "react-router-dom";

import { AuthContext } from "../GlobalContext/AuthContext";

const { Header, Content, Footer, Sider } = Layout;

function AdminLayout({ children, history }) {
  const { Title } = Typography;
  let Auth = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState(Auth.state.userData);

  const text = (
    <span>
      <Title level={5}>
        {userInfo.firstName} {userInfo.lastName}
      </Title>
    </span>
  );
  const content = (
    <div>
      <p>
        <Link to="/instructions" style={{ color: "dimgray" }}>
          <HomeOutlined /> <Divider type="vertical" /> Home
        </Link>
      </p>
      <p>
        <Link to="/profile" style={{ color: "dimgray" }}>
          <UserOutlined /> <Divider type="vertical" /> Profile
        </Link>
      </p>
      <p onClick={() => logout()}>
        <Link to="/" style={{ color: "red", fontWeight: "bold" }}>
          <LogoutOutlined /> <Divider type="vertical" /> Log Out
        </Link>
      </p>
    </div>
  );
  const logout = () => {
    localStorage.clear();
    Auth.state.isAuthenticated = false;
    console.log(Auth);
  };
  return (
    <Layout>
      <Sider
        style={{
          backgroundColor: "dimgray",
          fontWeight: "bold",
        }}
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
        {/* <Imaged /> */}
        <Image
          preview={false}
          style={{
            padding: 10,
            borderColor: "black",
            borderRadius: "25px",
          }}
          src={`/api/v1/images/${
            Auth.state.userData.profilePicture == ""
              ? "logo.png"
              : Auth.state.userData.profilePicture
          }`}
        />
        <Menu
          className="sidebar"
          style={{ backgroundColor: "dimgray", paddingTop: 20 }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/instructions">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/profile">My Profile</Link>
          </Menu.Item>
          {/* <Menu.Item key="3" icon={<LogoutOutlined />} onClick={() => logout()}>
            <Link to="/">Log Out</Link>
          </Menu.Item> */}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            textAlign: "right",
            backgroundColor: "white",

            paddingTop: 20,
            paddingRight: 30,
          }}
        >
          <Title
            level={5}
            style={{
              color: "dimgray",
              backgroundColor: "white",
              paddingTop: 10,
            }}
          >
            {userInfo.email}
            {"   "}
            <Popover
              placement="bottomRight"
              title={text}
              content={content}
              trigger="click"
              style={{ color: "gainsboro", paddingRight: 20 }}
            >
              <Button
                type="link"
                shape="circle"
                style={{ background: "gainsboro", color: "dimgray" }}
              >
                <UserOutlined />
              </Button>
            </Popover>
          </Title>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 550 }}
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

export default withRouter(AdminLayout);
