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
      });
    axios
      .post("/api/v1/titles/search_titles", { value: userInfo.id })
      .then((res) => {
        // console.log(res);
        let data = res.data;
        setListData(data);
      })
      .catch((error) => console.log(error));
    console.log(Auth.state.userData);
  }, []);

  const modalClosed = (addedData) => {
    //console.log("addedData", addedData);
    //let prevItems = listData
    if (addedData) {
      setListData((listData) => [...listData, addedData]);
    } else {
    }

    //console.log("newlist", listData);
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
        let listCopy = [...listData];
        listCopy = listCopy.filter((user) => user.id !== id);
        setListData(listCopy);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <Divider>
        <Title style={{ fontWeight: "bold", color: "dimgray" }} level={1}>
          Instruction List
        </Title>
      </Divider>

      <Row>
        <AddInstructionModal
          info={userInfo}
          afterClosing={(addedData) => modalClosed(addedData)}
        />
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
                  style={{
                    background: "dimgray",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "25px",
                  }}
                  onClick={() => viewInstruction(item)}
                >
                  <span className="desktop-view">
                    <QuestionOutlined /> View
                  </span>
                  <span className="mobile-view">
                    <QuestionOutlined />
                  </span>
                </Button>
              </Link>
              <Button
                type="danger"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "25px",
                }}
                onClick={() => deleteInstruction(item.id)}
              >
                <span className="desktop-view">
                  <CloseOutlined /> Delete
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
