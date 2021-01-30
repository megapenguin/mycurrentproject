import React, { Suspense } from "react";
import { DriversTableList } from "../components/DriversTableList";
import { SyncOutlined } from '@ant-design/icons';
function DriversTableListContent() {
  return (
    <div>
      <Suspense fallback={<div className="icons-list"><SyncOutlined spin/></div>}>
        <DriversTableList />
      </Suspense>
    </div>
  );
}

export default DriversTableListContent;