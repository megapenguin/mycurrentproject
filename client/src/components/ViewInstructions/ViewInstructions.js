import React, { useEffect, useState, useContext } from "react";
import { List, Button, Row, Col, Divider, Typography } from "antd";
import { LeftOutlined, CloseOutlined } from "@ant-design/icons";

import AddStepsModal from "./AddStepsModal";
import UpdateStepsModal from "./UpdateStepsModal";

import axios from "axios";
import { DataContext } from "../GlobalContext/DataContext";
import { withRouter, Link, useHistory } from "react-router-dom";

function ViewInstructions({ history }) {
  let Data = useContext(DataContext);
  const { Title } = Typography;
  let [dataInfo, setDataInfo] = useState(Data.dataState.dataHolder);
  const [stepsData, setStepsData] = useState([]);
  let [currentTitle, setCurrentTitle] = useState(null);
  let [value, setValue] = useState();
  let dataHistory = useHistory();

  useEffect(() => {
    value = dataHistory.location.pathname.split("/instructions/");
    axios.post("/api/v1/titles/title", { value: value[1] }).then((res) => {
      // console.log(res);
      let data = res.data;
      setCurrentTitle(data);
    });
    axios
      .post("/api/v1/instructions/search_instructions", { value: value[1] })
      .then((res) => {
        // console.log(res);
        let data = res.data;
        setStepsData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const modalClosed = () => {
    console.log("modal closed");
    axios
      .post("/api/v1/instructions/search_instructions", { value: dataInfo.id })
      .then((res) => {
        // console.log(res);
        let data = res.data;
        setStepsData(data);
      })
      .catch((error) => console.log(error));
    console.log(stepsData);
  };

  const deleteInstruction = (id) => {
    axios
      .delete("/api/v1/instructions/delete_instruction", {
        params: {
          id: id,
        },
      })
      .then((res) => {
        axios
          .post("/api/v1/instructions/search_instructions", {
            value: dataInfo.id,
          })
          .then((res) => {
            // console.log(res);
            let data = res.data;
            setStepsData(data);
          });
      })
      .catch((error) => console.log(error));
  };

  const goBack = () => {};
  return (
    <div>
      <Row>
        <Link to="/instructions">
          <Button
            style={{ background: "dimgray", color: "white" }}
            onClick={() => goBack()}
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
        <Title level={2}>
          {currentTitle == null ? " " : currentTitle[0].title}
        </Title>
      </Divider>

      <Row>
        <AddStepsModal
          info={dataInfo}
          stepInfo={stepsData}
          afterClosing={modalClosed}
        />
      </Row>

      <Divider>
        <Title level={2}>Steps</Title>
      </Divider>

      <List
        size="large"
        dataSource={stepsData}
        renderItem={(item) => (
          <List.Item>
            <Col>{item.stepNumber}</Col>
            <Col flex="auto">{item.stepInstruction}</Col>
            <Col>
              <UpdateStepsModal
                info={dataInfo}
                stepInfo={item}
                afterClosing={modalClosed}
              />
            </Col>
            <Col>
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

export default withRouter(ViewInstructions);
