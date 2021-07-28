import React, { Suspense } from "react";
import { UsersTableList } from "../components/UsersTableList";
import { SyncOutlined } from '@ant-design/icons';

function UsersTableListContent() {
  return (
    <div>
      <Suspense fallback={<div className="icons-list"><SyncOutlined spin/></div>}>
        <UsersTableList />
      </Suspense>
    </div>
  );
}

export default UsersTableListContent;