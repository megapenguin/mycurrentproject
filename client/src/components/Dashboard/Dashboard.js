import React from "react";
import { Divider, Typography } from "antd";
function Dashboard() {
  const { Title } = Typography;

  return (
    <div>
      <Divider>
        <Title level={4}>Welcome</Title>
      </Divider>
    </div>
  );
}

export default Dashboard;
