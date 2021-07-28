import React, { Suspense } from "react";
import { SyncOutlined } from '@ant-design/icons';
import { Dashboard } from "../components/Dashboard";
function AdminDashboard() {
  return (
    <div>
      <Suspense fallback={<div className="icons-list"><SyncOutlined spin/></div>}>
        <Dashboard />
      </Suspense>
    </div>
  );
}

export default AdminDashboard;
