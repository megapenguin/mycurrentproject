import React, { useEffect, useState, useContext } from "react";
import { List, Button, Row, Col, Divider, Typography, Modal } from "antd";
import { LeftOutlined, CloseOutlined, FormOutlined } from "@ant-design/icons";

import AddStepsModal from "./AddStepsModal";
import UpdateStepsModal from "./UpdateStepsModal";

import axios from "axios";
import { DataContext } from "../GlobalContext/DataContext";
import { withRouter, Link, useHistory } from "react-router-dom";

function ViewInstructions({ history }) {
  let Data = useContext(DataContext);
  const { Title } = Typography;
  let [dataInfo, setDataInfo] = useState();
  const [stepsData, setStepsData] = useState([]);
  let [currentTitle, setCurrentTitle] = useState(null);
  let [value, setValue] = useState();
  let dataHistory = useHistory();

  useEffect(() => {
    value = dataHistory.location.pathname.split("/instructions/");

    axios
      .post("/api/v1/titles/title", { value: value[1] })
      .then((res) => {
        // console.log(res);
        let data = res.data;
        setCurrentTitle(data);
        setDataInfo(value[1]);
        axios
          .post("/api/v1/instructions/search_instructions", { value: value[1] })
          .then((res) => {
            // console.log(res);
            let data = res.data;
            setStepsData(data);
          });
      })

      .catch((error) => console.log(error));
  }, []);

  const modalClosed = (addedStep) => {
    console.log("addedStep", addedStep);
    if (addedStep) {
      setStepsData((stepsData) => [...stepsData, addedStep]);
    } else {
    }
  };

  const modalUpdate = (updatedStep) => {
    console.log("from modal", updatedStep);
    if (updatedStep) {
      var updateId = updatedStep.id;
      var updateValue = { stepInstruction: `${updatedStep.stepInstruction}` };
      var updatedItems = stepsData.map((step) => {
        if (step.id === updateId) {
          return { ...step, ...updateValue };
        } else {
          return { ...step };
        }
      });
      setStepsData(updatedItems);
    } else {
    }
    //console.log("update", updatedItems);
  };

  const deleteInstruction = (id) => {
    axios
      .delete("/api/v1/instructions/delete_instruction", {
        params: {
          id: id,
        },
      })
      .then((res) => {
        let stepsCopy = [...stepsData];
        stepsCopy = stepsCopy.filter((user) => user.id !== id);
        setStepsData(stepsCopy);
        Modal.warning({
          content: "Step has been deleted",
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
        <Title
          style={{
            color: "dimgray",
            fontWeight: "bold",
          }}
          level={1}
        >
          <FormOutlined />
          <span className="desktop-view">
            {currentTitle == null ? " " : currentTitle[0].title}
          </span>
        </Title>
      </Divider>

      <Row>
        <AddStepsModal
          info={dataInfo}
          stepInfo={stepsData}
          afterClosing={(addedStep) => modalClosed(addedStep)}
        />
      </Row>

      <Divider>
        <Title style={{ color: "dimgrey" }} level={2}>
          Steps
        </Title>
      </Divider>

      <List
        size="large"
        dataSource={stepsData}
        renderItem={(item) => (
          <List.Item>
            <Col style={{ fontSize: 15 }}>{item.stepNumber}</Col>
            <Col flex="auto" style={{ fontSize: 15, fontWeight: "bold" }}>
              {item.stepInstruction}
            </Col>
            <Col>
              <Row>
                {stepsData.length == item.stepNumber ? (
                  <Button
                    type="danger"
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: "25px",
                      height: "40px",
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
                ) : (
                  <UpdateStepsModal
                    info={dataInfo}
                    stepInfo={item}
                    afterClosing={(updatedStep) => modalUpdate(updatedStep)}
                  />
                )}
              </Row>
            </Col>
          </List.Item>
        )}
      />

      <Divider></Divider>
    </div>
  );
}

export default withRouter(ViewInstructions);
