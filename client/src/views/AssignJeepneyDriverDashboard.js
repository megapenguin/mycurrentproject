import React, { Suspense } from "react";
import { SyncOutlined } from "@ant-design/icons";
import { AssignJeepneyDriver } from "../components/AssignJeepneyDriver";
function AssignJeepneyDriverDashboard() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="icons-list">
            <SyncOutlined spin />
          </div>
        }
      >
        <AssignJeepneyDriver />
      </Suspense>
    </div>
  );
}

export default AssignJeepneyDriverDashboard;
