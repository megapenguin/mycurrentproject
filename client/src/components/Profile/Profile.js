import React, { useState, useEffect, useContext } from "react";
import {
  Form,
  Input,
  Image,
  Modal,
  Button,
  Upload,
  Space,
  Divider,
  Typography,
  message,
  Row,
  Col,
  Card,
  Radio,
} from "antd";
import {
  UploadOutlined,
  LeftOutlined,
  CloseOutlined,
  SaveOutlined,
  FormOutlined,
  CheckOutlined,
  FileImageOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { AuthContext } from "../GlobalContext/AuthContext";

function Profile({ history }) {
  let Auth = useContext(AuthContext);
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState(Auth.state.userData);
  const [picture, setPicture] = useState(null);

  const [filename, setFilename] = useState("Choose file");
  const [uploadedImagePath, setUploadedImagePath] = useState("");
  const [uploadImageStatus, setUploadImageStatus] = useState("none");

  useEffect(() => {
    form.setFieldsValue({
      id: userInfo.id,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
    });
    axios
      .post("/api/v1/images/search_images", {
        imageOwnerId: userInfo.id,
        imageReferenceId: 1,
      })
      .then((res) => {
        let data = res.data;
        setPicture(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onFinish = (values) => {
    console.log(values);
    values["profilePicture"] = "";
    axios
      .post("/api/v1/users/update_user", values)
      .then((res) => {
        Auth.state.userData.firstName = values.firstName;
        Auth.state.userData.lastName = values.lastName;
        Auth.state.userData.email = values.email;
        Modal.success({
          content: "Successfully updated profile info",
          okButtonProps: {},
        });
      })
      .catch((error) => console.log(error));
  };

  const onFinishFailed = (errorInfo) => {
    Modal.error({
      content: "Failed to update profile info",
      okButtonProps: {
        style: { borderRadius: "50px" },
      },
    });

    //console.log("Failed:", errorInfo);
  };

  const removeImage = (val) => {
    //console.log("Removed image", val.response.filePath);
    axios
      .delete("/api/v1/images/delete_folder_image", {
        params: {
          fileName: val.response.imagePath,
          fileId: val.response.id,
        },
      })
      .then((res) => {
        setUploadImageStatus("removed");
        // console.log(res.data);
      })
      .catch((error) => console.log(error));
    setUploadedImagePath();
    message.error(`File removed Successfully.`);
  };

  const uploadFile = {
    name: "file",
    action: "/api/v1/images/add_image",
    headers: {
      authorization: "authorization-text",
    },
    data: { imageOwnerId: userInfo.id, imageReferenceId: 1 },
    onChange(info) {
      if (info.file.status !== "uploading") {
        //console.log("uploading", info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded Successfully.`);
        console.log("picture", picture);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload Failed.`);
      }
      setUploadImageStatus(info.file.status);
      setFilename(info);

      axios
        .post("/api/v1/images/search_images", {
          imageOwnerId: userInfo.id,
          imageReferenceId: 1,
        })
        .then((res) => {
          let data = res.data;
          setPicture(data);
        })
        .catch((error) => console.log(error));
    },
  };

  const selectImage = (imagePath) => {
    axios
      .post("/api/v1/users/update_profile_picture", {
        id: userInfo.id,
        profilePicture: imagePath,
      })
      .then((res) => {
        Auth.state.userData.profilePicture = imagePath;

        Modal.success({
          content: "Succesfully selected profile picture",
        });
      })
      .catch((error) => console.log(error));
  };

  const deleteImage = (id, imagePath) => {
    axios
      .delete("/api/v1/images/delete_folder_image", {
        params: {
          fileName: imagePath,
          fileId: id,
        },
      })
      .then((res) => {
        let imagesCopy = [...picture];
        imagesCopy = imagesCopy.filter((image) => image.id !== id);
        setPicture(imagesCopy);
        if (
          imagesCopy.length === 0 ||
          Auth.state.userData.profilePicture === imagePath
        ) {
          axios
            .post("/api/v1/users/update_profile_picture", {
              id: userInfo.id,
              profilePicture: "",
            })
            .then((res) => {
              Auth.state.userData.profilePicture = "";
            })
            .catch((error) => console.log(error));
        } else {
        }
        Modal.warning({
          content: "Image has been removed",
          okButtonProps: {},
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Row>
        <Link to="/instructions">
          <Button
            style={{
              background: "dimgray",
              color: "white",
              fontWeight: "bold",
              borderRadius: "25px",
              border: ".5px solid whitesmoke",
              boxShadow: "1px 5px whitesmoke",
              height: "40px",
            }}
          >
            <span className="desktop-view">
              <LeftOutlined /> Back to Home
            </span>
            <span className="mobile-view">
              <LeftOutlined />
            </span>
          </Button>
        </Link>
      </Row>
      <Divider>
        <Title style={{ color: "dimgrey" }} level={1}>
          <IdcardOutlined />{" "}
          <span className="desktop-view">Account Information</span>
        </Title>
      </Divider>

      <Form
        style={{ fontWeight: "bold" }}
        layout="vertical"
        name="basic"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        id="myForm"
      >
        <Row style={{ paddingTop: 25, paddingBottom: 25 }}>
          <Col>
            <Form.Item label="Id:" name="id">
              <Input disabled={true} bordered={false} />
            </Form.Item>
          </Col>
          <Col flex="auto" style={{ padding: 5, fontWeight: "bold" }}>
            <Form.Item label="First Name: " name="firstName">
              <Input style={{ border: 0, borderBottom: "2px solid black" }} />
            </Form.Item>
          </Col>
          <Col flex="auto" style={{ padding: 5 }}>
            <Form.Item label="Last Name:" name="lastName">
              <Input style={{ border: 0, borderBottom: "2px solid black" }} />
            </Form.Item>
          </Col>
          <Col flex="auto" style={{ padding: 5 }}>
            <Form.Item label="Email:" name="email">
              <Input style={{ border: 0, borderBottom: "2px solid black" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Button
            style={{
              background: "dimgray",
              color: "white",
              fontWeight: "bold",
              borderRadius: "25px",
              border: ".5px solid whitesmoke",
              boxShadow: "1px 5px whitesmoke",
              height: "40px",
            }}
            htmlType="submit"
            onClick={() => onFinish}
          >
            <span className="desktop-view">
              <SaveOutlined /> Save Changes
            </span>
            <span className="mobile-view">
              <SaveOutlined />
            </span>
          </Button>
        </Row>
      </Form>
      <Divider style={{ marginTop: 50 }}>
        <Title style={{ color: "dimgrey" }} level={1}>
          <FileImageOutlined />
          <span className="desktop-view">Photo</span>
        </Title>
      </Divider>
      <Row style={{ marginBottom: 25 }}>
        <Upload
          {...uploadFile}
          onRemove={removeImage}
          listType="picture-card"
          showUploadList={{ showPreviewIcon: false }}
          maxCount={1}
        >
          <Title style={{ fontWeight: "bold" }} level={5}>
            <UploadOutlined spin={true} /> Upload
          </Title>
        </Upload>
      </Row>
      <Row gutter={[16, 24]}>
        {picture == null
          ? "No Pictures"
          : picture.map((pic, index) => (
              <Col key={index} span={6}>
                <Card
                  style={{
                    border: ".5px solid whitesmoke",
                    boxShadow: "5px 10px whitesmoke",
                  }}
                >
                  <Image key={index} src={`api/v1/images/${[pic.imagePath]}`} />
                  <Button
                    style={{
                      background: "dimgray",
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: "25px",
                    }}
                    value={index}
                    onClick={() => selectImage(pic.imagePath)}
                  >
                    <span className="desktop-view">
                      <CheckOutlined /> Select
                    </span>
                    <span className="mobile-view">
                      <CheckOutlined />
                    </span>
                  </Button>
                  <Button
                    type="danger"
                    style={{
                      fontWeight: "bold",
                      borderRadius: "25px",
                    }}
                    onClick={() => deleteImage(pic.id, pic.imagePath)}
                  >
                    <span className="desktop-view">
                      <CloseOutlined /> Delete
                    </span>
                    <span className="mobile-view">
                      <CloseOutlined />
                    </span>
                  </Button>
                </Card>
              </Col>
            ))}
      </Row>
    </div>
  );
}

export default withRouter(Profile);
