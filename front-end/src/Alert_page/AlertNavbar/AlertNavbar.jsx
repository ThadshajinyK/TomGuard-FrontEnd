import { Link } from "react-router-dom";
import AlertTable from "../AlertTable/AlertTable";
import "./alertNavbar.css";
const AlertNavbar = () => {
  return (
   
    <div className="flex_containerNav">
      <div>
        <Link to="/alertTable" style={{ color: "red" }}>
          Alerts
        </Link>
      </div>
      <div>
        <Link to="/chat" style={{ color: "green" }}>
          Chat
        </Link>
      </div>
    </div>
    
  );
};

export default AlertNavbar;

