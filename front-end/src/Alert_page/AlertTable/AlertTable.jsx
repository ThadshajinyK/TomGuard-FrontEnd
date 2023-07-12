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
import "./pagination.css";

const AlertTable = () => {
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [alertToDelete, setAlertToDelete] = useState(null);
  const itemsPerPage = 10;

  const [searchBy, setSearchBy] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const SEARCH_BY = {
    ALERT_TYPE: "ALERT_TYPE",
    SEVERITY_LEVEL: "SEVERITY_LEVEL",
  };

  useEffect(() => {
    fetchData(); // Fetch initial alerts

    // Start polling for new alerts every 12 seconds
    const interval = setInterval(fetchData, 12000);

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

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

  const filteredAlert = currentAlerts.filter(
    (alert) =>
      (searchBy === "" && alert) ||
      (searchBy === SEARCH_BY.ALERT_TYPE &&

        alert.alertType.toLowerCase(). includes(searchInput)) ||

      (searchBy === SEARCH_BY.SEVERITY_LEVEL &&
        alert.severityLevel.toLowerCase().includes(searchInput.toLowerCase()))
  );

  return (
    <div>
      <div className="tableContainer">
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-body-tertiary overView-nav">
            <div className="container-fluid ">
              <h3>Alert Details</h3>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                <div style={{ margin: "10px", width: "200px" }}>
                  <select
                    class="form-select "
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                  >
                    <option hidden selected>
                      Search by
                    </option>

                    <option value={SEARCH_BY.ALERT_TYPE}>Alert type</option>
                    <option value={SEARCH_BY.SEVERITY_LEVEL}>
                      Severity level
                    </option>
                  </select>
                </div>

                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </form>
                <div></div>
              </div>
            </div>
          </nav>
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
                      className="btn btn-outline-success"
                      onClick={confirmDeleteAllAlerts}
                    >
                      Solved all
                    </button>
                  </th>
                </tr>
              </thead>
              {!loading && (
                <tbody className="table-group-divider">
                  {filteredAlert.length === 0 ? (
                    <p className="text-center m-2">No data Found !</p>
                  ) : (
                    filteredAlert.map((alert) => (
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
                            icon="mdi:shield-tick-outline"
                            className="deleteButton"
                            onClick={() => confirmDeleteAlert(alert.id)}
                          />
                        </td>
                      </tr>
                    ))
                  )}
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
            Have you successfully resolved{" "}
            {alertToDelete ? "this issue?" : "these issues?"}
            <div className="iconAndWarn">
              <Icon icon="uiw:warning" className="warnIcon" />
              <span className="warningMessage">
                If you click yes
                {alertToDelete
                  ? " this alert message "
                  : " all alert messages "}{" "}
                will be permanently deleted !
              </span>
            </div>
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
