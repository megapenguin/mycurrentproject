import React, { Suspense } from "react";
import { BarangaysTableList } from "../components/BarangaysTableList";
import { SyncOutlined } from '@ant-design/icons';
function BarangaysTableListContent() {
  return (
    <div>
      <Suspense fallback={<div className="icons-list"><SyncOutlined spin/></div>}>
        <BarangaysTableList />
      </Suspense>
    </div>
  );
}

export default BarangaysTableListContent;