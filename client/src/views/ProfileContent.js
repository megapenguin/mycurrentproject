import React, { Suspense } from "react";
import { Profile } from "../components/Profile";
import { SyncOutlined } from "@ant-design/icons";

function ProfileContent() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="icons-list">
            <SyncOutlined spin />
          </div>
        }
      >
        <Profile />
      </Suspense>
    </div>
  );
}

export default ProfileContent;
