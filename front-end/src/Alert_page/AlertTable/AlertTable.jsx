// import React, { useState, useEffect } from "react";
// import "./alertTable.css";
// import AlertService from "../AlertService";
// import { Icon } from "@iconify/react";

// const AlertTable = () => {
//   const [loading, setLoading] = useState(true);
//   const [alerts, setAlerts] = useState(null);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [alertToDelete, setAlertToDelete] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await AlertService.getAlerts();
//         setAlerts(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   const deleteAlert = (id) => {
//     AlertService.deleteAlert(id).then(() => {
//       setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
//     });
//   };

//   const confirmDeleteAlert = (id) => {
//     setAlertToDelete(id);
//     setShowConfirmation(true);
//   };

//   const cancelDeleteAlert = () => {
//     setShowConfirmation(false);
//     setAlertToDelete(null);
//   };

//   const deleteAllAlerts = () => {
//     AlertService.deleteAllAlert().then(() => {
//       setAlerts([]);
//     });
//   };

//   const confirmDeleteAllAlerts = () => {
//     setShowConfirmation(true);
//   };

//   const getSeverityColor = (severityLevel) => {
//     switch (severityLevel) {
//       case "High":
//         return "darkred";
//       case "Medium":
//         return "darkorange";
//       case "Low":
//         return "darkgreen";
//       default:
//         return "black";
//     }
//   };

//   return (
//     <div>
//       <div className="tableContainer">
//         <div className="container">
//           <div className="table-responsive">
//             <table className="table table-striped">
//               <thead className="table-dark">
//                 <tr>
//                   <th>Alert Type</th>
//                   <th>Severity Level</th>
//                   <th>Description</th>
//                   <th>Time of Occurrence</th>
//                   <th>
//                     <button
//                       type="button"
//                       className="btn btn-outline-danger"
//                       onClick={confirmDeleteAllAlerts}
//                     >
//                       Delete all
//                     </button>
//                   </th>
//                 </tr>
//               </thead>
//               {!loading && (
//                 <tbody className="table-group-divider">
//                   {alerts.map((alert) => (
//                     <tr key={alert.id}>
//                       <td>{alert.alertType}</td>
//                       <td>
//                         <span
//                           style={{ color: getSeverityColor(alert.severityLevel) }}
//                         >
//                           {alert.severityLevel}
//                         </span>
//                       </td>
//                       <td>{alert.description}</td>
//                       <td>{alert.timeOfOccurance}</td>
//                       <td>
//                         <Icon
//                           icon="uiw:delete"
//                           className="deleteButton"
//                           onClick={() => confirmDeleteAlert(alert.id)}
//                         />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               )}
//             </table>
//           </div>
//         </div>
//       </div>
//       {showConfirmation && (
//         <div className="confirmation-dialog">
//           <div className="confirmation-message">
//             Are you sure you want to delete{" "}
//             {alertToDelete ? "this alert?" : "all alerts?"}
//           </div>
//           <div className="confirmation-actions">
//             <button
//               type="button"
//               className="btn btn-confirm"
//               onClick={() => {
//                 if (alertToDelete) {
//                   deleteAlert(alertToDelete);
//                 } else {
//                   deleteAllAlerts();
//                 }
//                 setShowConfirmation(false);
//               }}
//             >
//               Yes
//             </button>
//             <button
//               type="button"
//               className="btn btn-cancel"
//               onClick={cancelDeleteAlert}
//             >
//               No
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AlertTable;

import React, { useState, useEffect } from "react";
import "./alertTable.css";
import AlertService from "../AlertService";
import { Icon } from "@iconify/react";
import ReactPaginate from "react-paginate";
import "./pagination.css"

const AlertTable = ({ onAlertCountChange }) => {
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [alertToDelete, setAlertToDelete] = useState(null);
  const [alertCount, setAlertCount] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData(); // Fetch initial alerts

    // Start polling for new alerts every 10 seconds
    const interval = setInterval(fetchData, 10000);

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  useEffect(() => {
    setAlertCount(alerts.length);
    onAlertCountChange(alerts.length);
  }, [alerts,onAlertCountChange]);

  const fetchData = async () => {
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

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
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

  const offset = currentPage * itemsPerPage;
  const currentAlerts = alerts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(alerts.length / itemsPerPage);

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
                  {currentAlerts.map((alert) => (
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
          {!loading && alerts.length > itemsPerPage && (
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              pageClassName={"border-box"}
            />
          )}
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

