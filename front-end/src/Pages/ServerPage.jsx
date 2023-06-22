import React, { useEffect, useState } from "react";
import "../Styles/ServerStyles.css";
import { Link } from 'react-router-dom';
import speed from "../images/speed.png";
import logs from "../images/logs.png";
import axios from 'axios';
import { Icon } from '@iconify/react';

export const MetricsTable = () => {
  const [metricsData, setMetricsData] = useState([]);

  const handleDeleteMetrics = (id) => {
    // Make a DELETE request to the delete endpoint
    fetch(`http://localhost:9090/metrics/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          // Delete successful, perform any necessary actions (e.g., update UI)
          setMetricsData(prevData => prevData.filter(item => item.id !== id));
          console.log('Record deleted successfully');
        } else {
          // Delete failed, handle the error (e.g., show error message)
          console.error('Failed to delete record');
        }
      })
      .catch(error => {
        // Handle network or other errors
        console.error('Error occurred while deleting record:', error);
      });
  };


  useEffect(() => {
    const fetchData = async () => {

      try {
        const metricsResponse = await axios.get('http://localhost:9090/metrics/all');
        setMetricsData(metricsResponse.data);
      } catch (error) {
        console.error('Error fetching metrics data:', error);
      }

    };

    fetchData();
  }, []);

  return (
    <div className="metricsContent">
      <nav className="navbar navbar-expand-lg bg-body-tertiary overView-nav">
        <div className="container-fluid">
          <h4>Metrics Table</h4>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-success" type="submit">Search</button>
            </form>

          </div>
        </div>
      </nav>


      {/* Metrics Table */}
      <div className="table-responsive-xxl mt-5 metricTable">
        <table className="table table-striped " >
          <thead className="table-dark">
            <tr>{/*1st row */}
              <th className="text-center">Timestamp</th>
              <th className="text-center">Availability</th>
              <th className="text-center">uptime</th>
              <th className="text-center">Request time</th>
              <th className="text-center">Response Time</th>
              <th></th>
            </tr>
          </thead>
          {/*2nd row*/}
          <tbody>
            {metricsData.map(metric => (
              <tr key={metric.id}>
                <td className="text-center">{metric.timestamp}</td>
                <td className="text-center"><span className="badge rounded-pill" style={{
                  backgroundColor
                    : metric.availability === "online" ? 'rgb(54, 139, 84)'
                      : metric.availability === "offline" ? 'rgb(190, 25, 25)'
                        : 'orange'
                }}>{metric.availability} </span>
                </td>
                <td className="text-center">{metric.uptimeInMillis}</td>
                <td className="text-center">{metric.requestTimeInMillis}</td>
                <td className="text-center">{metric.responseTimeInMillis}</td>
                <td><button
                  class="btn btn-link"
                  type="button"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Delete"
                  onClick={() => handleDeleteMetrics(metric.id)}>
                  <Icon
                    icon="mdi:delete-outline"
                    color="#DC3545"
                    width="25"
                    height="25" /></button></td>
                {/* ...other table cells... */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>



  );

}

export const LogsTable = () => {
  const [logsData, setLogsData] = useState([]);
  const handleDeleteLogs = (timestamp) => {
    // Make a DELETE request to the delete endpoint
    fetch(`http://localhost:9090/logs/${timestamp}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          // Delete successful, perform any necessary actions (e.g., update UI)
          setLogsData(prevData => prevData.filter(item => item.timestamp !== timestamp));
          console.log('Record deleted successfully');
        } else {
          // Delete failed, handle the error (e.g., show error message)
          console.error('Failed to delete record');
        }
      })
      .catch(error => {
        // Handle network or other errors
        console.error('Error occurred while deleting record:', error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {

      try {
        const logsResponse = await axios.get('http://localhost:9090/logs/all');
        setLogsData(logsResponse.data);
      } catch (error) {
        console.error('Error fetching logs data:', error);
      }

    };

    fetchData();
  }, []);

  return (
    <div className="logsContent">
      <nav className="navbar navbar-expand-lg bg-body-tertiary overView-nav">
        <div className="container-fluid">
          <h3>Logs Details</h3>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-success" type="submit">Search</button>
            </form>


          </div>
        </div>
      </nav>
      <div className="table-responsive-xxl mt-4">
        <table className="table table-striped server-table" >
          <thead className="table-dark">
            <tr>{/*1st row */}
              <th className="text-center">TimeStamp</th>
              <th className="text-center">Log Level</th>
              <th className="text-center">Logger Name</th>
              <th className="text-center">Thread Name</th>
              <th className="text-center">Message</th>
              <th></th> {/*Delete button space */}
            </tr>
          </thead>
          {/*2nd row*/}
          <tbody>
            {logsData.map(item => (
              <tr key={item.timestamp}>
                <td className="text-center">{item.timestamp}</td>
                <td className="text-center">
                  <span className="badge rounded-pill"
                    style={{
                      backgroundColor:
                        item.logLevel === "INFO"
                          ? 'rgb(54, 139, 84)' // Green color 
                          : item.logLevel === "DEBUG"
                            ? 'rgb(0, 171, 193)' // cyan color 
                            : item.logLevel === "WARNING"
                              ? 'rgb(247, 165, 49)' // yellow color 
                              : item.logLevel === "FATAL"
                                ? 'rgb(62, 9, 7)' // bold red color 
                                : item.logLevel === "SEVERE"
                                  ? 'rgb(190, 25, 25)' // Red color 
                                  : 'orange' // Orange color for 'NotFound'
                    }}
                  >
                    {item.logLevel}
                  </span>
                </td>
                <td className="text-center">{item.loggerName}</td>
                <td className="text-center">{item.threadName}</td>
                <td className="text-center">{item.message}</td>
                <td><button
                  class="btn btn-link"
                  type="button"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Delete"
                  onClick={() => handleDeleteLogs(item.timestamp)}>
                  <Icon
                    icon="mdi:delete-outline"
                    color="#DC3545"
                    width="25"
                    height="25" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export const ServerPage = () => {
  const [data, setData] = useState([]);
  const handleDelete = (hostName) => {
    // Make a DELETE request to the delete endpoint
    fetch(`http://localhost:9090/server/${hostName}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          // Delete successful, perform any necessary actions (e.g., update UI)
          setData(prevData => prevData.filter(item => item.hostName !== hostName));
          console.log('Record deleted successfully');
        } else {
          // Delete failed, handle the error (e.g., show error message)
          console.error('Failed to delete record');
        }
      })
      .catch(error => {
        // Handle network or other errors
        console.error('Error occurred while deleting record:', error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverResponse = await axios.get('http://localhost:9090/server/all');
        setData(serverResponse.data);
      } catch (error) {
        console.error('Error fetching server data:', error);
      }

    };

    fetchData();
  }, []);


  return (
    <div className="serverContent">
      {/* Apps Overview Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary overView-nav">
        <div className="container-fluid">
          <h3>Server Details</h3>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            </ul>

            <Link to="/addServer" className="btn btn-outline-primary me-2">
              Add new server
            </Link>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

          </div>
        </div>
      </nav>


      {/* Server details in boxes */}


      {data.map(item => (
        <div className="servergroup table-responsive-xxl mt-4">
          <table>
            <tr>
              <td className="text-end"><h5>Host Name:</h5></td>
              <td ><p className="serverDetail">{item.hostName}</p></td>
            </tr>
            <tr>
              <td className="text-end"><h5>IP address:</h5></td>
              <td ><p className="serverDetail">{item.ipAddress}</p></td>
            </tr>
            <tr>
              <td className="text-end"><h5>Availabailty:</h5></td>
              <td><h5 className="serverDetail"
                style={{
                  color:
                    item.availability === "online"
                      ? 'rgb(54, 139, 84)' // Green color for 'online'
                      : item.availability === "offline"
                        ? 'rgb(190, 25, 25)' // Red color for 'offline'
                        : 'orange' // Orange color for 'NotFound'
                }}
              >
                {item.availability}
              </h5></td>
            </tr>
            {/* <tr>
              <td className="text-end"><h5>OS Name:</h5></td>
              <td><p className="serverDetail"> {item.osName}</p></td>
            </tr>

            <tr>
              <td className="text-end"><h5>OS Version:</h5></td>
              <td><p className="serverDetail"> {item.osVersion}</p></td>
            </tr>

            <tr>
              <td className="text-end"><h5>JVM version:</h5></td>
              <td><p className="serverDetail"> {item.jvmVersion}</p></td>
            </tr> */}
          </table>

        </div>
      ))}
      <div className="accordion mb-4" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              View more in detail
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              {/* <strong>This is the first item's accordion body.</strong> It is shown by default,
             until the collapse plugin adds the appropriate classes that we use to style each element. 
             These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
              You can modify any of this with custom CSS or overriding our default variables. It's also worth noting 
             that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow. */}
              <div className="table-responsive-xxl mt-4">
                <table className="table table-striped server-table" >
                  <thead className="table-dark">
                    <tr>{/*1st row */}
                      <th className="text-center">Host name</th>
                      <th className="text-center">Availability</th>
                      <th>IP address</th>
                      <th className="text-center">server uptime</th>
                      <th className="text-center">OS Name</th>
                      <th className="text-center">OS Version</th>
                      <th className="text-center">OS Architecture</th>
                      <th className="text-center">JVM version</th>
                      <th></th>
                    </tr>
                  </thead>
                  {/*2nd row*/}
                  <tbody>
                    {data.map(item => (
                      <tr key={item.hostName}>
                        <td className="text-center">{item.hostName}</td>
                        <td className="text-center">
                          <span className="badge rounded-pill"
                            style={{
                              backgroundColor:
                                item.availability === "online"
                                  ? 'rgb(54, 139, 84)' // Green color for 'online'
                                  : item.availability === "offline"
                                    ? 'rgb(190, 25, 25)' // Red color for 'offline'
                                    : 'orange' // Orange color for 'NotFound'
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
                        <td><button
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
                            height="25" /></button></td>

                        {/* ...other table cells... */}
                      </tr>
                    ))}
                  </tbody>
                </table>

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
                <div className="imagebox"><img src={speed} alt="performance" className="speedImage"></img></div>
                <Link to="/performance" className="imagebox">View Metrics<Icon icon="bi:arrow-up" color="#0d6efd" rotate={1} /></Link>
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
                <Link to="/logs" className="imagebox">View Logs<Icon icon="bi:arrow-up" color="#0d6efd" rotate={1} /></Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

}


export const AddServerForm = () => {

  //Use states
  const [hostName, sethostName] = useState('')
  const [availability, setAvailability] = useState('')
  const [ipAddress, setipAddress] = useState('')
  const [uptime, setUptime] = useState('')
  const [osName, setOsName] = useState('')
  const [osVersion, setOsVersion] = useState('')
  const [osArchitecture, setOsArchitecture] = useState('')
  const [jvmVersion, setJvmVersion] = useState('')
  const [popupMessage, setPopupMessage] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault()
    const server = { hostName, availability, ipAddress, uptime, osName, osVersion, osArchitecture, jvmVersion }
    console.log(server)
    fetch("http://localhost:9090/server/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(server)
    }).then(() => {
      console.log("New server data added ")
    })
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
          <button type="submit" className="btn btn-outline-success m-3" onClick={handleSubmit}>
            Submit
          </button>
          <button type="submit" className="btn btn-outline-danger m-3">
            Cancel
          </button>
        </div>
      </form>

      {popupMessage && <div className="alert alert-success">{popupMessage}</div>}
    </div>
  );

}


