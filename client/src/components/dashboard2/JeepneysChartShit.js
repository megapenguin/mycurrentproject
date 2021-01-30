import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
} from "antd";
import axios from "axios";
import { Content } from "antd/lib/layout/layout";

const { Title, Text } = Typography;

function JeepneysChartShit() {
  const [jeepneys, setJeepneys] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/jeepneys/search_all_jeepneys")
      .then((res) => {
        //console.log(res);

        let data = res.data;
        setJeepneys(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onFinish = (values) => {
    console.log(values);
    axios
      .post("/api/v1/jeepneys/add_jeep", values)
      .then((res) => {
        let jeepneysCopy = [...jeepneys];

        jeepneysCopy = [...jeepneysCopy, res.data];
        //console.log(jeepneysCopy);
        setJeepneys(jeepneysCopy);
      })
      .catch((error) => console.log(error));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("fail");
    console.log("Failed:", errorInfo);
  };

  const checking = () => {
    console.log("check");
  };

  const handleDelete = (id) => {
    axios
      .delete("/api/v1/jeepneys/delete_jeep", {
        params: {
          id,
        },
      })
      .then((res) => {
        let jeepneysCopy = [...jeepneys];

        jeepneysCopy = jeepneysCopy.filter((jeepney) => jeepney.id !== id);
        setJeepneys(jeepneysCopy);

        console.log(jeepneysCopy);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Row gutter={[16, 16]}>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Barangay ID"
          name="barangayId"
          rules={[{ required: true, message: "Please input the Barangay ID!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Plate Number"
          name="plateNumber"
          rules={[
            { required: true, message: "Please input jeepney's Plate Number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Jeep Capacity"
          name="jeepCapacity"
          rules={[
            { required: true, message: "Please input the Jeep's Capacity!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button onClick={() => checking()} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {jeepneys.map((jeepney, index) => (
        <Col key={index} md={{ span: 6 }}>
          <Card className="shadow-sm">
            <Title>{jeepney.driverId}</Title>
            <Content>{jeepney.plateNumber}</Content>
            <Content>{jeepney.jeepneyCapacity}</Content>
            <Button onClick={() => handleDelete(jeepney.id)} danger>
              Delete
            </Button>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default JeepneysChartShit;
