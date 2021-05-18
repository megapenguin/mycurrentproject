import React, { useState } from "react";
import { Form, Input, Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

function AddInstructionModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);

  const [filename, setFilename] = useState("Choose file");
  const [uploadedImagePath, setUploadedImagePath] = useState();
  const [addedData, setAddedData] = useState();

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
    props.afterClosing(addedData);
  };

  const onFinish = (values) => {
    console.log(values);
    values["userId"] = props.info.id;
    setConfirmLoading(true);
    setIfCanceled(false);
    setTimeout(() => {
      setIsModalVisible(false);
      setConfirmLoading(false);
    }, 2000);

    axios
      .post("/api/v1/titles/add_title", values)
      .then((res) => {
        let data = res.data;
        setAddedData(data);
        Modal.success({
          content: "Successfully added title instruction",
          okButtonProps: {},
        });
      })
      .catch((error) => console.log(error));
  };

  const onFinishFailed = (errorInfo) => {
    Modal.error({
      content: "Failure to Add New Driver",
      okButtonProps: {
        style: { borderRadius: "50px" },
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
      <Button
        style={{
          background: "dimgray",
          color: "white",
          fontWeight: "bold",
          borderRadius: "25px",
        }}
        onClick={showModal}
      >
        <span className="desktop-view">
          <PlusOutlined /> Add Instruction
        </span>
        <span className="mobile-view">
          <PlusOutlined />
        </span>
      </Button>

      <Modal
        style={{ fontWeight: "bold" }}
        title="Add Intsruction"
        visible={isModalVisible}
        confirmLoading={confirmLoading}
        onOk={onFinish}
        onCancel={handleCancel}
        afterClose={handleClose}
        destroyOnClose={true}
        footer={[
          <Button
            type="danger"
            style={{
              borderRadius: "25px",
            }}
            key="back"
            className="modal-button"
            onClick={handleCancel}
          >
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
            style={{
              background: "dimgray",
              color: "white",
              borderRadius: "25px",
            }}
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
            style={{ fontWeight: "bold" }}
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input title!" }]}
          >
            <Input placeholder="Instruction Title" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddInstructionModal;
