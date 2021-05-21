import React, { useState, useEffect } from "react";
import { Form, Input, Modal, Button, Upload, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

function AddStepsModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);

  const [filename, setFilename] = useState("Choose file");
  const [lastStep, setLastStep] = useState("0");
  const [addedStep, setAddedStep] = useState();

  useEffect(() => {}, [isModalVisible]);

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
    props.afterClosing(addedStep);
  };

  const onFinish = (values) => {
    console.log(props.stepInfo);
    if (props.stepInfo.length == 0) {
      setLastStep(0);
      console.log("no step");
    } else {
      props.stepInfo.map((d) => {
        return setLastStep(d.stepNumber), console.log(lastStep);
      });
      console.log("has step");
    }
    values["titleId"] = props.info;
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
        let data = res.data;
        setAddedStep(data);
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
        style={{
          background: "dimgray",
          color: "white",
          fontWeight: "bold",
          borderRadius: "25px",
          border: ".5px solid whitesmoke",
          boxShadow: "1px 5px whitesmoke",
          height: "40px",
        }}
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
        title="Add Step"
        visible={isModalVisible}
        confirmLoading={confirmLoading}
        onOk={onFinish}
        onCancel={handleCancel}
        afterClose={handleClose}
        destroyOnClose={true}
        footer={[
          <Button
            type="danger"
            style={{ borderRadius: "25px" }}
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
            label={`Step ${props.stepInfo.length + 1}`}
            name="stepInstruction"
            rules={[{ required: true, message: "Please input title!" }]}
          >
            <Input.TextArea
              style={{ height: "200px" }}
              placeholder="Write here..."
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddStepsModal;
