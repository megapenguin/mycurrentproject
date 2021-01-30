import React, { Suspense } from "react";
import { JeepneysTableList } from "../components/JeepneysTableList";
import { SyncOutlined } from '@ant-design/icons';

function JeepneysTableListContent() {
    return (
        <div>
            <Suspense fallback={<div className="icons-list"><SyncOutlined spin/></div>}>
                <JeepneysTableList />
            </Suspense>
        </div>
    )
}

export default JeepneysTableListContent;
