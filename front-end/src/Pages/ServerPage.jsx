import React, { useEffect, useState } from "react";
import "../Styles/ServerStyles.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '@iconify/react';


export const ServerPage = () => {
  const [data, setData] = useState([]);
  const [metricsData, setMetricsData] = useState([]);
  const handleDelete = (id) => {
    // Make a DELETE request to the delete endpoint
    fetch(`http://localhost:9090/server/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          // Delete successful, perform any necessary actions (e.g., update UI)
          setData(prevData => prevData.filter(item => item.id !== id));
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

  // useEffect(() => {
  //   axios.get('http://localhost:9090/server/all')
  //     .then(response => { setData(response.data); })
  //     .catch(error => { console.error('Error fetching data', error); });

  //   axios.get('http://localhost:9090/metrics/all')
  //     .then(response => {
  //       setMetricsData(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching metrics data', error);
  //     });

  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverResponse = await axios.get('http://localhost:9090/server/all');
        setData(serverResponse.data);
      } catch (error) {
        console.error('Error fetching server data:', error);
      }
  
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
    <div className="serverContent">
      {/* Apps Overview Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary overView-nav">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Server Details</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            </ul>
            <Link to="/addServer" className="btn btn-outline-primary me-2">
              Add new server
            </Link>
            
          </div>
        </div>
      </nav>
      <div className="table-responsive-xxl mt-4">
        <table className="table table-striped server-table" >
          <thead className="table-dark">
            <tr>{/*1st row */}
              <th className="text-center">TimeStamp</th>
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
              <tr key={item.id}>
                <td className="text-center">{item.timestamp}</td>
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
                onClick={() => handleDelete(item.id)}>
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

      <nav className="navbar navbar-expand-lg bg-body-tertiary overView-nav">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Metrics Records</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            </ul>
            <Link to="/addServer" className="btn btn-outline-primary me-2">
              Add new server
            </Link>
          
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

      {/* <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li className="page-item">
            <a className="page-link" href="#">Previous</a>
          </li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav> */}
      <div>

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



  //functions
  // const handleClick = (e) => {
  //   e.preventDefault()
  //   const server = { hostName, availability, ipAddress, uptime, osName, osVersion, osArchitecture,jvmVersion  }
  //   console.log(server)
  //   fetch("http://localhost:9090/metrics", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(server)
  //   }).then(() => {
  //     console.log("New server data added ")
  //   })
  // }

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
            jvmVersion
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


