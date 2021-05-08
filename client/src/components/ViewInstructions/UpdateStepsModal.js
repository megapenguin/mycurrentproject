import React, { useState, useEffect } from "react";
import { Form, Input, Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

function UpdateStepsModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);

  const [filename, setFilename] = useState("Choose file");
  const [uploadedImagePath, setUploadedImagePath] = useState();

  const [form] = Form.useForm();

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
    form.setFieldsValue({
      id: props.stepInfo.id,
      titleId: props.stepInfo.titleId,
      stepNumber: props.stepInfo.stepNumber,
      stepInstruction: props.stepInfo.stepInstruction,
    });
    setIsModalVisible(true);
    //console.log(props.info);
  };

  const handleCancel = () => {
    setIfCanceled(true);
    setIsModalVisible(false);
  };

  const handleClose = () => {
    props.afterClosing();
  };

  const onFinish = (values) => {
    console.log(values);
    setConfirmLoading(true);
    setIfCanceled(false);
    setTimeout(() => {
      setIsModalVisible(false);
      setConfirmLoading(false);
    }, 2000);

    axios
      .post("/api/v1/instructions/update_instruction", values)
      .then((res) => {
        Modal.success({
          content: "Successfully updated instruction",
          okButtonProps: {},
        });
      })
      .catch((error) => console.log(error));
  };

  const onFinishFailed = (errorInfo) => {
    Modal.error({
      content: "Failure to update instruction",
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
        style={{ background: "dimgray", color: "white" }}
        className="modal-button-add"
        onClick={showModal}
      >
        <span className="desktop-view">
          <PlusOutlined /> Update
        </span>
        <span className="mobile-view">
          <PlusOutlined />
        </span>
      </Button>

      <Modal
        title="Edit Instructions"
        visible={isModalVisible}
        confirmLoading={confirmLoading}
        onOk={onFinish}
        onCancel={handleCancel}
        afterClose={handleClose}
        destroyOnClose={true}
        footer={[
          <Button key="back" className="modal-button" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            form="myForm"
            key="submit"
            htmlType="submit"
            className="modal-button"
            loading={confirmLoading}
            onClick={onFinish}
            style={{ background: "dimgray", color: "white" }}
          >
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
          id="myForm"
        >
          <Form.Item label="Id:" name="id" hidden="true"></Form.Item>
          <Form.Item
            label="Title Id: "
            name="titleId"
            hidden="true"
          ></Form.Item>
          <Form.Item label="Step Number:" name="stepNumber">
            <Input disabled={true} bordered={false} />
          </Form.Item>
          <Form.Item
            label="Instruction"
            name="stepInstruction"
            rules={[{ required: true, message: "Please input title!" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UpdateStepsModal;