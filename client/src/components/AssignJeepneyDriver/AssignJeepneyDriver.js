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
  Modal,
  Tag,
  Radio,
} from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import axios from "axios";
import { triggerFocus } from "antd/lib/input/Input";

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
      data = data.map((d) => {
        if (d.barangay === null) {
          return { ...d, barangayName: "None Assigned" };
        } else {
          return { ...d, barangayName: d.barangay.barangayName };
        }
      });

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
              return jeepneyId.jeepneyId;
            }),
          };
        });
        data = data.map((d) => {
          return {
            ...d,
            plateNumber: d.jeepneydrivers.map((jeep) => {
              //console.log("first", jeep.jeepney.plateNumber);
              return jeep.jeepney.plateNumber;
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
    {
      title: "Barangay",
      dataIndex: "barangayName",
    },
    {
      title: "Jeep Capacity",
      dataIndex: "jeepCapacity",
    },
    {
      title: "Status",
      render: (record, tag) => (
        <>
          {record.jeepneyDriver.length !== 0 ? (
            <Tag color={"volcano"}>Unavailable</Tag>
          ) : (
            <Tag color={"blue"}>Available</Tag>
          )}
        </>
      ),
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
      title: "Jeep",
      dataIndex: "plateNumber",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {record.jeepId.length === 0 ? (
            <Button
              onClick={() => assignDriver(jeepId, record.id)}
              type="primary"
              className="modal-button-view"
            >
              <span className="desktop-view">
                <CheckOutlined /> Assign Driver
              </span>
              <span className="mobile-view">
                <CheckOutlined />
              </span>
            </Button>
          ) : (
            <Button
              onClick={() => removeDriver(record.id)}
              type="danger"
              className="modal-button"
            >
              <span className="desktop-view">
                <CloseOutlined /> Remove Driver
              </span>
              <span className="mobile-view">
                <CloseOutlined />
              </span>
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
      jeepneyDriver: jeepney.jeepneydrivers,
      barangayName: jeepney.barangayName,
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
      plateNumber: driver.plateNumber,
    };
  });

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
                }),
              };
            });
            data = data.map((d) => {
              return {
                ...d,
                plateNumber: d.jeepneydrivers.map((jeep) => {
                  //console.log("first", jeep.jeepney.plateNumber);
                  return jeep.jeepney.plateNumber;
                }),
              };
            });
            setIfSelected(false);
            setDrivers(data);
            Modal.success({
              content: "Successfully Assigned Driver",
              okButtonProps: {
                style: {borderRadius: '50px'}
              }, 
            });
          });
          axios.get("/api/v1/jeepneys/").then((res) => {
            let data = res.data;
            data = data.map((d) => {
              return { ...d, barangayName: d.barangay.barangayName };
            });

            setJeepneys(data);
          });
        })
        .catch((error) => console.log(error));
    } else {
      Modal.error({
        content: "Select from available jeepneys",
        okButtonProps: {
          style: {borderRadius: '50px'}
        },
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
              }),
            };
          });
          data = data.map((d) => {
            return {
              ...d,
              plateNumber: d.jeepneydrivers.map((jeep) => {
                //console.log("first", jeep.jeepney.plateNumber);
                return jeep.jeepney.plateNumber;
              }),
            };
          });
          setIfSelected(true);
          setDrivers(data);
          Modal.success({
            content: "Successfully Removed Driver from Assigned Jeepney",
            okButtonProps: {
              style: {borderRadius: '50px'}
            },
          });
        });
        axios.get("/api/v1/jeepneys/").then((res) => {
          let data = res.data;
          data = data.map((d) => {
            return { ...d, barangayName: d.barangay.barangayName };
          });

          setJeepneys(data);
        });
      })
      .catch((error) => console.log(error));
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
    },

    hideSelectAll: true,

    onSelect: (record, selected, selectedRows) => {
      // console.log("selectedRows: ", record.id);
      setSelectedKey(record.key);
      setIfSelected(selected);
      setJeepId(record.id);
      setInfo(record);
    },
    getCheckboxProps: (record) => ({
      disabled:
        //(record.key !== selectedKey && ifSelected === true) ||
        record.jeepneyDriver.length !== 0, // Column configuration not to be checked
    }),
  };
  return (
    <div>
      <Row align="top" gutter={32}>
        <Divider>
          <Title level={4}>Assign Drivers</Title>
        </Divider>
        <Col flex="auto">
          <Card bordered={false}>
            <Title level={5}>Availabe Jeepneys</Title>
            <Table
              bordered={true}
              rowSelection={{
                type: "radio",
                ...rowSelection,
              }}
              columns={plateColumns}
              dataSource={jeepData}
              scroll={{ x: 300, y: 500 }}
            />
          </Card>
        </Col>
        {/* <Col flex="auto">
          <Card>
            <Title level={5}>Jeepney Info</Title>
            <Divider></Divider>
            <Form layout="vertical">
              <Text strong>ID:</Text>
              <p>{info.id}</p>
              <Text strong>Barangay:</Text>
              <p>{info.barangayName}</p>
              <Text strong>Plate Number:</Text>
              <p>{info.plateNumber}</p>
              <Text strong>Jeep Capacity:</Text>
              <p>{info.jeepCapacity}</p>
            </Form>
          </Card>
        </Col> */}
      </Row>
      <Title level={5}>Drivers</Title>
      <Row gutter={16}>
        <Col>
          <Card bordered={false}>
            <Table
              bordered={true}
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
