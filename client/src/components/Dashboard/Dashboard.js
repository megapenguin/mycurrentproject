import React, { useEffect, useState } from "react";
import { Divider, Row, Typography } from "antd";
import axios from "axios";

function Dashboard() {
  const { Title } = Typography;
  const [barangays, setBarangays] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [jeepneys, setJeepneys] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/barangays/search_all_barangays").then((res) => {
      // console.log(res);

      let data = res.data;
      setBarangays(data);
    });

    axios.get("/api/v1/drivers/").then((res) => {
      // console.log(res);
      let data = res.data;
      setDrivers(data);
    });

    axios.get("/api/v1/jeepneys/").then((res) => {
      let data = res.data;
      data = data.map((d) => {
        if (d.barangay === null) {
          return { ...d, barangayName: "None Assigned" };
        } else {
          return { ...d, barangayName: d.barangay.barangayName };
        }
      });

      setJeepneys(data);
    });

    axios
      .get("/api/v1/users/")
      .then((res) => {
        // console.log(res);

        let data = res.data;
        setUsers(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <Divider>
        <Title level={4}>Dashboard</Title>
      </Divider>
      <Row>Total Barangays: {barangays.length}</Row>
      <Row>Total Drivers: {drivers.length}</Row>
      <Row>Total Jeepneys: {jeepneys.length}</Row>
      <Row>Total Users: {users.length}</Row>
      <Divider>
        <Title level={4}>Welcome</Title>
      </Divider>
    </div>
  );
}

export default Dashboard;
