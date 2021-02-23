import React, { useState, useEffect } from "react";
import { Divider, Typography } from "antd";

import axios from "axios";

function FunFactsTableList() {
  const { Title } = Typography;

  return (
    <div>
      <Divider>
        <Title level={4}>Fun Facts</Title>
      </Divider>
    </div>
  );
}

export default FunFactsTableList;
