import { Row, Col, Card, Typography, Form, Input, Button } from "antd";

import axios from "axios";
import { withRouter } from "react-router-dom";

import Imaged from "./Imaged";

const { Title } = Typography;

function Register({ history }) {
  const onFinish = (values) => {
    values["status"] = "user";
    values["profilePicture"] = "";

    axios
      .post("/api/v1/users/register", values)
      .then((res) => {
        history.push("/");
      })
      .catch((error) => console.log(error));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("fail");
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="registerCard">
      <Row type="flex" justify="center">
        <Col>
          <Card
            title={<Title level={4}>O.I.M.S</Title>}
            className="registerCardStyle"
          >
            <Form
              layout="vertical"
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <h3>
                <b>Account Registration</b>
              </h3>
              <Form.Item
                label="First Name:"
                name="firstName"
                rules={[
                  { required: true, message: "Please input your First Name!" },
                ]}
              >
                <Input placeholder="Firstname" />
              </Form.Item>

              <Form.Item
                label="Last Name:"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your Last Name!",
                  },
                ]}
              >
                <Input placeholder="Lastname" />
              </Form.Item>
              <Form.Item
                label="Email:"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password:"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password:"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  REGISTER
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(Register);
