import React, { useState, useEffect } from "react";
import { Modal, Button, Card, Image, Col, Row } from "antd";
import axios from "axios";

function BarangaysInfoModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);
  const [barangays, setBarangays] = useState([]);
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
      .post("/api/v1/images/search_images", {
        imageOwnerId: props.info.id,
        imageReferenceId: 1,
      })
      .then((res) => {
        let data = res.data;
        setImages(data);
        //console.log("images", images);
        // let imagesCopy = [...images];
        // imagesCopy = imagesCopy.find(
        //   (imagesCopy) =>
        //     imagesCopy.imageOwnerId === props.info.id &&
        //     imagesCopy.imageReferenceId === 1
        // );
        //setImagePath(imagesCopy.imagePath);
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
          content: "Barangay image has been removed",
        });
      })
      .catch((error) => console.log(error));
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
    });

    // axios
    //   .delete("/api/v1/barangays/delete_barangay", {
    //     params: {
    //       id,
    //     },
    //   })
    //   .then((res) => {
    //     Modal.success({
    //       content: "Barangay has been Removed",
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
      <Button type="primary" onClick={showModal}>
        View
      </Button>
      <Modal
        title="Barangay Information"
        visible={isModalVisible}
        confirmLoading={confirmLoading}
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={handleClose}
        destroyOnClose={true}
        footer={[
          <Button
            loading={confirmLoading}
            onClick={() => handleDelete(props.info.id)}
            danger
          >
            Remove Barangay
          </Button>,
        ]}
      >
        <p>
          <h3>Bargangay ID:</h3>
          {props.info.id}
        </p>
        <p>
          <h3>Barangay Name:</h3>
          {props.info.barangayName}
        </p>
        <p>
          <h3>Location:</h3>
          {props.info.location}
        </p>
        <p>
          <h3>Barangay Description: </h3>
          {props.info.barangayDescription}
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

export default BarangaysInfoModal;
