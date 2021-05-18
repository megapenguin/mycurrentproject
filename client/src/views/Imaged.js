import { Image } from "antd";
import logo from "././logo.png";

function Imaged() {
  return (
    <Image
      preview={false}
      src={logo}
      style={{
        borderColor: "white",
        border: "10px",
        marginTop: "15px",
        padding: "10px",
      }}
    />
  );
}
export default Imaged;
