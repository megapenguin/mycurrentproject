import React, { useState, useContext } from "react";
import { Form, Input, Button, Checkbox, Card, Row, Col } from "antd";

import { withRouter } from "react-router-dom";
import { AuthContext } from ".././components/GlobalContext/AuthContext";
import Imaged from "./Imaged";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Login({ history }) {
  let Auth = useContext(AuthContext);

  const onFinish = async (values) => {
    console.log("Success:", values);

    console.log(values);
    let { success, errorMessage } = await Auth.authenticate(values);
    console.log(success);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className = "loginCard">
       <Row type="flex" justify="center" align="middle" style={{minHeight: '80vh'}}>
        <Col>
        
          <Card title="Retrack ADMIN" className="loginCardStyle"
          >
            
            <cardBody>
            <Imaged/>
              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    { required: true, message: "Please input your Email!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                  
                </Form.Item>
                <a  style={{ float: 'right' }} href="/register">Need Account?</a>
                

                {/* <Form.Item
                  {...tailLayout}
                  name="remember"
                  valuePropName="checked"
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" shape="round"  className="form-button">
                      LOGIN
                    </Button>
                     
                  </Form.Item>
              </Form>
             
            </cardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(Login);
