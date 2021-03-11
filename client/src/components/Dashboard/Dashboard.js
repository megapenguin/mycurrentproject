import React, { useEffect, useState } from "react";
import { Divider, Row, Typography, Col, Card, Space } from "antd";
import { SnippetsOutlined,
  UserOutlined,
  CarOutlined,
  LogoutOutlined,
  HomeOutlined,
  FundViewOutlined, } from "@ant-design/icons";
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
      <Row>
        <Col span={6}>
          <Card
              style={{ width: "auto" }}
              cover={
                <SnippetsOutlined style={{ fontSize: '80px'}} />
              }
            >
             <Title level={5}>No. of Barangays: {barangays.length} </Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card
              style={{ width:  "auto" }}
              cover={
                <UserOutlined style={{ fontSize: '80px'}} />
              }
            >
             <Title level={5}>No. of Drivers: {drivers.length} </Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card
              style={{ width:  "auto" }}
              cover={
                <CarOutlined style={{ fontSize: '80px'}} />
              }
            >
             <Title level={5}>No. of Jeepneys: {jeepneys.length} </Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card
              style={{ width:  "auto" }}
              cover={
                <UserOutlined style={{ fontSize: '80px'}} />
              }
            >
             <Title level={5}>No. of Users: {users.length} </Title>
          </Card>
        </Col>
      </Row>
      <Divider>
        <Title level={4}>Welcome</Title>
      </Divider>
    </div>
  );
}

export default Dashboard;
