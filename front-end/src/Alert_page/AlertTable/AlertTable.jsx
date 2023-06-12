import Alertnavbar from "../AlertNavbar/AlertNavbar";
import { useState, useEffect } from "react";
import "./alertTable.css";
import AlertService from "../AlertService";

const AlertTable = () => {
  const [loading, setloading] = useState(true);
  const [alerts, setalerts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      try {
        const response = await AlertService.getAlerts();
        setalerts(response.data);
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    };
    fetchData();
  }, []);

  const deleteAlert = (e, id) => {
    e.preventDefault();
    AlertService.deleteAlert(id).then((res) => {
      if (alerts) {
        setalerts((prevElement) => {
          return prevElement.filter((alert) => alert.id !== id);
        });
      }
    });
  };

  return (
    <div>
      <div>
        <Alertnavbar />
      </div>
      <div className="tableContainer">
        <div className="container">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover ">
              <thead className="table-info">
                <tr>
                  <th>Alert Type</th>
                  <th>Severity Level</th>
                  <th>Description</th>
                  <th>Time of Occurance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {!loading && (
                <tbody className="table-group-divider">
                  {alerts.map((alert) => (
                    <tr key={alert.id}>
                      <td>{alert.alertType}</td>
                      <td>{alert.severityLevel}</td>
                      <td>{alert.description}</td>
                      <td>{alert.timeOfOccurance}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={(e, id) => deleteAlert(e, alert.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertTable;
