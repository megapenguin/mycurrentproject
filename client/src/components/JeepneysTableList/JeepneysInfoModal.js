import React, { useState, useEffect } from "react";
import { Modal, Button, Card, Image, Space, Col, Row, Typography } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import axios from "axios";

function JeepneysInfoModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);
  const [jeepneys, setJeepneys] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePath, setImagePath] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
    axios
      .post("/api/v1/images/search_images", {
        imageOwnerId: props.info.id,
        imageReferenceId: 3,
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
    // axios
    //   .delete("/api/v1/images/delete_image", {
    //     params: {
    //       id,
    //       referenceId: 3,
    //     },
    //   })
    //   .then((res) => {
    //     let imagesCopy = [...images];
    //     imagesCopy = imagesCopy.filter(
    //       (imagesCopy) =>
    //         imagesCopy.imageOwnerId !== id && imagesCopy.imageReferenceId === 3
    //     );
    //     setImages(imagesCopy);
    //     console.log(imagesCopy);
    //   })
    //   .catch((error) => console.log(error));

    // axios
    //   .delete("/api/v1/jeepneys/delete_jeep", {
    //     params: {
    //       id,
    //     },
    //   })
    //   .then((res) => {
    //     let jeepneysCopy = [...jeepneys];

    //     jeepneysCopy = jeepneysCopy.filter((jeepney) => jeepney.id !== id);
    //     setJeepneys(jeepneysCopy);

    //     console.log(jeepneysCopy);
    //     Modal.success({
    //       content: "Jeepney has been Removed",
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

  const handleDeleteImage = (id, imagePath) => {
    axios
      .delete("/api/v1/images/delete_folder_image", {
        params: {
          fileName: imagePath,
          fileId: id,
        },
      })
      .then((res) => {
        let imagesCopy = [...images];
        imagesCopy = imagesCopy.filter((image) => image.id !== id);
        setImages(imagesCopy);
        Modal.success({
          content: "Jeepney image has been removed",
          okButtonProps: {
            style: {borderRadius: '50px'}
          },
        });
      })
      .catch((error) => console.log(error));

    // axios
    //   .delete("/api/v1/images/delete_image", {
    //     params: {
    //       id,
    //       referenceId: 1,
    //     },
    //   })
    //   .then((res) => {
    //
    //   })
    //   .catch((error) => console.log(error));
  };
  return (
    <div>
      <Space>
        <Button
          type="primary"
          className="modal-button-view"
          onClick={showModal}
        >
          <span className="desktop-view">
            <UnorderedListOutlined /> View
          </span>
          <span className="mobile-view">
            <UnorderedListOutlined />
          </span>
        </Button>

        {/* <Button type="default" onClick={showModal}>
        Assign Driver
      </Button> */}
      </Space>
      <Modal
        title="Jeepney Information"
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
          <h4>Barangay Id:</h4>
          {props.info.barangayId}
        </p>
        <p>
          <h4>Plate Number:</h4>
          {props.info.plateNumber}
        </p>
        <p>
          <h4>Jeep Capacity:</h4>
          {props.info.jeepCapacity}
        </p>
        <h4>Uploaded Images: </h4>
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
                  <Button
                    onClick={() => handleDeleteImage(image.id, image.imagePath)}
                    danger
                  >
                    Delete
                  </Button>
                </Row>
              </Col>
            ))}
          </Row>
        </Card>
      </Modal>
    </div>
  );
}

export default JeepneysInfoModal;
