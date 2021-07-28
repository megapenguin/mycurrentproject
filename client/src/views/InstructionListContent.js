import React, { Suspense, useEffect } from "react";
import { ViewInstructions } from "../components/ViewInstructions";
import { SyncOutlined } from "@ant-design/icons";
import { withRouter, useParams } from "react-router-dom";

function InstructionListContent(props) {
  let titleId = useParams();

  // useEffect(() => {
  //   console.log("title", props);
  // }, [props]);
  return (
    <div>
      <Suspense
        fallback={
          <div className="icons-list">
            <SyncOutlined spin />
          </div>
        }
      >
        <ViewInstructions />
      </Suspense>
    </div>
  );
}

export default withRouter(InstructionListContent);
