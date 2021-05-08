import React, { useContext } from "react";
import { Form, Input, Button, Card, Row, Col, Typography, Modal } from "antd";
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
              <Title style={{ color: "dimgray" }} level={2}>
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
                  label="Email:"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    { required: true, message: "Please input your Email!" },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                  label="Password:"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                  <a
                    style={{ color: "dimgray", float: "right" }}
                    href="/register"
                  >
                    Create an Account?
                  </a>
                </Form.Item>
                <Button
                  style={{ background: "dimgray", color: "white" }}
                  htmlType="submit"
                >
                  LOGIN
                </Button>
              </Form>
            </cardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(Login);
