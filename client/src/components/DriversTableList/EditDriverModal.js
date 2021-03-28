import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input } from "antd";
import axios from "axios";
import { EditOutlined  } from "@ant-design/icons";

function EditDriverModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);
  const [ifChanged, setIfChanged] = useState();

  const showModal = () => {
    form.setFieldsValue({
      id: props.info.id,
      firstName: props.info.firstName,
      middleName: props.info.middleName,
      lastName: props.info.lastName,
      address: props.info.address,
      contactNumber: props.info.contactNumber,
      email: props.info.email,
    });
    setIsModalVisible(true);
    setIfChanged(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIfCanceled(true);
    setIsModalVisible(false);
  };
  const handleClose = () => {
    if (ifCanceled) {
    } else {
      props.afterClosing();
    }
  };

  const onFinish = (values) => {
    //console.log(ifChanged);
    setConfirmLoading(true);
    setIfCanceled(false);
    props.passedData(props.info);

    axios
      .post("/api/v1/drivers/update_driver", {
        id: values.id,
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        address: values.address,
        contactNumber: values.contactNumber,
        email: values.email,
      })
      .then((res) => {
        setTimeout(() => {
          setIsModalVisible(false);
          setConfirmLoading(false);
        }, 2000);
        {
          ifChanged
            ? Modal.success({
                content: "Successfully Updated Driver Info",
                okButtonProps: {
                  style: {borderRadius: '50px'}
                },
              })
            : Modal.success({
                content: "Driver Info is up to date",
                okButtonProps: {
                  style: {borderRadius: '50px'}
                },
              });
        }
      })
      .catch((error) => console.log(error));

    //console.log(ifChanged);
  };

  const onFinishFailed = (errorInfo) => {
    Modal.error({
      content: "Failure to Update Driver Info",
      okButtonProps: {
        style: {borderRadius: '50px'}
      },
    });
    setTimeout(() => {
      setIsModalVisible(true);
      setConfirmLoading(false);
    }, 2000);
    // console.log("Failed:", errorInfo);
  };
  const onValuesChange = (changedValues, allValues) => {
    //console.log("Changed", allValues, changedValues);
    setIfChanged(true);
  };

  return (
    <div>
      <Button type="primary" className="modal-button-edit" onClick={showModal}>
        <span className="desktop-view"><EditOutlined /> Edit</span>
        <span className="mobile-view"><EditOutlined /></span>
      </Button>
      <Modal
        title="Update Driver Info"
        confirmLoading={confirmLoading}
        visible={isModalVisible}
        onOk={onFinish}
        onCancel={handleCancel}
        afterClose={handleClose}
        destroyOnClose={true}
        footer={[
          <Button key="back" className="modal-button" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button form="myForm" className="modal-button" htmlType="submit" type="primary">
            Update
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          name="basic"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
          id="myForm"
        >
          <Form.Item label="Driver ID:" name="id">
            <Input disabled={true} bordered={false} />
          </Form.Item>
          <Form.Item
            label="Firstname:"
            name="firstName"
            rules={[
              { required: true, message: "Please input Firstname!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Middlename:"
            name="middleName"
            rules={[
              { required: true, message: "Please input Middlename!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Lastname:"
            name="lastName"
            rules={[
              { required: true, message: "Please input Lastname!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Contact:"
            name="contactNumber"
            rules={[
              { required: true, message: "Please input Contact Number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address:"
            name="address"
            rules={[
              { required: true, message: "Please input the Address!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email:"
            name="email"
            rules={[
              { required: true, message: "Please input Email!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EditDriverModal;
