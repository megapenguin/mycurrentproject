import React, { useState, useContext, useEffect } from "react";
import "./ImageUpload.css";
import logo from "././logo.png";
import {
  Upload,
  Button,
  Space,
  Row,
  Col,
  Image,
  Form,
  Radio,
  Input,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ImageUploadDashboard from "./ImageUploadDashboard";

import axios from "axios";

function ImageUpload(props) {
  const [file, setFile] = useState({});
  const [filename, setFilename] = useState("Choose file");
  const [uploadedImagePath, setUploadedImagePath] = useState("");
  const [fetchImage, setFetchImage] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/images/")
      .then((res) => {
        console.log(res);

        let data = res.data;
        setImages(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const checking = (file) => {
    setFilename(file);
  };
  const viewFile = () => {
    if (filename == "Choose file") {
      console.log("No image selected");
    } else {
      setUploadedImagePath(filename.file.response.filePath);
      console.log(filename.file.response);
    }
  };

  const [images, setImages] = useState([]);

  const onFinish = (values) => {
    console.log(values);
    axios
      .post("/api/v1/images/save_image", {
        imageOwnerId: values.imageOwnerId,
        imageReferenceId: values.imageReferenceId,
        imagePath: uploadedImagePath,
      })
      .then((res) => {})
      .catch((error) => console.log(error));
  };
  const removeImage = (val) => {
    console.log("Remove image", val);
    axios
      .delete("/api/v1/images/delete_folder_image", {
        params: {
          filePath: val.response.filePath,
        },
      })
      .then((res) => {
        console.log("image remove from folder");
      })
      .catch((error) => console.log(error));
    console.log(file);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("fail");
    console.log("Failed:", errorInfo);
  };

  const checkingValues = () => {
    console.log("check");
    console.log(uploadedImagePath);
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col>
          <Space style={{ width: "100%" }} size="large">
            <Upload
              action="/api/v1/images/add_image"
              listType="picture"
              onRemove={removeImage}
              maxCount={1}
              file={file}
              onChange={checking}
            >
              <Button icon={<UploadOutlined />}>Upload Image (Max: 1)</Button>
            </Upload>
          </Space>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Button onClick={viewFile}>Check Uploaded Image</Button>
      </Row>
      <Row gutter={[16, 16]}>
        <Image
          width={250}
          height={250}
          src={`/api/v1/images/${
            uploadedImagePath ? uploadedImagePath : "logo.png"
          }`}
          style={{ borderColor: "white", border: "10px" }}
        />
      </Row>
      <Row gutter={[16, 16]}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Image Owner ID"
            name="imageOwnerId"
            rules={[
              { required: true, message: "Please input the Image owner Id!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Image Reference ID"
            name="imageReferenceId"
            rules={[{ required: true, message: "Please select image owner!" }]}
          >
            <Radio.Group>
              <Radio.Button value="1">Driver</Radio.Button>
              <Radio.Button value="2">Jeepney</Radio.Button>
              <Radio.Button value="3">Barangay</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button
              disabled={uploadedImagePath.length === 0}
              onClick={onFinish}
              type="primary"
              htmlType="submit"
            >
              {uploadedImagePath ? "Save Image" : "Choose an image"}
            </Button>
          </Form.Item>
        </Form>
      </Row>
      <Row>
        <Col>
          <ImageUploadDashboard />
        </Col>
      </Row>
    </div>
  );
}

export default ImageUpload;
