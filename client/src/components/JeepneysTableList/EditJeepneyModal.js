import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Select } from "antd";
import axios from "axios";
import { EditOutlined  } from "@ant-design/icons";

function EditJeepneyModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);
  const [ifChanged, setIfChanged] = useState();
  const [barangays, setBarangays] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/barangays/search_all_barangays")
      .then((res) => {

        let data = res.data;
        setBarangays(data);
      })
      .catch((error) => console.log(error));
  }, []);
  const { Option } = Select;

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };


  const showModal = () => {
    form.setFieldsValue({
      id: props.info.id,
      barangayId: props.info.barangayId,
      plateNumber: props.info.plateNumber,
      jeepCapacity: props.info.jeepCapacity,
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
      .post("/api/v1/jeepneys/update_jeepney", {
        id: props.info.id,
        barangayId: values.barangayId,
        plateNumber: values.plateNumber,
        jeepCapacity: values.jeepCapacity,
      })
      .then((res) => {
        setTimeout(() => {
          setIsModalVisible(false);
          setConfirmLoading(false);
          
        }, 2000);
        {
          ifChanged
            ? Modal.success({
                content: "Successfully Updated Jeepney",
                okButtonProps: {
                  style: {borderRadius: '50px'}
                },
              })
            : Modal.success({
                content: "Jeepney Info is up to date",
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
      content: "Failure to Update Jeepney Info",
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
  console.log("Changed", allValues, changedValues);
    setIfChanged(true);
  };

  return (
    <div>
      <Button type="primary" className="modal-button-edit" onClick={showModal}>
        <span className="desktop-view"><EditOutlined /> Edit</span>
        <span className="mobile-view"><EditOutlined /></span>
      </Button>
      <Modal
        title="Update Jeepney Info"
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
          {/* <Form.Item label="Barangay ID:" name="barangayId">
            <Input disabled={true} bordered={false} />
          </Form.Item> */}
          <Form.Item
            label="Barangay:"
            name="barangayId"
            rules={[
              { required: true, message: "Please input the Barangay's ID!" },
            ]}
          >
            <Select
              placeholder="Select Barangay"
              style={{ width: '100%' }}
              onChange={handleChange}
            >
              {barangays.map((barangay, index) => (
                <Option value={barangay.id}>{barangay.barangayName}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Plate Number:"
            name="plateNumber"
            rules={[
              { required: true, message: "Please input the Plate Number!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Jeep Capacity:"
            name="jeepCapacity"
            rules={[
              { required: true, message: "Please input Jeep Capacity!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EditJeepneyModal;
