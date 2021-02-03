import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
  Radio,
  Image,
} from "antd";
import axios from "axios";
import { Content } from "antd/lib/layout/layout";
const { Title, Text } = Typography;

function ImageUploadChartShit() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/images/")
      .then((res) => {
        //console.log(res);

        let data = res.data;
        setImages(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onFinish = (values) => {
    //console.log(values);
    // axios
    //   .post("/api/v1/images/add_jeep", values)
    //   .then((res) => {
    //     let imagesCopy = [...images];
    //     imagesCopy = [...imagesCopy, res.data];
    //     console.log(imagesCopy);
    //    setImages(imagesCopy);
    //   })
    //   .catch((error) => console.log(error));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("fail");
    console.log("Failed:", errorInfo);
  };

  const checking = () => {
    console.log("check");
  };

  const handleDelete = (id) => {
    axios
      .delete("/api/v1/images/delete_image", {
        params: {
          id,
        },
      })
      .then((res) => {
        let imagesCopy = [...images];
        imagesCopy = imagesCopy.filter((jeepney) => jeepney.id !== id);
        setImages(imagesCopy);
        //console.log(imagesCopy);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Row gutter={[16, 16]}>
      <h1>List Of Saved Images: </h1>
      {images.map((image, index) => (
        <Col key={index} md={{ span: 6 }}>
          <Card className="shadow-sm">
            <Title>
              <Image
                height={100}
                src={`/api/v1/images/${image.imagePath}`}
                style={{ borderColor: "white", border: "10px" }}
              />
            </Title>
            <Content>Owner ID : {image.imageOwnerId}</Content>
            <Content>
              {(() => {
                switch (image.imageReferenceId) {
                  case 1:
                    console.log("case 1");
                    return "Driver";
                  case 2:
                    return "Jeepney";
                  case 3:
                    return "Barangay";
                }
              })()}
            </Content>
            <Button onClick={() => handleDelete(image.id)} danger>
              Delete
            </Button>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default ImageUploadChartShit;
