import React, { useState } from "react";
import { Modal, Button } from "antd";
import { ImageUpload } from "../../components/dashboard5";

function ModalImageUpload(props) {
  const [info, setInfo] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);

    console.log(props.info);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add images
      </Button>
      <Modal
        title="Upload Image"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h1>{props.userType}</h1>
        <p>
          <h3>ID:</h3> {props.info.id}
        </p>
        <p>
          <h3>Name:</h3>
          {props.info.firstName} {props.info.middleName} {props.info.lastName}
        </p>
        <ImageUpload />
      </Modal>
    </div>
  );
}

export default ModalImageUpload;
