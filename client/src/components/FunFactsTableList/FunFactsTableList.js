import React, { useState, useEffect, useRef } from "react";
import {
  Carousel,
  Divider,
  Row,
  Col,
  Typography,
  Image,
  Card,
  Modal,
  Space,
} from "antd";
import axios from "axios";
import AddFunfactsModal from "./AddFunfactsModal";
import { RightOutlined, LeftOutlined, DeleteOutlined } from "@ant-design/icons";

function FunFactsTableList() {
  const { Title } = Typography;

  const [images, setImages] = useState([]);
  const sliderRef = useRef();

  const handlePrev = () => sliderRef.current.prev();
  const handleNext = () => sliderRef.current.next();

  const contentStyle = {
    maxWidth: "350px",
  };

  const imageStyle = {
    height: "400px",
    lineHeight: "160px",
    width: "500px",
  };

  useEffect(() => {
    axios
      .get("/api/v1/funfacts/")
      .then((res) => {
        let data = res.data;
        setImages(data);
        console.log(data);
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
          content: "Fun fact image has been removed",
          okButtonProps: {
            style: {borderRadius: '50px'}
          },
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
      <Row>
        <Col span={20}>
        </Col>
        <Col span={4}>
        <AddFunfactsModal afterClosing={modalClosed} />
        </Col>
      </Row>
      <Divider>
        <Title level={4}>Fun Facts</Title>
      </Divider>
      <Row>
    
        <Col span={24} align="center">
          <Carousel
            ref={sliderRef}
            style={contentStyle}
            swipeToSlide={true}
            dots={false}
            draggable
          >
            {images.map((image, index) => (
              <Row>
                <Col key={index} span={24}>
                    <Card
                        style={{ width: 350 }}
                        cover={
                          <Image
                            src={`/api/v1/funfacts/${
                              image.lgImagePath ? image.lgImagePath : "logo.png"
                            }`}
                          />
                        }
                        actions={[
                          <LeftOutlined onClick={handlePrev} />,
                          <DeleteOutlined
                          onClick={() => handleDeleteImage(image.id, image.lgImagePath)}
                          danger
                        />,
                        <RightOutlined onClick={handleNext} />
                        ]}
                      >
                    </Card>
                  </Col>
              </Row>
            ))}
          </Carousel>
        </Col>
      </Row>
    </div>
  );
}

export default FunFactsTableList;
