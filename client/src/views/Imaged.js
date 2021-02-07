import { Image } from 'antd';
import logo from '././logo.png'

function Imaged() {
  return (
    <Image
      preview={false}
      height={100}
      src ={logo}
      style ={{borderColor: 'white', border: '10px', borderRadius: '50%'}}
    />
  );
}
export default Imaged