import React, { Suspense } from "react";

import { ImageUploadChartShit } from "../../components/dashboard4";

function ImageUploadDashboard() {
  return (
    <div>
      <Suspense fallback={<h1>LOADING</h1>}>
        <ImageUploadChartShit />
      </Suspense>
    </div>
  );
}

export default ImageUploadDashboard;
