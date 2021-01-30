import React, { useState} from "react";
import { Form, Input, Modal, Button, Upload, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";


function AddDriverModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [file, setFile] = useState({});
  const [filename, setFilename] = useState("Choose file");
  const [uploadedImagePath, setUploadedImagePath] = useState();
  
  

  const checking = (file) => {
    setFilename(file);
    console.log(filename);
  };
  const unchecking = () => {
    setFilename("Choose file");
    console.log(filename);
  };
  const viewFile = () => {
    if (filename == "Choose file") {
      console.log("No image selected");
    } else {
      setUploadedImagePath(filename.file.response.filePath);
      console.log(filename.file.response);
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
    console.log(props.info);
    
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
        let driversCopy = [...drivers];
        driversCopy = [...driversCopy, res.data];
        console.log(driversCopy);
        setDrivers(driversCopy);
        setFilename(file);
            Modal.success({
              content: 'Successfully Added New Driver',
            })
            setUploadedImagePath(filename.file.response.filePath);
          console.log(uploadedImagePath);
      axios
        .post("/api/v1/images/save_image", {
          imageOwnerId: res.data.id,
          imageReferenceId: 1,
          imagePath: uploadedImagePath,
        }) 
        
      })
      .catch((error) => console.log(error));
  };


  const onFinishFailed = (errorInfo) => {
    Modal.error({
      content: 'Failure to Add New Driver',
    });
    setTimeout(() => {
      setIsModalVisible(true);
      setConfirmLoading(false);
    }, 2000);
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add Driver
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
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button form="myForm" key="submit" htmlType="submit" type="primary" loading={confirmLoading} onClick={onFinish}>
          Add
        </Button>
          ]}
      >
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            id="myForm"
        >
     
         
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your Firstname!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Middle Name"
          name="middleName"
          rules={[
            { required: true, message: "Please input your Middlename!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your Lastname!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your Address!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contact Number"
          name="contactNumber"
          rules= {[{ required: true, message: "Please input your Contact Number!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Generate Password"
          name="generatePassword"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email", message: "Please input your Email!" }]}
        >
          <Input />
        </Form.Item>
        <Upload
              action="/api/v1/images/add_image"
              listType="picture"
              maxCount={1}
              file={file}
              onChange = {checking} 
              onRemove={unchecking}
            >
            <Button>Choose Image (Max: 1)</Button>
        </Upload>
            <Space>
              <Button onClick={viewFile} icon={<UploadOutlined />}>Upload</Button>
            </Space>
        
        </Form>
        
      </Modal>
      
    </div>
  );
}

export default AddDriverModal;
