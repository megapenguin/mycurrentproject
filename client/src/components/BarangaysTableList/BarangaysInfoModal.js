import React, { useState } from "react";
import { Modal, Button, Card, Image, Col, Row } from "antd";
import axios from "axios";
import { UnorderedListOutlined } from "@ant-design/icons";

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
    //console.log(images);
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
          content: "Barangay image has been removed",
          okButtonProps: {
            style: {borderRadius: '50px'}
          },
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
      okButtonProps: {
        style: {borderRadius: '50px'}
      },
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
      <Button type="primary" className="modal-button-view" onClick={showModal}>
        <span className="desktop-view">
          <UnorderedListOutlined /> View
        </span>
        <span className="mobile-view">
          <UnorderedListOutlined />
        </span>
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
            className="modal-button"
          >
            Remove Barangay
          </Button>,
        ]}
      >
        <p>
          <h4>Bargangay ID:</h4>
          {props.info.id}
        </p>
        <p>
          <h4>Barangay Name:</h4>
          {props.info.barangayName}
        </p>
        <p>
          <h4>Location:</h4>
          {props.info.location}
        </p>
        <p>
          <h4>Barangay Description: </h4>
          {props.info.barangayDescription}
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

export default BarangaysInfoModal;
