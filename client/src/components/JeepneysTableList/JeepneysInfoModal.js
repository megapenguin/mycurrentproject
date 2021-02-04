import React, { useState, useEffect } from "react";
import { Modal, Button, Card, Image, Space } from "antd";
import axios from "axios";

function JeepneysInfoModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);
  const [jeepneys, setJeepneys] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePath, setImagePath] = useState([]);

  useEffect(() => {
    axios
    .get("/api/v1/images/")
    .then((res) => {
      let data = res.data;
      setImages(data);
    })
    .catch((error) => console.log(error));
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
    axios
    .get("/api/v1/images/")
    .then((res) => {
      let imagesCopy = [...images];
      imagesCopy = imagesCopy.find((imagesCopy) => imagesCopy.imageOwnerId === props.info.id && imagesCopy.imageReferenceId === 3);
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
    axios
    .delete("/api/v1/images/delete_image", {
      params: {
        id,
        referenceId: 3,
      },
    })
    .then((res) => {
      let imagesCopy = [...images];
      imagesCopy = imagesCopy.filter((imagesCopy) => imagesCopy.imageOwnerId !== id && imagesCopy.imageReferenceId === 3);
      setImages(imagesCopy);
      console.log(imagesCopy);
      
    })
    .catch((error) => console.log(error));

    axios
      .delete("/api/v1/jeepneys/delete_jeep", {
        params: {
          id,
        },
      })
      .then((res) => {
        let jeepneysCopy = [...jeepneys];

        jeepneysCopy = jeepneysCopy.filter((jeepney) => jeepney.id !== id);
        setJeepneys(jeepneysCopy);

        console.log(jeepneysCopy);
        Modal.success({
          content: 'Jeepney has been Removed',
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
  return (
    <div>
      <Space>
      <Button type="primary" onClick={showModal}>
        View
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
          <Button loading={confirmLoading} onClick={() => handleDelete(props.info.id)} danger>
              Remove
            </Button>
          ]}
      >
        <p>
          <h3>Barangay Id:</h3>
          {props.info.barangayId}
        </p>
        <p>
          <h3>Plate Number:</h3>
          {props.info.plateNumber}
        </p>
        <p>
          <h3>Jeep Capacity:</h3>
          {props.info.jeepCapacity}
        </p>
        <h3>Uploaded Images: </h3>
          <Card className="shadow-sm">
              <Image
                height={100}
                src={`/api/v1/images/${imagePath}`}
                style={{ borderColor: "white", border: "10px" }}
              />

          </Card>
      </Modal>
    </div>
  );
}

export default JeepneysInfoModal;
