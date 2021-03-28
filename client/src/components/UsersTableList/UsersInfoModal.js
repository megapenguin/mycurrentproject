import React, { useState } from "react";
import { Modal, Button, Image, Card, Col, Row } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import axios from "axios";

function UsersInfoModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePath, setImagePath] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
    axios
      .post("/api/v1/images/search_images", {
        imageOwnerId: props.info.id,
        imageReferenceId: 4,
      })
      .then((res) => {
        let data = res.data;
        setImages(data);
      })
      .catch((error) => console.log(error));
  };

  const handleOk = () => {
    props.passedData(props.info);

    setConfirmLoading(true);
    setIfCanceled(false);
    setTimeout(() => {
      setIsModalVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleDelete = (id) => {
    setConfirmLoading(true);
    setIfCanceled(false);
    setTimeout(() => {
      setIsModalVisible(false);
      setConfirmLoading(false);
    }, 2000);
    Modal.success({
      content: "Still in development",
      okButtonProps: {
        style: {borderRadius: '50px'}
      },
    });

    //console.log(id);
    // axios
    //   .delete("/api/v1/users/delete_user", {
    //     params: {
    //       id,
    //     },
    //   })
    //   .then((res) => {

    //     //console.log(driversCopy);

    //     Modal.success({
    //       content: "User has been Removed",
    //     });
    //   })
    //   .catch((error) => console.log(error));
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

  return (
    <div>
      <Button type="primary" className="modal-button-view" onClick={showModal}>
        <span className="desktop-view">
          <UnorderedListOutlined /> View
        </span>
        <span className="mobile-view">
          <UnorderedListOutlined />
        </span>
      </Button>
      <Modal
        title="User Information"
        visible={isModalVisible}
        confirmLoading={confirmLoading}
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={handleClose}
        footer={[
          <Button
            className="modal-button"
            loading={confirmLoading}
            onClick={() => handleDelete(props.info.id)}
            danger
          >
            Remove
          </Button>,
        ]}
      >
        <p>
          <h4>ID:</h4>
          {props.info.id}
        </p>
        <p>
          <h4>Name:</h4>
          {props.info.firstName} {props.info.lastName}
        </p>
        <p>
          <h4>Email Address: </h4>
          {props.info.email}
        </p>
        <h4>User Images: </h4>
        <Card className="shadow-sm">
          <Row>
            {images.map((image, index) => (
              <Col key={index} md={{ span: 6 }}>
                <br></br>
                <Image
                  height={100}
                  width={100}
                  src={`/api/v1/images/${
                    image.imagePath ? image.imagePath : "logo.png"
                  }`}
                />
                <Row>
                  <br></br>
                  {/* <Button onClick={() => handleDeleteImage(image.id)} danger>
                    Delete
                  </Button> */}
                </Row>
              </Col>
            ))}
          </Row>
        </Card>
      </Modal>
    </div>
  );
}

export default UsersInfoModal;
