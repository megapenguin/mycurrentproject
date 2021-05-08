import React, { useState, useEffect } from "react";
import { Form, Input, Modal, Button, Upload, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

function AddStepsModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);

  const [filename, setFilename] = useState("Choose file");
  const [uploadedImagePath, setUploadedImagePath] = useState();
  const [lastStep, setLastStep] = useState("0");

  useEffect(() => {
    if (props.stepInfo === null) {
      setLastStep("0");
    } else {
      props.stepInfo.map((d) => {
        return setLastStep(d.stepNumber), console.log(lastStep);
      });
    }
  }, [isModalVisible]);

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
    props.afterClosing();
  };

  const onFinish = (values) => {
    console.log(values);

    values["titleId"] = props.info.id;
    values["stepNumber"] = lastStep + 1;
    setConfirmLoading(true);
    setIfCanceled(false);
    setTimeout(() => {
      setIsModalVisible(false);
      setConfirmLoading(false);
    }, 2000);

    axios
      .post("/api/v1/instructions/add_instruction", values)
      .then((res) => {
        Modal.success({
          content: "Successfully added instruction",
          okButtonProps: {},
        });
      })
      .catch((error) => console.log(error));
  };

  const onFinishFailed = (errorInfo) => {
    Modal.error({
      content: "Failure to add instruction",
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
          <PlusOutlined /> Add Steps
        </span>
        <span className="mobile-view">
          <PlusOutlined />
        </span>
      </Button>

      <Modal
        title="Write Instructions"
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
            label="Instruction"
            name="stepInstruction"
            rules={[{ required: true, message: "Please input title!" }]}
          >
            <Input.TextArea placeholder="Write instruction here..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddStepsModal;
