import React, { useContext } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Modal,
  Divider,
} from "antd";
import { RobotFilled, LockFilled, UserOutlined } from "@ant-design/icons";

import { withRouter } from "react-router-dom";
import { AuthContext } from ".././components/GlobalContext/AuthContext";
import Imaged from "./Imaged";

const { Title } = Typography;

function Login({ history }) {
  let Auth = useContext(AuthContext);

  const onFinish = async (values) => {
    let { success, errorMessage } = await Auth.authenticate(values);
    {
      success
        ? Modal.success({
            content: "Successfully Log in!",
          })
        : Modal.error({
            content: "Email or Password is incorrect!",
          });
    }
    history.push("/instructions");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="loginCard">
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "80vh" }}
      >
        <Col>
          <Card
            title={
              <Title style={{ color: "dimgray", fontWeight: "bold" }} level={1}>
                O.I.M.S
              </Title>
            }
            className="loginCardStyle"
          >
            <cardBody>
              <Imaged />
              <Form
                layout="vertical"
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  style={{
                    fontWeight: "bold",
                  }}
                  label="Email Address"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    { required: true, message: "Please input your Email!" },
                  ]}
                >
                  <Row>
                    <Col flex="auto">
                      <Input
                        prefix={
                          <UserOutlined
                            className="site-form-item-icon"
                            style={{ padding: 5 }}
                          />
                        }
                        style={{
                          padding: 10,
                        }}
                        placeholder="Email"
                      />
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item
                  style={{ fontWeight: "bold", color: "dimgrey" }}
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Row>
                    <Col flex="auto">
                      <Input.Password
                        prefix={
                          <LockFilled
                            className="site-form-item-icon"
                            style={{ padding: 5 }}
                          />
                        }
                        style={{
                          padding: 10,
                        }}
                        placeholder="Password"
                      />
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item>
                  <a
                    style={{ color: "dimgray", float: "right" }}
                    href="/register"
                  >
                    Create an Account?
                  </a>
                </Form.Item>
                <Row>
                  <Col flex="auto">
                    <Button
                      style={{
                        background: "dimgray",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "25px",
                        border: ".5px solid whitesmoke",
                        boxShadow: "1px 5px whitesmoke",
                        height: "50px",
                      }}
                      htmlType="submit"
                      block
                    >
                      LOGIN
                    </Button>
                  </Col>
                </Row>
              </Form>
            </cardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(Login);
