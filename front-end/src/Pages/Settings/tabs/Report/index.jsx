import "./styles.css";
import Form from "react-bootstrap/Form";
import ToggleButton from "./ToggleButton";
import { ReactComponent as DownIcon } from "../../../../icons/chevron-down.svg";
import { ReactComponent as RightIcon } from "../../../../icons/chevron-right.svg";

const Report = () => {
  return (
    
    <div className="report-container">
      <div className="flex-item">
        <h5>Report schedule</h5>
        <Form.Check type="switch" id="custom-switch" />
      </div>
      {/* <ToggleButton /> */}
      <div className="action-btn">
        Generate Report
        <DownIcon />
      </div>
      <div className="action-btn">
        Sent to Email <RightIcon />
      </div>
      <div />
    </div>
  );
};

export default Report;
