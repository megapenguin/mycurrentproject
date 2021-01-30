import React, { Suspense } from "react";

import { JeepneysChartShit } from "../components/dashboard2";

function JeepneyDasboard() {
    return (
        <div>
            <Suspense fallback={<h1>LOADING</h1>}>
        <JeepneysChartShit />
      </Suspense>
        </div>
    )
}

export default JeepneyDasboard
