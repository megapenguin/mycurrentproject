import React, { Suspense, useState, useEffect } from "react";
import "../App.css";
// import Dashboard from "./Dashboard"
// import JeepneyDasboard from "./JeepneyDasboard"
// import BarangayDashboard from "./BarangayDashboard"
// import UploadDashboard from "./UploadDashboard"
// import DriversTableListContent from "./DriversTableListContent"
// import BarangaysTableListContent from "./BarangaysTableListContent"

// import { Layout, Menu } from "antd"
// import {
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from "@ant-design/icons"
// import Imaged from "./Imaged"

// const { Header, Content, Footer, Sider } = Layout

function Admin() {
  const [selected, setSelected] = useState("");
  const clickSideBar = (selectedMenuItem) => {
    //console.log(selectedMenuItem);
    setSelected(selectedMenuItem);
  };

  function getContent(selected) {
    return <div></div>;
  }

  return (
    <div>
      <Suspense fallback={<h1>LOADING</h1>}>
        <h1>this is admin</h1>
      </Suspense>
    </div>
  );
}

export default Admin;
