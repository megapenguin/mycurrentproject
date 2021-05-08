import { Image } from "antd";
import logo from "././logo.png";

function Imaged() {
  return (
    <Image
      preview={false}
      width={120}
      src={logo}
      style={{ borderColor: "white", border: "10px", marginTop: "15px" }}
    />
  );
}
export default Imaged;
