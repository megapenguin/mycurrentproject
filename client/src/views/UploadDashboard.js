import React, { Suspense } from "react";

import { ImageUpload } from "../components/dashboard5";

function UploadDashboard() {
  return (
    <div>
      <Suspense fallback={<h1>LOADING</h1>}>
        <ImageUpload />
      </Suspense>
    </div>
  );
}

export default UploadDashboard;
