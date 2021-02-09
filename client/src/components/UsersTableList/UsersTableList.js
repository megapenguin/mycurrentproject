import React, { Suspense, useEffect, useState } from "react";
import { Table, Tag, Space, Input, Row, Col, Button, Divider } from "antd";
import axios from "axios";
import Column from "antd/lib/table/Column";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import UsersInfoModal from "./UsersInfoModal";
// import usersInfoModal from "./usersInfoModal";
// import AddBarangayModal from "./AddBarangayModal";
// import EditBarangayModal from "./EditBarangayModal";
// import AddBarangayImageModal from "./AddBarangayImageModal";

function UsersTableList() {
  const [users, setUsers] = useState([]);
  const { Search } = Input;
  const [dataFromModal, setDataFromModal] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/users/")
      .then((res) => {
        // console.log(res);

        let data = res.data;
        setUsers(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onSearch = (value) => {
    axios.post("/api/v1/users/search_user", { value: value }).then((_res) => {
      console.log(_res);
      let data = _res.data;
      setUsers(data);
      console.log("success");
    });

    //console.log(value);
  };

  const modalClosed = () => {
    console.log("Passed data from modal", dataFromModal);
    axios.get("/api/v1/users/").then((res) => {
      //console.log(res);
      let data = res.data;
      setUsers(data);
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
        <Table dataSource={users} scroll={{ x: 1000, y: 500 }} sticky>
          {/* <ColumnGroup title="Id" dataIndex="id" key="id"></ColumnGroup> */}
          {/* <ColumnGroup title="Name" key="name"> */}
          <Column title="Provider" dataIndex="provider" key="provider"></Column>
          <ColumnGroup
            title="Email"
            dataIndex="email"
            key="email"
          ></ColumnGroup>

          <Column
            title="Firstname"
            dataIndex="firstName"
            key="firstName"
          ></Column>
          <Column title="Lastname" dataIndex="lastName" key="lastName"></Column>
          {/* </ColumnGroup> */}

          <ColumnGroup
            title="Actions"
            key="actions"
            fixed="right"
            width="35vh"
            render={(value) => (
              <Space>
                <UsersInfoModal
                  info={value}
                  passedData={setDataFromModal}
                  afterClosing={modalClosed}
                />
              </Space>
            )}
          ></ColumnGroup>
        </Table>
      </Row>
    </div>
  );
}

export default UsersTableList;
