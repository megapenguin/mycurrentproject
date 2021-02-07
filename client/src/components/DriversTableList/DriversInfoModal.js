import React, { useState, useEffect } from "react";
import { Modal, Button, Image, Card, Col, Row } from "antd";
import axios from "axios";

function DriversInfoModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePath, setImagePath] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("/api/v1/images/")
  //     .then((res) => {
  //       let data = res.data;
  //       setImages(data);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  const showModal = () => {
    setIsModalVisible(true);
    axios
      .get("/api/v1/images/")
      .then((res) => {
        let imagesCopy = [...images];
        imagesCopy = imagesCopy.find(
          (imagesCopy) =>
            imagesCopy.imageOwnerId === props.info.id &&
            imagesCopy.imageReferenceId === 2
        );
        setImagePath(imagesCopy.imagePath);
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
    //console.log(id);
    axios
      .delete("/api/v1/images/delete_image", {
        params: {
          id,
          referenceId: 1,
        },
      })
      .then((res) => {
        let imagesCopy = [...images];
        imagesCopy = imagesCopy.filter(
          (imagesCopy) =>
            imagesCopy.imageOwnerId !== id && imagesCopy.imageReferenceId === 2
        );
        setImages(imagesCopy);
        console.log(imagesCopy);
      })
      .catch((error) => console.log(error));

    axios
      .delete("/api/v1/drivers/delete_driver", {
        params: {
          id,
        },
      })
      .then((res) => {
        let driversCopy = [...drivers];
        driversCopy = driversCopy.filter((driver) => driver.id !== id);
        setDrivers(driversCopy);
        //console.log(driversCopy);

        Modal.success({
          content: "Driver has been Removed",
        });
      })
      .catch((error) => console.log(error));
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

  const handleDeleteImage = (id) => {
    axios
      .delete("/api/v1/images/delete_image", {
        params: {
          id,
          referenceId: 1,
        },
      })
      .then((res) => {
        let imagesCopy = [...images];
        imagesCopy = imagesCopy.filter((image) => image.id !== id);
        setImages(imagesCopy);
        Modal.success({
          content: "Driver image has been removed",
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        View
      </Button>
      <Modal
        title="Driver Information"
        visible={isModalVisible}
        confirmLoading={confirmLoading}
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={handleClose}
        footer={[
          <Button
            loading={confirmLoading}
            onClick={() => handleDelete(props.info.id)}
            danger
          >
            Remove
          </Button>,
        ]}
      >
        <p>
          <h3>ID:</h3>
          {props.info.id}
        </p>
        <p>
          <h3>Name:</h3>
          {props.info.firstName} {props.info.middleName} {props.info.lastName}
        </p>
        <p>
          <h3>Contact Number:</h3>
          {props.info.contactNumber}
        </p>
        <p>
          <h3>Address: </h3>
          {props.info.address}
        </p>
        <p>
          <h3>Email Address: </h3>
          {props.info.email}
        </p>
        <h3>Uploaded Images: </h3>
        <Card className="shadow-sm">
          {images.map((image, index) => (
            <Col key={index} md={{ span: 6 }}>
              <Row>
                <Image
                  height={100}
                  src={`/api/v1/images/${
                    image.imagePath ? image.imagePath : "logo.png"
                  }`}
                  style={{ borderColor: "white", border: "10px" }}
                />
                <Button onClick={() => handleDeleteImage(image.id)} danger>
                  Delete
                </Button>
              </Row>
            </Col>
          ))}
        </Card>
      </Modal>
    </div>
  );
}

export default DriversInfoModal;
