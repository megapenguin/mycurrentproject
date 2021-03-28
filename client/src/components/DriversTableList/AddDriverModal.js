import React, { useState } from "react";
import { Form, Input, Modal, Button, Upload, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

function AddDriverModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [file, setFile] = useState({});
  const [filename, setFilename] = useState("Choose file");
  const [uploadedImagePath, setUploadedImagePath] = useState();

  const checking = (file) => {
    setFilename(file);
    //console.log(filename);
  };
  const unchecking = () => {
    setFilename("Choose file");
    //console.log(filename);
  };
  const viewFile = () => {
    if (filename == "Choose file") {
      //console.log("No image selected");
    } else {
      setUploadedImagePath(filename.file.response.filePath);
      //console.log(filename.file.response);
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
    //console.log(props.info);
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
    console.log(values);
    props.passedData(props.info);
    setConfirmLoading(true);
    setIfCanceled(false);
    setTimeout(() => {
      setIsModalVisible(false);
      setConfirmLoading(false);
    }, 2000);

    axios
      .post("/api/v1/drivers/add_driver", values)
      .then((res) => {
        // let driversCopy = [...drivers];
        // driversCopy = [...driversCopy, res.data];
        // //console.log(driversCopy);
        // setDrivers(driversCopy);
        // setFilename(file);
        Modal.success({
          content: "Successfully Added New Driver",
          okButtonProps: {
            style: {borderRadius: '50px'}
          },
        });
        // setUploadedImagePath(filename.file.response.filePath);
        // //console.log(uploadedImagePath);
        // axios.post("/api/v1/images/save_image", {
        //   imageOwnerId: res.data.id,
        //   imageReferenceId: 1,
        //   imagePath: uploadedImagePath,
        // });
      })
      .catch((error) => console.log(error));
  };

  const onFinishFailed = (errorInfo) => {
    Modal.error({
      content: "Failure to Add New Driver",
      okButtonProps: {
        style: {borderRadius: '50px'}
      },
    });
    setTimeout(() => {
      setIsModalVisible(true);
      setConfirmLoading(false);
    }, 2000);
    //console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Button type="primary" className="modal-button-add" onClick={showModal}>
        <span className="desktop-view"><PlusOutlined /> Add Driver</span>
        <span className="mobile-view"><PlusOutlined /></span>
      </Button>

      <Modal
        title="Add Driver:"
        visible={isModalVisible}
        confirmLoading={confirmLoading}
        onOk={onFinish}
        onCancel={handleCancel}
        afterClose={handleClose}
        destroyOnClose={true}
        footer={[
          <Button key="back" className="modal-button"  onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            form="myForm"
            key="submit"
            htmlType="submit"
            type="primary"
            className="modal-button" 
            loading={confirmLoading}
            onClick={onFinish}
          >
            Add
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          id="myForm"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your Firstname!" },
            ]}
          >
            <Input placeholder="Firstname"/>
          </Form.Item>

          <Form.Item
            label="Middle Name"
            name="middleName"
            rules={[
              { required: true, message: "Please input your Middlename!" },
            ]}
          >
            <Input placeholder="Middlename"/>
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please input your Lastname!" }]}
          >
            <Input placeholder="Lastname"/>
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your Address!" }]}
          >
            <Input placeholder="Address"/>
          </Form.Item>

          <Form.Item
            label="Contact Number"
            name="contactNumber"
            rules={[
              { required: true, message: "Please input your Contact Number!" },
            ]}
          >
            <Input placeholder="Contact No."/>
          </Form.Item>

          <Form.Item
            label="Generate Password"
            name="generatePassword"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input type="password" placeholder="Password"/>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your Email!",
              },
            ]}
          >
            <Input placeholder="Email"/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddDriverModal;
