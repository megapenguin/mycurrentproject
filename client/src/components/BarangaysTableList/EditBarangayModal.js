import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input } from "antd";
import axios from "axios";
import { EditOutlined  } from "@ant-design/icons";

function EditBarangayModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);
  const [ifChanged, setIfChanged] = useState();
  const [barangays, setBarangays] = useState([]);

  const showModal = () => {
    form.setFieldsValue({
      id: props.info.id,
      barangayName: props.info.barangayName,
      location: props.info.location,
      barangayDescription: props.info.barangayDescription,
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
      .post("/api/v1/barangays/update_barangay", {
        id: values.id,
        barangayName: values.barangayName,
        location: values.location,
        barangayDescription: values.barangayDescription,
      })
      .then((res) => {
        setTimeout(() => {
          setIsModalVisible(false);
          setConfirmLoading(false);
        }, 2000);
        {
          ifChanged
            ? Modal.success({
                content: "Successfully Updated Barangay",
                okButtonProps: {
                  style: {borderRadius: '50px'}
                },
              })
            : Modal.success({
                content: "Barangay Info is up to date",
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
      content: "Failure to Update Barangay Info",
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
        title="Update Barangay Info"
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
          <Form.Item label="Barangay ID:" name="id">
            <Input disabled={true} bordered={false} />
          </Form.Item>
          <Form.Item
            label="Barangay Name:"
            name="barangayName"
            rules={[
              { required: true, message: "Please input the Barangay's Name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Location:"
            name="location"
            rules={[
              { required: true, message: "Please input Barangay's Location!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Barangay Description:"
            name="barangayDescription"
            
            rules={[
              {
                required: true,
                message: "Please input the Barangay's Description!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EditBarangayModal;
