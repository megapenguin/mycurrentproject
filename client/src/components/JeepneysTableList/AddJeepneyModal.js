import React, { useState, useEffect } from "react";
import { Form, Input, Menu, Modal, Button, Upload, Select } from "antd";
import { UploadOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";


function AddJeepneyModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);
  const [jeepneys, setJeepneys] = useState([]);
  const [file, setFile] = useState({});
  const [filename, setFilename] = useState("Choose file");
  const [uploadedImagePath, setUploadedImagePath] = useState();
  const [barangays, setBarangays] = useState([]);

  
  
  const showModal = () => {
    setIsModalVisible(true);
    console.log(props.info);
  };

  useEffect(() => {
    axios
      .get("/api/v1/barangays/search_all_barangays")
      .then((res) => {
        console.log(res);

        let data = res.data;
        setBarangays(data);
      })
      .catch((error) => console.log(error));
  }, []);
  const { Option } = Select;

  const checking = (file) => {
    setFilename(file);
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
    // setUploadedImagePath(filename.file.response.filePath);
    axios
    .post("/api/v1/jeepneys/add_jeep", values)
    .then((res) => {
      let jeepneysCopy = [...jeepneys];
      jeepneysCopy = [...jeepneysCopy, res.data];
      console.log(jeepneysCopy);
      setJeepneys(jeepneysCopy);
      // console.log(filename.file.response);
      Modal.success({
        content: 'Successfully Added New Jeepney',
      });
      
      axios
        .post("/api/v1/images/save_image", {
          imageOwnerId: res.data.id,
          imageReferenceId: 3,
          imagePath: uploadedImagePath,
        }) 
      })
      .catch((error) => console.log(error));
  };


  const onFinishFailed = (errorInfo) => {
    Modal.error({
      content: 'Failure to Add New Jeepney',
    });
    setTimeout(() => {
      setIsModalVisible(true);
      setConfirmLoading(false);
    }, 2000);
    console.log("fail");
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add Jeepney
      </Button>
     
      <Modal
        title="Add Jeepney:"
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
          label="Barangay Id"
          name="barangayId"
          rules={[{ required: true, message: "Please input Barangay Id!" }]}
        >
          {/* <Select defaultValue="Select Barangay">
          {barangays.map((barangays, index) => (
            <Option key= {index} value={barangays.barangayName}>{barangays.barangayName}</Option>
          ))}
          </Select> */}
          <Input />
      </Form.Item>

        <Form.Item
          label="Plate Number"
          name="plateNumber"
          rules={[{ required: true, message: "Please input the Plate Number!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Jeep Capacity"
          name="jeepCapacity"
          rules={[{ required: true, message: "Please input the Jeep Capacity!" }]}
        >
          <Input />
        </Form.Item>
        <Upload
              action="/api/v1/images/add_image"
              listType="picture"
              maxCount={1}
              file={file}
              onChange={checking}
            >
          <Button icon={<UploadOutlined />}>Upload Image (Max: 1)</Button>
        </Upload>
        </Form>
      </Modal>
      
    </div>
  );
}

export default AddJeepneyModal;
