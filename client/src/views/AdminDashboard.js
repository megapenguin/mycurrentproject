import React, { Suspense } from "react";

import { Dashboard } from "../components/Dashboard";
function AdminDashboard() {
  return (
    <div>
      <Suspense fallback={<h1>LOADING</h1>}>
        <Dashboard />
      </Suspense>
    </div>
  );
}

export default AdminDashboard;
