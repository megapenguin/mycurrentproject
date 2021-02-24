import React, { useState, useEffect } from "react";
import { Divider, Row, Col, Typography, Image, Button, Modal } from "antd";
import axios from "axios";
import AddFunfactsModal from "./AddFunfactsModal";

function FunFactsTableList() {
  const { Title } = Typography;

  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/funfacts/")
      .then((res) => {
        let data = res.data;
        setImages(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDeleteImage = (id, imagePath) => {
    axios
      .delete("/api/v1/funfacts/delete_funfacts", {
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
        });
      })
      .catch((error) => console.log(error));
  };

  const modalClosed = () => {
    axios.get("/api/v1/funfacts/").then((res) => {
      //console.log(res);
      let data = res.data;
      setImages(data);
    });
  };

  return (
    <div>
      <Divider>
        <Title level={4}>Fun Facts</Title>
      </Divider>
      <AddFunfactsModal afterClosing={modalClosed} />
      <Row>
        {images.map((image, index) => (
          <Col key={index} md={{ span: 6 }}>
            <Image
              height={100}
              width={100}
              src={`/api/v1/funfacts/${
                image.lgImagePath ? image.lgImagePath : "logo.png"
              }`}
            />
            <Row>
              <Button
                onClick={() => handleDeleteImage(image.id, image.lgImagePath)}
                danger
              >
                Delete
              </Button>
            </Row>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default FunFactsTableList;
