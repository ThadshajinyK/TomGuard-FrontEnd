import React, { useEffect, useState } from "react";
import "../Styles/ServerStyles.css";
import { Link } from "react-router-dom";
import speed from "../images/performance.png";
import logs from "../images/logs.png";
import axios from "../axios";
import { Icon } from "@iconify/react";
import ReactPaginate from "react-paginate";
import "../Styles/pagination.css";

export const MetricsTable = () => {
  const [metricsData, setMetricsData] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [alertToDelete, setAlertToDelete] = useState(null);

  const [searchBy, setSearchBy] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const SEARCH_BY = {
    UP_TIME: "UP_TIME",
    AVAILABILITY: "AVAILABILITY",
    REQ_TIME: "REQ_TIME",
    RES_TIME: "RES_TIME",
  };

  const deleteAllRecords = () => {
    // Make an API request to your backend to delete all records
    axios
      .delete(`/metrics/dltAll`)
      .then(() => {
        // Update the state to reflect the deletion
        setMetricsData([]);
        console.log("all Records deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting all records:", error);
      });
  };

  const handleDeleteMetrics = (id) => {
    // Make a DELETE request to the delete endpoint
    axios
      .delete(`/metrics/${id}`, {
        method: "DELETE",
      })
      .then((response) => {
        if (response.ok) {
          // Delete successful, perform any necessary actions (e.g., update UI)
          setMetricsData((prevData) =>
            prevData.filter((item) => item.id !== id)
          );
          console.log("Record deleted successfully");
        } else {
          // Delete failed, handle the error (e.g., show error message)
          console.error("Failed to delete record");
        }
      })
      .catch((error) => {
        // Handle network or other errors
        console.error("Error occurred while deleting record:", error);
      });
  };
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const offset = currentPage * itemsPerPage;
  const currentMetrics = metricsData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(metricsData.length / itemsPerPage);

  //to change availabilty color as per its value
  const getAvailabiltyColor = (availability) => {
    switch (availability) {
      case "online":
        return "rgb(54, 139, 84)";
      case "offline":
        return "rgb(190, 25, 25)";
      default:
        return "orange";
    }
  };

  const confirmDeleteAllMetrics = () => {
    setShowConfirmation(true);
  };

  const confirmDeleteMetric = (id) => {
    setAlertToDelete(id);
    setShowConfirmation(true);
  };

  const cancelDeleteMetric = () => {
    setShowConfirmation(false);
    setAlertToDelete(null);
  };

  const fetchMetrics = async () => {
    try {
      const metricsResponse = await axios.get("/metrics/all");
      setMetricsData(metricsResponse.data);
    } catch (error) {
      console.error("Error fetching metrics data:", error);
    }
  };

  useEffect(() => {
    fetchMetrics(); // Initial fetch

    // Polling every 5 seconds (adjust the interval as per your requirements)
    const interval = setInterval(fetchMetrics, 1000);

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, []);

  const filteredMetrics = currentMetrics.filter(
    (metrics) =>
      (searchBy === "" && metrics) ||
      (searchBy === SEARCH_BY.UP_TIME &&
        metrics.uptimeInMillis.toString().includes(searchInput)) ||
      (searchBy === SEARCH_BY.REQ_TIME &&
        metrics.requestTimeInMillis
          .toString()
          .toLowerCase()
          .includes(searchInput)) ||
      (searchBy === SEARCH_BY.RES_TIME &&
        metrics.responseTimeInMillis
          .toString()
          .toLowerCase()
          .includes(searchInput)) ||
      (searchBy === SEARCH_BY.AVAILABILITY &&
        metrics.availability.toLowerCase().includes(searchInput))
  );

  return (
    <div className="metricsContent">
      <nav className="navbar navbar-expand-lg bg-body-tertiary overView-nav">
        <div className="container-fluid">
          <h4>Metrics Table</h4>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
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

                <option value={SEARCH_BY.UP_TIME}>Up time</option>
                <option value={SEARCH_BY.AVAILABILITY}>Availability</option>
                <option value={SEARCH_BY.REQ_TIME}>Request time</option>
                <option value={SEARCH_BY.RES_TIME}>Response time</option>
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
          </div>
        </div>
      </nav>

      {/* Metrics Table */}
      <div className="table-responsive-xxl mt-5 metricTable">
        <table className="table table-striped ">
          <thead className="table-dark">
            <tr>
              {/*1st row */}
              <th className="text-center">Timestamp</th>
              <th className="text-center">Availability</th>
              <th className="text-center">uptime</th>
              <th className="text-center">Request time (ms)</th>
              <th className="text-center">Response Time (ms)</th>
              <th className="text-center">Memory Usage (%)</th>
              <th className="text-center">No of Sessions</th>
              <th className="text-center">Thread Count</th>

              <th>
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Delete"
                  onClick={confirmDeleteAllMetrics}
                >
                  {/* <Icon 
                  icon="material-symbols:delete-outline" 
                  color="#dc3545" 
                  width="25"
                  height="25"
                  /> */}
                  Delete All
                </button>
              </th>
            </tr>
          </thead>
          {/*2nd row*/}
          <tbody>
            {filteredMetrics.length === 0 ? (
              <p className="text-center m-2">No data Found !</p>
            ) : (
              filteredMetrics.map((metric) => (
                <tr key={metric.id}>
                   <td className="text-center">{metric.timestamp}</td>
                  <td className="text-center">
                    <span
                      className="badge rounded-pill"
                      style={{
                        backgroundColor: getAvailabiltyColor(
                          metric.availability
                        ),
                      }}
                    >
                      {metric.availability}{" "}
                    </span>
                  </td>
                  <td className="text-center">
                    {metric.uptimeInMillis !== 0
                      ? metric.uptimeInMillis
                      : "N/A"}
                  </td>
                  <td className="text-center">
                    {metric.requestTimeInMillis !== 0
                      ? metric.requestTimeInMillis
                      : "N/A"}
                  </td>
                  <td className="text-center">
                    {metric.responseTimeInMillis !== 0
                      ? metric.responseTimeInMillis
                      : "N/A"}
                  </td>
                  <td className="text-center">
                    {metric.responseTimeInMillis !== 0
                      ? metric.memoryUsage
                      : "N/A"}
                  </td>
                  <td className="text-center">
                    {metric.responseTimeInMillis !== 0
                      ? metric.noOfSession
                      : "N/A"}
                  </td>
                  <td className="text-center">
                    {metric.responseTimeInMillis !== 0
                      ? metric.threadCount
                      : "N/A"}
                  </td> 
                   <td>
                    <button
                      class="btn btn-link"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete"
                      onClick={() => confirmDeleteMetric(metric.id)}>
                      <Icon
                        icon="material-symbols:delete-outline"
                        color="#dc3545"
                        width="25"
                        height="25"
                      />
                    </button>
                  </td>
                  {/* ...other table cells... */}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {metricsData.length > itemsPerPage && (
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

      {showConfirmation && (
        <div className="confirmation-dialog">
          <div className="confirmation-message">
            Are you sure you want to delete{" "}
            {alertToDelete ? "this metric record?" : "all metrics Records?"}
          </div>
          <div className="confirmation-actions">
            <button
              type="button"
              className="btn btn-confirm"
              onClick={() => {
                if (alertToDelete) {
                  handleDeleteMetrics(alertToDelete);
                } else {
                  deleteAllRecords();
                }
                setShowConfirmation(false);
              }}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-cancel"
              onClick={cancelDeleteMetric}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const LogsTable = () => {
  const [logsData, setLogsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [alertToDelete, setAlertToDelete] = useState(null);

  const [searchBy, setSearchBy] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const SEARCH_BY = {
    LOG_LEVEL: "LOG_LEVEL",
    LOGGER_NAME: "LOGGER_NAME",
    THREAD_NAME: "THREAD_NAME",
    MESSAGE: "MESSAGE",
  };

  const deleteAllRecords = () => {
    // Make an API request to your backend to delete all records
    axios
      .delete(`/logs/dltAll`)
      .then(() => {
        // Update the state to reflect the deletion
        setLogsData([]);
        console.log("all Records deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting all records:", error);
      });
  };

  const handleDeleteLogs = (timestamp) => {
    // Make a DELETE request to the delete endpoint
    axios
    .delete(`/logs/${timestamp}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Delete successful, perform any necessary actions (e.g., update UI)
          setLogsData((prevData) =>
            prevData.filter((item) => item.timestamp !== timestamp)
          );
          console.log("Record deleted successfully");
        } else {
          // Delete failed, handle the error (e.g., show error message)
          console.error("Failed to delete record");
        }
      })
      .catch((error) => {
        // Handle network or other errors
        console.error("Error occurred while deleting record:", error);
      });
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const confirmDeleteLogs = (id) => {
    setAlertToDelete(id);
    setShowConfirmation(true);
  };

  const cancelDeletelog = () => {
    setShowConfirmation(false);
    setAlertToDelete(null);
  };

  const confirmDeleteAllLogs = () => {
    setShowConfirmation(true);
  };

  const getLogLevel = (logLevel) => {
    switch (logLevel) {
      case "INFO":
        return "rgb(54, 139, 84)"; // Green color
      case "DEBUG":
        return "rgb(0, 171, 193)"; //cyan color
      case "WARNING":
        return "rgb(247, 165, 49)"; //yellow color
      case "FATAL":
        return "rgb(62, 9, 7)"; //bold red color
      case "SEVERE":
        return "rgb(190, 25, 25)"; //red  color
      default:
        return "orange"; //orange color
    }
  };

  const fetchLogs = async () => {
    try {
      const logsResponse = await axios.get("/logs/all");
      setLogsData(logsResponse.data);
    } catch (error) {
      console.error("Error fetching logs data:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
    // Polling every 12 seconds (adjust the interval as per your requirements)
    const interval = setInterval(fetchLogs, 2000);

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, []);

  const offset = currentPage * itemsPerPage;
  const currentLogs = logsData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(logsData.length / itemsPerPage);

  const filteredLog = currentLogs.filter(
    (log) =>
      (searchBy === "" && log) ||
      (searchBy === SEARCH_BY.LOG_LEVEL &&
        log.logLevel
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase())) ||
      (searchBy === SEARCH_BY.LOGGER_NAME &&
        log.loggerName.toLowerCase().includes(searchInput.toLowerCase())) ||
      (searchBy === SEARCH_BY.THREAD_NAME &&
        log.threadName.toLowerCase().includes(searchInput.toLowerCase())) ||
      (searchBy === SEARCH_BY.MESSAGE &&
        log.message.toLowerCase().includes(searchInput.toLowerCase()))
  );

  return (
    <div className="logsContent">
      <nav className="navbar navbar-expand-lg bg-body-tertiary overView-nav">
        <div className="container-fluid">
          <h3>Logs Details</h3>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"> </ul>
            <div style={{ margin: "10px", width: "200px" }}>
              <select
                class="form-select "
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
              >
                <option hidden selected>
                  Search by
                </option>

                <option value={SEARCH_BY.LOG_LEVEL}>Log level</option>
                <option value={SEARCH_BY.LOGGER_NAME}>Logger name</option>
                <option value={SEARCH_BY.THREAD_NAME}>Thread name</option>
                <option value={SEARCH_BY.MESSAGE}>Message</option>
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
          </div>
        </div>
      </nav>
      <div className="table-responsive-xxl mt-4">
        <table className="table table-striped server-table">
          <thead className="table-dark">
            <tr>
              {/*1st row */}
              <th className="text-center">TimeStamp</th>
              <th className="text-center">Log Level</th>
              <th className="text-center">Logger Name</th>
              <th className="text-center">Thread Name</th>
              <th className="text-center">Message</th>
              <th>
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Delete"
                  onClick={confirmDeleteAllLogs}
                >
                  {/* <Icon 
                  icon="material-symbols:delete-outline" 
                  color="#dc3545" 
                  width="25"
                  height="25"
                  /> */}
                  Delete All
                </button>
              </th>{" "}
              {/*Delete button space */}
            </tr>
          </thead>
          {/*2nd row*/}
          <tbody>
            {filteredLog.length === 0 ? (
              <p className="text-center m-2">No data Found !</p>
            ) : (
              filteredLog.map((item) => (
                <tr key={item.timestamp}>
                  <td className="text-center">{item.timestamp}</td>
                  <td className="text-center">
                    <span
                      className="badge rounded-pill"
                      style={{
                        backgroundColor: getLogLevel(item.logLevel),
                      }}
                    >
                      {item.logLevel}
                    </span>
                  </td>
                  <td className="text-center">{item.loggerName}</td>
                  <td className="text-center">{item.threadName}</td>
                  <td className="text-center">{item.message}</td>
                  <td>
                    <button
                      class="btn btn-link"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete"
                      onClick={() => confirmDeleteLogs(item.timestamp)}
                    >
                      <Icon
                        icon="mdi:delete-outline"
                        color="#DC3545"
                        width="25"
                        height="25"
                      />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {logsData.length > itemsPerPage && (
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

      {showConfirmation && (
        <div className="confirmation-dialog">
          <div className="confirmation-message">
            Are you sure you want to delete{" "}
            {alertToDelete ? "this log record?" : "all logs records?"}
          </div>
          <div className="confirmation-actions">
            <button
              type="button"
              className="btn btn-confirm"
              onClick={() => {
                if (alertToDelete) {
                  handleDeleteLogs(alertToDelete);
                } else {
                  deleteAllRecords();
                }
                setShowConfirmation(false);
              }}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-cancel"
              onClick={cancelDeletelog}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const ServerPage = () => {
  const [data, setData] = useState([]);
  const [servers, setServers] = useState([]);

  const [searchBy, setSearchBy] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const SEARCH_BY = {
    HOST_NAME: "HOST_NAME",
    AVAILABILITY: "AVAILABILITY",
    UPTIME: "UPTIME",
    OS_NAME: "OS_NAME",
    OS_VERSION: "OS_VERSION",
  };

  useEffect(() => {
    loadservers();
  }, []);

  const loadservers = async () => {
    try {
      const response = await axios.get("/server");
      setServers(response.data);
    } catch (error) {
      console.error("Error occurred while loading servers:", error);
    }
  };
  const generateServerPDF = async () => {
    try {
      const response = await axios.get("/server/serverpdf", {
        responseType: "blob", // Set the response type to 'blob'
      });

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Servers.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(
        "Error occurred while generating or downloading the PDF:",
        error
      );
    }
  };

  const handleDelete = (hostName) => {
    fetch(`/server/${hostName}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Delete successful
          setData((prevData) =>
            prevData.filter((item) => item.hostName !== hostName)
          );
          console.log("Record deleted successfully");
        } else {
          // Delete failed
          console.error("Failed to delete record");
        }
      })
      .catch((error) => {
        // Handle network or other errors
        console.error("Error occurred while deleting record:", error);
      });
  };

  //to change availabilty color as per its value
  const getAvailabiltyColor = (availability) => {
    switch (availability) {
      case "online":
        return "rgb(54, 139, 84)";
      case "offline":
        return "rgb(190, 25, 25)";
      default:
        return "orange";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverResponse = await axios.get("/server/all");
        setData(serverResponse.data);
      } catch (error) {
        console.error("Error fetching server data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredServerData = data.filter(
    (server) =>
      (searchBy === "" && server) ||
      (searchBy === SEARCH_BY.AVAILABILITY &&
        server.availability
          .toLowerCase()
          .includes(searchInput.toLowerCase())) ||
      (searchBy === SEARCH_BY.HOST_NAME &&
        server.hostName.toLowerCase().includes(searchInput.toLowerCase())) ||
      (searchBy === SEARCH_BY.OS_NAME &&
        server.osName.toLowerCase().includes(searchInput.toLowerCase())) ||
      (searchBy === SEARCH_BY.OS_VERSION &&
        server.osVersion.toLowerCase().includes(searchInput.toLowerCase())) ||
      (searchBy === SEARCH_BY.UPTIME &&
        server.uptime.toLowerCase().includes(searchInput.toLowerCase()))
  );

  return (
    <div className="serverContent">
      {/* Apps Overview Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary overView-nav">
        <div className="container-fluid">
          <h3>Server Details</h3>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

            {/* <Link to="/addServer" className="btn btn-outline-primary me-2">
              Add new server
            </Link> */}
          </div>
        </div>
      </nav>

      {/* Server details in boxes */}

      {data.map((item) => (
        <div className="servergroup table-responsive-xxl mt-4">
          <table>
            <tr>
              <td className="text-end">
                <h5>Host Name:</h5>
              </td>
              <td>
                <p className="serverDetail">{item.hostName}</p>
              </td>
            </tr>
            <tr>
              <td className="text-end">
                <h5>IP address:</h5>
              </td>
              <td>
                <p className="serverDetail">{item.ipAddress}</p>
              </td>
            </tr>
            <tr>
              <td className="text-end">
                <h5>Availability:</h5>
              </td>
              <td>
                <h5
                  className="serverDetail"
                  style={{ color: getAvailabiltyColor(item.availability) }}
                >
                  {item.availability}
                </h5>
              </td>
            </tr>
          </table>
        </div>
      ))}
      <div className="accordion mb-4" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              View more in detail
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              {/* <strong>This is the first item's accordion body.</strong> It is shown by default,
             until the collapse plugin adds the appropriate classes that we use to style each element. 
             These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
              You can modify any of this with custom CSS or overriding our default variables. It's also worth noting 
             that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow. */}

              <nav className="navbar navbar-expand-lg bg-body-tertiary overView-nav">
                <div className="container-fluid">
                  <h3>More in detail</h3>
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

                    {/* <Link to="/addServer" className="btn btn-outline-primary me-2">
              Add new server
            </Link> */}

                    <div style={{ margin: "0 10px", width: "200px" }}>
                      <select
                        class="form-select "
                        value={searchBy}
                        onChange={(e) => setSearchBy(e.target.value)}
                      >
                        <option hidden selected>
                          Search by
                        </option>
                        <option value={SEARCH_BY.HOST_NAME}>Host name</option>
                        <option value={SEARCH_BY.AVAILABILITY}>
                          Availability
                        </option>
                        <option value={SEARCH_BY.UPTIME}>Up time</option>
                        <option value={SEARCH_BY.OS_NAME}>Os name</option>
                        <option value={SEARCH_BY.OS_VERSION}>Os version</option>
                      </select>
                    </div>
                    <div className="d-flex" role="search">
                      <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                      <button className="btn btn-outline-success">
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </nav>
              <div className="table-responsive-xxl mt-4">
                <table className="table table-striped server-table">
                  <thead className="table-dark">
                    <tr>
                      {/*1st row */}
                      <th className="text-center">Host name</th>
                      <th className="text-center">Availability</th>
                      <th>IP address</th>
                      <th className="text-center">server uptime</th>
                      <th className="text-center">OS Name</th>
                      <th className="text-center">OS Version</th>
                      <th className="text-center">OS Architecture</th>
                      <th className="text-center">JVM version</th>
                      {/* <th></th> */}
                    </tr>
                  </thead>
                  {/*2nd row*/}
                  <tbody>
                    {filteredServerData.length === 0 ? (
                      <p className="text-center m-2">No data Found !</p>
                    ) : (
                      filteredServerData.map((item) => (
                        <tr key={item.hostName}>
                          <td className="text-center">{item.hostName}</td>
                          <td className="text-center">
                            <span
                              className="badge rounded-pill"
                              style={{
                                backgroundColor:
                                  item.availability === "online"
                                    ? "rgb(54, 139, 84)" // Green color for 'online'
                                    : item.availability === "offline"
                                    ? "rgb(190, 25, 25)" // Red color for 'offline'
                                    : "orange", // Orange color for 'NotFound'
                              }}
                            >
                              {item.availability}
                            </span>
                          </td>
                          <td className="text-center">{item.ipAddress}</td>
                          <td className="text-center">{item.uptime}</td>
                          <td className="text-center">{item.osName}</td>
                          <td className="text-center">{item.osVersion}</td>
                          <td className="text-center">{item.osArchitecture}</td>
                          <td className="text-center">{item.jvmVersion}</td>
                          {/* <td><button
                          class="btn btn-link"
                          type="button"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Delete"
                          onClick={() => handleDelete(item.hostName)}>
                          <Icon
                            icon="mdi:delete-outline"
                            color="#DC3545"
                            width="25"
                            height="25" /></button></td> */}

                          {/* ...other table cells... */}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <button
                  onClick={generateServerPDF}
                  type="button"
                  className="btn btn-outline-info"
                >
                  Download pdf
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* accordian end */}

      {/* <div><Link to="/performance">Show Metrics Table</Link></div>
      <div><Link to="/logs">Show Logs Table</Link></div> */}

      <div className="perLogCards">
        <div class="row">
          <div class="col-sm-6 mb-5 mb-sm-0">
            <div class="card mb-5 ms-5 me-5">
              <div class="card-body">
                <h4 class="card-title text-center">Performance Metrics</h4>
                <div className="imagebox">
                  <img
                    src={speed}
                    alt="performance"
                    className="speedImage"
                  ></img>
                </div>
                <Link to="/performance" className="imagebox">
                  View Metrics
                  <Icon icon="bi:arrow-up" color="#0d6efd" rotate={1} />
                </Link>
              </div>
            </div>
          </div>
          <div class="col-sm-6 mb-5 mb-sm-0">
            <div class="card mb-5 ms-5 me-5">
              <div class="card-body">
                <h4 class="card-title text-center">Log Monitoring</h4>
                <div className="imagebox">
                  <img src={logs} alt="logs" className="logsImage"></img>
                </div>
                <Link to="/logs" className="imagebox">
                  View Logs
                  <Icon icon="bi:arrow-up" color="#0d6efd" rotate={1} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AddServerForm = () => {
  //Use states
  const [hostName, sethostName] = useState("");
  const [availability, setAvailability] = useState("");
  const [ipAddress, setipAddress] = useState("");
  const [uptime, setUptime] = useState("");
  const [osName, setOsName] = useState("");
  const [osVersion, setOsVersion] = useState("");
  const [osArchitecture, setOsArchitecture] = useState("");
  const [jvmVersion, setJvmVersion] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const server = {
      hostName,
      availability,
      ipAddress,
      uptime,
      osName,
      osVersion,
      osArchitecture,
      jvmVersion,
    };
    console.log(server);
    fetch("http://localhost:9090/server/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(server),
    }).then(() => {
      console.log("New server data added ");
    });
    setPopupMessage("Form submitted successfully!");

    sethostName("");
    setAvailability("");
    setipAddress("");
    setUptime("");
    setOsName("");
    setOsVersion("");
    setOsArchitecture("");
    setJvmVersion("");
  };

  return (
    <div className="formContent">
      <h1>Server Details</h1>
      <form className="row g-3 mt-3">
        <div className="col-md-6">
          <label htmlFor="hostName" className="form-label">
            Host Name
          </label>
          <input
            type="text"
            className="form-control"
            id="hostName"
            placeholder="Host Name"
            value={hostName}
            onChange={(e) => sethostName(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="availability" className="form-label">
            Availability
          </label>
          <input
            type="text"
            className="form-control"
            id="availability"
            placeholder="availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="ipAddress" className="form-label">
            IP address
          </label>
          <input
            type="text"
            className="form-control"
            id="ipAddress"
            placeholder="IP Address"
            value={ipAddress}
            onChange={(e) => setipAddress(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="uptime" className="form-label">
            Up time
          </label>
          <input
            type="text"
            className="form-control"
            id="uptime"
            placeholder="uptime"
            value={uptime}
            onChange={(e) => setUptime(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="osName" className="form-label">
            OS Name
          </label>
          <input
            type="text"
            className="form-control"
            id="osName"
            placeholder="OS Name"
            value={osName}
            onChange={(e) => setOsName(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="osVersion" className="form-label">
            OS Version
          </label>
          <input
            type="text"
            className="form-control"
            id="osVersion"
            placeholder="OS Version"
            value={osVersion}
            onChange={(e) => setOsVersion(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="osArchitecture" className="form-label">
            OS Architecture
          </label>
          <input
            type="text"
            className="form-control"
            id="osArchitecture"
            placeholder="OS Architecture"
            value={osArchitecture}
            onChange={(e) => setOsArchitecture(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="jvmVersion" className="form-label">
            JVM Version
          </label>
          <input
            type="text"
            className="form-control"
            id="jvmVersion"
            placeholder="JVM Version"
            value={jvmVersion}
            onChange={(e) => setJvmVersion(e.target.value)}
          />
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-outline-success m-3"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button type="submit" className="btn btn-outline-danger m-3">
            Cancel
          </button>
        </div>
      </form>

      {popupMessage && (
        <div className="alert alert-success">{popupMessage}</div>
      )}
    </div>
  );
};
