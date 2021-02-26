import React, { useState, useEffect, useRef } from "react";
import { Carousel,Divider, Row, Col, Typography, Image, Button, Modal, Space } from "antd";
import axios from "axios";
import AddFunfactsModal from "./AddFunfactsModal";
import { RightOutlined,LeftOutlined, DeleteOutlined    } from "@ant-design/icons";

function FunFactsTableList() {
  const { Title } = Typography;

  const [images, setImages] = useState([]);
  const sliderRef = useRef();

  const handlePrev = () => sliderRef.current.prev();
  const handleNext = () => sliderRef.current.next();


  const contentStyle = {
    color: '#fff',
    background: '#001529',
    height: "100%",
    maxWidth: "100%",
    maxheight: "100%",
    lineHeight: "100px",
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
       
      
      
      <Carousel 
       ref={sliderRef}
       style={contentStyle}
       swipeToSlide={true}
       draggable >
      {images.map((image, index) => (
          <Col key={index} span={24}>
             
            <Image
              style={imageStyle}
              // height={200}
              // width={200}
              src={`/api/v1/funfacts/${
                image.lgImagePath ? image.lgImagePath : "logo.png"
              }`}
            />
           <Col>
           <Row>
            <Col span={12}>
            <LeftOutlined    onClick={handlePrev}/>
            </Col>
            <Col span={12}>
            <RightOutlined onClick={handleNext}/>
            </Col>
            </Row>
           
           <DeleteOutlined  onClick={() => handleDeleteImage(image.id, image.lgImagePath)}
            danger/>
          
            </Col>
            
          </Col>
          
          
           
        ))}
         
      </Carousel>
     
      
    </div>
  );
}

export default FunFactsTableList;
