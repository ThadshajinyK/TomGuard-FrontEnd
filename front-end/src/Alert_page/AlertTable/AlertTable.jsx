import React, { useState, useEffect } from "react";
import "./alertTable.css";
import AlertService from "../AlertService";
import { Icon } from "@iconify/react";

const AlertTable = () => {
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [alertToDelete, setAlertToDelete] = useState(null);
  const [alertCount, setAlertCount] = useState(0);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const response = await AlertService.getAlerts();
      setAlerts(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const deleteAlert = (id) => {
    AlertService.deleteAlert(id).then(() => {
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
    });
  };

  const confirmDeleteAlert = (id) => {
    setAlertToDelete(id);
    setShowConfirmation(true);
  };

  const cancelDeleteAlert = () => {
    setShowConfirmation(false);
    setAlertToDelete(null);
  };

  const deleteAllAlerts = () => {
    AlertService.deleteAllAlert().then(() => {
      setAlerts([]);
    });
  };

  const confirmDeleteAllAlerts = () => {
    setShowConfirmation(true);
  };

  const getSeverityColor = (severityLevel) => {
    switch (severityLevel) {
      case "High":
        return "darkred";
      case "Medium":
        return "darkorange";
      case "Low":
        return "darkgreen";
      default:
        return "black";
    }
  };

  useEffect(() => {
    fetchAlerts(); // Initial fetch

    // Polling every 12 seconds (adjust the interval as per your requirements)
    const interval = setInterval(fetchAlerts, 12000);

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, []);

  useEffect(() => {
    setAlertCount(alerts.length);
  }, [alerts]);
  
  console.log(alertCount);
  return (
    <div>
      <div className="alertCount">Total Alerts: {alertCount}</div>
      <div className="tableContainer">
        <div className="container">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Alert Type</th>
                  <th>Severity Level</th>
                  <th>Description</th>
                  <th>Time of Occurrence</th>
                  <th>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={confirmDeleteAllAlerts}
                    >
                      Delete all
                    </button>
                  </th>
                </tr>
              </thead>
              {!loading && (
                <tbody className="table-group-divider">
                  {alerts.map((alert) => (
                    <tr key={alert.id}>
                      <td>{alert.alertType}</td>
                      <td>
                        <span
                          style={{
                            color: getSeverityColor(alert.severityLevel),
                          }}
                        >
                          {alert.severityLevel}
                        </span>
                      </td>
                      <td>{alert.description}</td>
                      <td>{alert.timeOfOccurance}</td>
                      <td>
                        <Icon
                          icon="uiw:delete"
                          className="deleteButton"
                          onClick={() => confirmDeleteAlert(alert.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <div className="confirmation-dialog">
          <div className="confirmation-message">
            Are you sure you want to delete{" "}
            {alertToDelete ? "this alert?" : "all alerts?"}
          </div>
          <div className="confirmation-actions">
            <button
              type="button"
              className="btn btn-confirm"
              onClick={() => {
                if (alertToDelete) {
                  deleteAlert(alertToDelete);
                } else {
                  deleteAllAlerts();
                }
                setShowConfirmation(false);
              }}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-cancel"
              onClick={cancelDeleteAlert}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertTable;
