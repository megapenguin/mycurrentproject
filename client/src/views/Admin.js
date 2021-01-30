import React, { Suspense, useState, useEffect } from "react";
import "../App.css";
import JeepneyDasboard from "./JeepneyDasboard";
import UploadDashboard from "./UploadDashboard";
import DriversTableListContent from "./DriversTableListContent";
import BarangaysTableListContent from "./BarangaysTableListContent";
import JeepneysTableListContent from "./JeepneysTableListContent";

import { Layout, Menu, Button } from "antd";
import {
  UnorderedListOutlined,
  CarOutlined,
  UserOutlined,
  SyncOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import Imaged from "./Imaged";

const { Header, Content, Footer, Sider } = Layout;

function Admin() {
  const [selected, setSelected] = useState("");
  const clickSideBar = (selectedMenuItem) => {
    //console.log(selectedMenuItem);
    setSelected(selectedMenuItem);
  };

  const logout = () => {
    localStorage.clear();
  }

  return (
    <div>
      
      <Suspense fallback={<div className="icons-list"><SyncOutlined spin/></div>}>
      
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
              <Imaged/>
              <Menu.Item
                key="1"
                icon={<CarOutlined />}
                onClick={() => clickSideBar("1")}
              >
                Jeepneys
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<CarOutlined />}
                onClick={() => clickSideBar("2")}
              >
                Jeepney List
              </Menu.Item>
              <Menu.Item
                key="3"
                icon={<UserOutlined />}
                onClick={() => clickSideBar("3")}
              >
                Driver List
              </Menu.Item>
              <Menu.Item
                key="4"
                icon={<UnorderedListOutlined/>}
                onClick={() => clickSideBar("4")}
              >
                Barangay List
              </Menu.Item>
              <Menu.Item
                key="5"
                icon={<UserOutlined />}
                onClick={() => clickSideBar("5")}
              >
                Image Upload
              </Menu.Item>
            </Menu>
          </Sider>
          
          <Layout>
          
            <Header
              className="site-layout-sub-header-background"
              style={{ padding: 0, textAlign: "center" }}
            >
              <h1 style={{ color: "white" }}>Retrack Admin
              <Button onClick={logout} href="/login" type="danger" icon={<LogoutOutlined />} style={{ borderRadius: "10%" ,margin: "10px" ,float: "right", textAlign: "center" }}></Button>
              </h1>
            </Header>
            
            <Content style={{ margin: "24px 16px 0" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 500 }}
              >
                {(() => {
                  switch (selected) {
                    case "1":
                      return <JeepneyDasboard />;
                    case "2":
                        return <JeepneysTableListContent />;
                    case "3":
                      return <DriversTableListContent />;
                    case "4":
                      return <BarangaysTableListContent />;
                    case "5":
                      return <UploadDashboard />;
                    case "":
                      return "Welcome";
                  }
                })()}
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design �2018 Created by Ant UED
            </Footer>
            
          </Layout>
          
        </Layout>
        ,
      </Suspense>
    </div>
  );
}

export default Admin;
