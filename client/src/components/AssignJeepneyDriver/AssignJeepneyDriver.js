import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Input,
  Row,
  Col,
  Divider,
  Card,
  Typography,
  Button,
  Form,
  Modal,
} from "antd";
import axios from "axios";

function AssignJeepneyDriver() {
  const [jeepneys, setJeepneys] = useState([]);
  const [info, setInfo] = useState([]);
  const [counter, setCounter] = useState(0);
  const [jeepId, setJeepId] = useState([]);
  const [assignedJeepId, setAssignedJeepId] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [jeepneyDrivers, setJeepneyDrivers] = useState([]);
  const [selectedKey, setSelectedKey] = useState();
  const [ifSelected, setIfSelected] = useState();
  const { Search } = Input;
  const { Text, Title } = Typography;

  useEffect(() => {
    axios.get("/api/v1/jeepneys/").then((res) => {
      let data = res.data;
      // data = data.map((d) => {
      //   return { ...d, barangayName: d.barangay.barangayName };
      // });

      setJeepneys(data);
    });

    axios
      .get("/api/v1/drivers/")
      .then((res) => {
        let data = res.data;

        data = data.map((d) => {
          return {
            ...d,
            jeepId: d.jeepneydrivers.map((jeepneyId) => {
              if (jeepneyId.jeepneyId) {
                return jeepneyId.jeepneyId;
              } else {
                return "none";
              }
              //console.log("jeepneyID", jeepneyId.jeepneyId);
            }),
          };
        });

        setDrivers(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const plateColumns = [
    {
      title: "Plate Number",
      dataIndex: "plateNumber",
    },
  ];

  const driverColumns = [
    {
      title: "Firstname",
      dataIndex: "firstName",
    },

    {
      title: "Middlename",
      dataIndex: "middleName",
    },
    { title: "Lastname", dataIndex: "lastName" },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {record.jeepId.length === 0 ? (
            <Button
              onClick={() => assignDriver(jeepId, record.id)}
              type="primary"
              className="modal-button"
            >
              Assign
            </Button>
          ) : (
            <Button
              onClick={() => removeDriver(record.id)}
              type="danger"
              className="modal-button"
            >
              Remove
            </Button>
          )}
        </Space>
      ),
    },
  ];
  const jeepData = jeepneys.map((jeepney, index) => {
    return {
      key: index,
      id: jeepney.id,
      plateNumber: jeepney.plateNumber,
      jeepCapacity: jeepney.jeepCapacity,
    };
  });
  const driverData = drivers.map((driver, index) => {
    return {
      key: index,
      id: driver.id,
      jeepId: driver.jeepId,
      firstName: driver.firstName,
      middleName: driver.middleName,
      lastName: driver.lastName,
      email: driver.email,
      address: driver.address,
      contactNumber: driver.contactNumber,
    };
  });

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
    },

    onSelect: (record, selected, selectedRows) => {
      // console.log("selectedRows: ", record.id);
      setSelectedKey(record.key);
      setIfSelected(selected);
      setJeepId(record.id);
      setInfo(record);
    },
    getCheckboxProps: (record) => ({
      disabled: record.key !== selectedKey && ifSelected === true, // Column configuration not to be checked
    }),
  };

  const assignDriver = (jeepId, id) => {
    if (ifSelected === true) {
      axios
        .post("/api/v1/jeepneydrivers/add_jeepney_driver", {
          driverId: id,
          jeepneyId: jeepId,
        })
        .then((res) => {
          axios.get("/api/v1/drivers/").then((res) => {
            let data = res.data;
            data = data.map((d) => {
              return {
                ...d,
                jeepId: d.jeepneydrivers.map((jeepneyId) => {
                  return jeepneyId.jeepneyId;
                  //console.log("jeepneyID", jeepneyId.jeepneyId);
                }),
              };
            });
            setDrivers(data);
            Modal.success({
              content: "Successfully Assigned Driver",
            });
          });
        })
        .catch((error) => console.log(error));
    } else {
      Modal.error({
        content: "Select a jeepney",
      });
    }
  };

  const removeDriver = (id) => {
    axios
      .delete("/api/v1/jeepneydrivers/delete_jeepney_driver", {
        params: {
          driverId: id,
        },
      })
      .then((res) => {
        axios.get("/api/v1/drivers/").then((res) => {
          let data = res.data;
          data = data.map((d) => {
            return {
              ...d,
              jeepId: d.jeepneydrivers.map((jeepneyId) => {
                return jeepneyId.jeepneyId;
                //console.log("jeepneyID", jeepneyId.jeepneyId);
              }),
            };
          });
          setDrivers(data);
          Modal.success({
            content: "Successfully Removed Driver from Assigned Jeepney",
          });
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <Row align="top" gutter={32}>
        <Divider>Assign Drivers</Divider>
        <Col flex="300px">
          <Card>
            <Title level={4}>Select Jeepney</Title>
            <Table
              rowSelection={rowSelection}
              columns={plateColumns}
              dataSource={jeepData}
              scroll={{ x: 300, y: 500 }}
            />
          </Card>
        </Col>
        <Col flex="auto">
          <Card title="Jeepney Info">
            <Form layout="vertical">
              <Text strong>ID:</Text>
              <p>{info.id}</p>

              <Text strong>Plate Number:</Text>
              <p>{info.plateNumber}</p>
              <Text strong>Jeep Capacity:</Text>
              <p>{info.jeepCapacity}</p>
            </Form>
          </Card>
        </Col>
      </Row>
      <Divider>Drivers</Divider>
      <Row gutter={16}>
        <Col>
          <Card>
            <Table
              columns={driverColumns}
              dataSource={driverData}
              scroll={{ y: 500 }}
            ></Table>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AssignJeepneyDriver;
