import { routes } from "../../Routes/Routes";
import Headers from "../Headers/Headers";
import Sidebars from "../Sidebars/Sidebars";
import Player from "../../Components/Player/Player";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../Assets/Styles/Styles.scss";
import "./Main.scss";
import {openPlayerSelector} from '../../Components/Player/playerSlice';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';

function Main() {
  const isOpenPlayer = useSelector(openPlayerSelector);

  useEffect(() => {
    //Kiểm tra localStorage có tồn tại hay không?
    //Call api để kiểm tra id có tồn tại trên server hay không?
    //Hiển thị dữ liệu lên player, mở player
  }, [])

  return (
    <div className="wrapper">
      <div className={"row g-0"}>
        <div className="col-2">
          <Sidebars />
        </div>
        <div className="col-10">
          <div className="main-content">
            <Headers />
            <main>{routes}</main>
          </div>
        </div>
      </div>

      {
        localStorage.getItem("information") 
        &&
        <Player/>
      }
      
      

    </div>
  );
}

export default Main;
