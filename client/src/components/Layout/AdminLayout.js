import React, { useContext, useState } from "react";
import {
  Layout,
  Menu,
  Popover,
  Button,
  Typography,
  Dropdown,
  Image,
} from "antd";
import {
  SnippetsOutlined,
  UserOutlined,
  CarOutlined,
  LogoutOutlined,
  HomeOutlined,
  FundViewOutlined,
  DownOutlined,
} from "@ant-design/icons";
import Imaged from "../../views/Imaged";
import { Link } from "react-router-dom";

import { AuthContext } from "../GlobalContext/AuthContext";

const { Header, Content, Footer, Sider } = Layout;
const text = <span>Title</span>;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

function AdminLayout({ children }) {
  const { Title } = Typography;
  let Auth = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState(Auth.state.userData);

  const logout = () => {
    localStorage.clear();
  };
  return (
    <Layout>
      <Sider
        style={{ backgroundColor: "dimgray" }}
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
            borderColor: "black",
            border: "20px",
            marginTop: "15px",
          }}
          width={120}
          src={`/api/v1/images/${
            userInfo == null ? "logo.png" : userInfo.profilePicture
          }`}
        />
        <Menu
          style={{ backgroundColor: "dimgray" }}
          className="sidebar"
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
          <Menu.Item key="3" icon={<LogoutOutlined />} onClick={() => logout()}>
            <Link to="/">Log Out</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            textAlign: "right",
            backgroundColor: "white",
            height: "70px",
            paddingTop: 20,
            paddingRight: 30,
          }}
        >
          <Title
            level={5}
            style={{
              color: "black",
              backgroundColor: "white",
            }}
          >
            {userInfo.email}
            {"   "}
            <Popover
              placement="bottom"
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
