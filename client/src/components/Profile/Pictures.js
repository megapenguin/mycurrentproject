import React, { useEffect, useState, useContext } from "react";
import { Row, Typography, Image } from "antd";

import axios from "axios";
import { AuthContext } from "../GlobalContext/AuthContext";

function Pictures() {
  let Auth = useContext(AuthContext);
  const { Title } = Typography;
  const [pictures, setPictures] = useState(null);
  const [userInfo, setUserInfo] = useState(Auth.state.userData);

  useEffect(() => {
    axios
      .post("/api/v1/images/search_images", {
        imageOwnerId: userInfo.id,
        imageReferenceId: 1,
      })
      .then((res) => {
        let data = res.data;
        setPictures(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
    console.log(pictures);
  }, []);

  const data = [
    {
      title: "Ant Design Title 1",
    },
  ];

  const deleteInstruction = (id) => {};
  return (
    <div>
      <Row>
        {pictures == null
          ? "None"
          : pictures.map((pic, index) => {
              <Row>
                {pic.imagePath}
                <Image src={`/api/v1/images/tasp8ve3OmoHiy9-lg.png`} />
              </Row>;
            })}
      </Row>
    </div>
  );
}

export default Pictures;
