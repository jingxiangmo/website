import "./NavBar.css";
import { link  } from "react-router-dom";

function NavBar(){
    return(
        <div className="nav-bar">
            <p className="nav-home"> Jingxiang Mo </p>
            <div className="nav-links">
                <p> Projects </p>
                <p> Writings </p>
                
            </div>
    
        </div>

    );
}

export default NavBar;