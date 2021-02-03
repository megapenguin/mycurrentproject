import React, { useState } from "react";
import {
  Modal,
  Upload,
  Button,
  Space,
  Row,
  Col,
  Image,
  Form,
  Radio,
  Input,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

function AddBarangayImageModal(props) {
  const [file, setFile] = useState({});
  const [imageStatus, setImageStatus] = useState(false);
  const [filename, setFilename] = useState("Choose file");
  const [uploadedImagePath, setUploadedImagePath] = useState("");
  const [fetchImage, setFetchImage] = useState("");
  const [images, setImages] = useState([]);
  const [info, setInfo] = useState([]);
  const [ifCanceled, setIfCanceled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    form.setFieldsValue({
      imageOwnerId: props.info.id,
      imageReferenceId: 1,
    });
    setIsModalVisible(true);
    console.log(props.info);
  };

  const checking = (file) => {
    setFilename(file);
    setImageStatus(true);
  };
  const viewFile = () => {
    setUploadedImagePath(filename.file.response.filePath);
    console.log(filename.file);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIfCanceled(true);

    setTimeout(() => {
      setIsModalVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleClose = () => {
    setConfirmLoading(true);
    setIfCanceled(false);
  };

  const onFinish = (value) => {};

  const onFinishFailed = (errorInfo) => {
    console.log("fail");
    console.log("Failed:", errorInfo);
  };

  const removeImage = (val) => {
    // console.log("Remove image", val);
    axios
      .delete("/api/v1/images/delete_folder_image", {
        params: {
          filePath: val.response.filePath,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
    setUploadedImagePath("");
  };
  const act = () => {
    console.log("Uploaded");
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add Images
      </Button>
      <Modal
        title="Barangay Image Upload"
        confirmLoading={confirmLoading}
        visible={isModalVisible}
        onOk={onFinish}
        onCancel={handleCancel}
        afterClose={handleClose}
        destroyOnClose={true}
        footer={[
          <Button key="back" type="danger" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <Row gutter={[16, 16]}>
          <Space style={{ width: "100%" }} size="large">
            <Upload
              action="/api/v1/images/add_image"
              listType="picture"
              onRemove={removeImage}
              maxCount={1}
              file={file}
              onChange={checking}
            >
              <Button icon={<UploadOutlined />}>Upload Image (Max: 1)</Button>
            </Upload>
          </Space>
        </Row>

        <Row gutter={[16, 16]}>
          <Image
            width={250}
            height={250}
            src={`/api/v1/images/${
              uploadedImagePath ? uploadedImagePath : "logo.png"
            }`}
            style={{ borderColor: "white", border: "10px" }}
          />
        </Row>
        <Row gutter={[16, 16]}>
          <Button onClick={viewFile}>Check Uploaded Image</Button>
        </Row>
        <Row>
          <Form
            name="basic"
            form={form}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item label="Image Owner ID" name="imageOwnerId">
              <p>
                <h3>{props.info.id}</h3>
              </p>
            </Form.Item>
            <Form.Item label="Image Reference" name="imageReferenceId">
              <p>
                <h3>Barangay</h3>
              </p>
            </Form.Item>

            <Form.Item>
              <Button onClick={onFinish} type="primary" htmlType="submit">
                {uploadedImagePath ? "Save Image" : "Choose an image"}
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Modal>
    </div>
  );
}

export default AddBarangayImageModal;
