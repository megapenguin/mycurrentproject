import React, { Suspense, useEffect, useState } from "react";
import { Table, Tag, Space, Input, Row, Col, Button, Divider } from "antd";
import axios from "axios";
import Column from "antd/lib/table/Column";
import ColumnGroup from "antd/lib/table/ColumnGroup";
// import BarangaysInfoModal from "./BarangaysInfoModal";
// import AddBarangayModal from "./AddBarangayModal";
// import EditBarangayModal from "./EditBarangayModal";
// import AddBarangayImageModal from "./AddBarangayImageModal";

function UsersTableList() {
  const [barangays, setBarangays] = useState([]);
  const { Search } = Input;
  const [dataFromModal, setDataFromModal] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/barangays/search_all_barangays")
      .then((res) => {
        // console.log(res);

        let data = res.data;
        setBarangays(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onSearch = (value) => {
    axios
      .post("/api/v1/barangays/search_barangays", { value: value })
      .then((_res) => {
        console.log(_res);
        let data = _res.data;
        setBarangays(data);
        console.log("success");
      });

    //console.log(value);
  };

  const modalClosed = () => {
    console.log("Passed data from modal", dataFromModal);
    axios.get("/api/v1/barangays/search_all_barangays").then((res) => {
      //console.log(res);
      let data = res.data;
      setBarangays(data);
    });
  };

  return (
    <div>
      <Row justify="space-between">
        <Col span={4}>
          <Space direction="vertical">
            <Search
              placeholder="Search Barangay"
              onSearch={onSearch}
              allowClear={true}
              enterButton
            />
          </Space>
        </Col>
      </Row>
      <Divider orientation="center">List of Users</Divider>
      <Row>
        <Table dataSource={barangays} scroll={{ x: 1000, y: 500 }} sticky>
          {/* <ColumnGroup title="Id" dataIndex="id" key="id"></ColumnGroup> */}
          {/* <ColumnGroup title="Name" key="name"> */}
          <Column
            title="Name"
            dataIndex="barangayName"
            key="barangayName"
          ></Column>
          {/* </ColumnGroup> */}
          <ColumnGroup
            title="Email"
            dataIndex="location"
            key="location"
          ></ColumnGroup>
          <ColumnGroup
            title="Provider"
            dataIndex="barangayDescription"
            key="barangayDescription"
          ></ColumnGroup>
          <ColumnGroup
            title="Actions"
            key="actions"
            fixed="right"
            width="35vh"
            render={(value) => (
              <Space>
                  ACTION BUTTONS
              </Space>
            )}
          ></ColumnGroup>
        </Table>
      </Row>
    </div>
  );
}

export default UsersTableList;
