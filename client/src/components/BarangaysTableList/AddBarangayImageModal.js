import React, { useState } from "react";
import { Modal, Upload, Button, Space, Row, List, Form, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { Content } from "antd/lib/layout/layout";

function AddBarangayImageModal(props) {
  const [file, setFile] = useState({});
  const [imageStatus, setImageStatus] = useState(false);
  const [filename, setFilename] = useState("Choose file");
  const [uploadedImagePath, setUploadedImagePath] = useState("");
  const [uploadImageStatus, setUploadImageStatus] = useState("none");
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
    setUploadedImagePath();
    setUploadImageStatus("removed");
    setFilename("Choose file");
    setIsModalVisible(true);
    console.log(props.info);
  };

  const checking = (file) => {
    setFilename(file);
  };
  const viewFile = () => {
    {
      (() => {
        switch (uploadImageStatus) {
          case "done":
            return (
              setUploadedImagePath(filename.file.response.filePath),
              console.log("done")
            );

          case "removed":
            return console.log("removed");

          case "":
            return console.log("none");
        }
      })();
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIfCanceled(true);

    setTimeout(() => {
      setIsModalVisible(false);
      setConfirmLoading(false);
    }, 500);
  };

  const handleClose = () => {
    setConfirmLoading(true);
    setIfCanceled(false);
  };

  const onFinish = (values) => {
    if (uploadImageStatus == "done") {
      axios
        .post("/api/v1/images/save_image", {
          imageOwnerId: props.info.id,
          imageReferenceId: 1,
          imagePath: uploadedImagePath,
        })
        .then((res) => {
          message.success("Successfully Saved");
          setTimeout(() => {
            setIsModalVisible(false);
            setConfirmLoading(false);
          }, 500);
          setUploadedImagePath("");
        })
        .catch((error) => console.log(error));
    } else {
      message.error("Image Saving Error");
      // console.log("Uploaded image is removed");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("fail");
    console.log("Failed:", errorInfo);
  };

  const removeImage = (val) => {
    //console.log("Removed image", val.response.filePath);
    axios
      .delete("/api/v1/images/delete_folder_image", {
        params: {
          fileName: val.response.imagePath,
          fileId: val.response.id,
        },
      })
      .then((res) => {
        setUploadImageStatus("removed");
        // console.log(res.data);
      })
      .catch((error) => console.log(error));
    setUploadedImagePath();
    message.error(`File removed Successfully.`);
  };

  const uploadFile = {
    name: "file",
    action: "/api/v1/images/add_image",
    headers: {
      authorization: "authorization-text",
    },
    data: { imageOwnerId: props.info.id, imageReferenceId: 1 },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log("uploading", info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded Successfully.`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload Failed.`);
      }
      setUploadImageStatus(info.file.status);
      setFilename(info);
    },
  };

  return (
    <div>
      <Button type="primary" className="modal-button-upload" onClick={showModal}>
        <span className="desktop-view">
          <UploadOutlined /> Upload
        </span>
        <span className="mobile-view">
          <UploadOutlined />
        </span>
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
          <Button
            key="back"
            className="modal-button"
            type="danger"
            onClick={handleCancel}
          >
            Close
          </Button>,
        ]}
      >
        <List itemLayout="vertical">
          <List.Item>
            <h4>Image Barangay ID: </h4>
            {props.info.id}
          </List.Item>
          <List.Item>
            <h4>Image Barangay Name: </h4>
            {props.info.barangayName}
          </List.Item>
          <List.Item>
            <h4>Image Reference Name: </h4>
            Barangay
          </List.Item>
        </List>
        <Row>
          <Space style={{ width: "100%" }} size="large">
            <Upload
              {...uploadFile}
              onRemove={removeImage}
              listType="picture-card"
              showUploadList={{ showPreviewIcon: false }}
              maxCount={5}
            >
              <Space>
                <UploadOutlined />
                Upload
              </Space>
            </Upload>
          </Space>
        </Row>
        {/* <Row>
          <Form
            name="basic"
            form={form}
            layout={"horizontal"}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item label="Image Owner ID: " name="imageOwnerId">
               {props.info.id}
            </Form.Item>
            <Form.Item label="Image Reference: " name="imageReferenceId">
               Barangay
            </Form.Item>
          </Form>
        </Row> */}
      </Modal>
    </div>
  );
}

export default AddBarangayImageModal;
