import React, { Suspense } from "react";
import { FunFactsTableList } from "../components/FunFactsTableList";
import { SyncOutlined } from "@ant-design/icons";
function FunFactsTableListContents() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="icons-list">
            <SyncOutlined spin />
          </div>
        }
      >
        <FunFactsTableList />
      </Suspense>
    </div>
  );
}

export default FunFactsTableListContents;
