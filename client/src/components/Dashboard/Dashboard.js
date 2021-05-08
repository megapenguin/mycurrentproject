import React, { useEffect, useContext, useState } from "react";
import { Divider, Row, Col, Typography, List, Button, Image, Card } from "antd";
import {
  MailTwoTone,
  SmileTwoTone,
  QuestionOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { AuthContext } from "../GlobalContext/AuthContext";
import { DataContext } from "../GlobalContext/DataContext";

import AddInstructionModal from "./AddInstructionModal";

let initialState = {};

function Dashboard({ history }) {
  let Auth = useContext(AuthContext);
  let Data = useContext(DataContext);

  const { Title } = Typography;
  const [userInfo, setUserInfo] = useState(Auth.state.userData);
  const [currentUser, setCurrentUser] = useState(null);
  const [listData, setListData] = useState([]);
  const [images, setImages] = useState(null);

  useEffect(() => {
    axios
      .post("/api/v1/users/search_current_user", {
        value: userInfo.id,
      })
      .then((res) => {
        let data = res.data;
        setCurrentUser(data);
        console.log(userInfo);
      });
    axios
      .post("/api/v1/titles/search_titles", { value: userInfo.id })
      .then((res) => {
        // console.log(res);
        let data = res.data;
        setListData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const modalClosed = () => {
    console.log(images);
    axios
      .post("/api/v1/titles/search_titles", { value: userInfo.id })
      .then((res) => {
        // console.log(res);
        let data = res.data;
        setListData(data);
      })
      .catch((error) => console.log(error));
  };

  const viewInstruction = (instructionInfo) => {
    Data.passData(instructionInfo);
  };

  const deleteInstruction = (id) => {
    axios
      .delete("/api/v1/titles/delete_title", {
        params: {
          id: id,
        },
      })
      .then((res) => {
        axios
          .post("/api/v1/titles/search_titles", { value: userInfo.id })
          .then((res) => {
            // console.log(res);
            let data = res.data;
            setListData(data);
          });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <Divider>
        <Title level={2}>Instruction List</Title>
      </Divider>
      {/* <Row>
        <Image
          height={100}
          width={120}
          src={`/api/v1/images/${
            currentUser == null ? "logo.png" : currentUser[0].profilePicture
          }`}
        />
      </Row>
      <Row>
        <Title level={4}>
          <SmileTwoTone />{" "}
          {currentUser == null
            ? ""
            : currentUser[0].firstName + " " + currentUser[0].lastName}
        </Title>
      </Row>
      <Row>
        <Title level={4}>
          <MailTwoTone /> {userInfo.email}
        </Title>
      </Row> */}

      <Row>
        <AddInstructionModal info={userInfo} afterClosing={modalClosed} />
      </Row>
      <Divider></Divider>
      <List
        size="large"
        dataSource={listData}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={<Title level={4}>{item.title}</Title>} />

            <Col>
              <Link to={`/instructions/${item.id}`}>
                <Button
                  style={{ background: "dimgray", color: "white" }}
                  onClick={() => viewInstruction(item)}
                >
                  <span className="desktop-view">
                    <QuestionOutlined />
                    View
                  </span>
                  <span className="mobile-view">
                    <QuestionOutlined />
                  </span>
                </Button>
              </Link>
              <Button type="danger" onClick={() => deleteInstruction(item.id)}>
                <span className="desktop-view">
                  <CloseOutlined />
                  Delete
                </span>
                <span className="mobile-view">
                  <CloseOutlined />
                </span>
              </Button>
            </Col>
          </List.Item>
        )}
      />

      <Divider></Divider>
    </div>
  );
}

export default withRouter(Dashboard);
