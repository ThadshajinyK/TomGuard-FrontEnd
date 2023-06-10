import React, { useEffect, useState } from "react";
import "../Styles/ServerStyles.css";
import { Link } from 'react-router-dom';
import axios from 'axios';


export const ServerPage = () => {
  const [data, setData] = useState([]);
  const [metricsData, setMetricsData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9090/')
      .then(response => { setData(response.data); })
      .catch(error => { console.error('Error fetching data', error); });

    axios.get('http://localhost:9090/myMetrics/findMyMetrics')
      .then(response => {
        setMetricsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching metrics data', error);
      });

  }, []);

  return (
    <div className="serverContent">
      {/* Apps Overview Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary overView-nav">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Servers Overview</a>
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
      <div className="table-responsive-xxl mt-4">
        <table className="table table-striped server-table" >
          <thead className="table-dark">
            <tr>{/*1st row */}
              <th className="text-center">Server Id</th>
              <th className="text-center">Host name</th>
              <th className="text-center">Availability</th>
              <th>IP address</th>
              <th className="text-center">server uptime</th>
              <th className="text-center">OS Name</th>
              <th className="text-center">OS Version</th>
              <th className="text-center">OS Architecture</th>
              <th className="text-center">JVM version</th>
            </tr>
          </thead>
          {/*2nd row*/}
          <tbody>
            {data.map(item => (
              <tr key={item.serverId}>
                <td className="text-center">{item.serverId}</td>
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
                {/* ...other table cells... */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

              {/* Metrics Table */}
      <div className="table-responsive-xxl mt-5 metricTable">
        <table className="table table-striped " >
          <thead className="table-dark">
            <tr>{/*1st row */}
              <th className="text-center">Metrics Id</th>
              <th className="text-center">Availability</th>
              <th className="text-center">uptime</th>
              <th className="text-center">Request time</th>
              <th className="text-center">Response Time</th>
            </tr>
          </thead>
          {/*2nd row*/}
          <tbody>
            {metricsData.map(metric => (
              <tr key={metric.MetricId}>
                <td className="text-center">{metric.metricId}</td>
                <td className="text-center"><span className="badge rounded-pill" style={{backgroundColor
                     :metric.availability === "online"? 'rgb(54, 139, 84)' 
                     :metric.availability === "offline"? 'rgb(190, 25, 25)' 
                     : 'orange'}}>{metric.availability} </span>
                </td>
                <td className="text-center">{metric.uptimeInMillis}</td>
                <td className="text-center">{metric.requestTimeInMillis}</td>
                <td className="text-center">{metric.responseTimeInMillis}</td>
                {/* ...other table cells... */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Page navigation example">
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
      </nav>

    </div>
  );

}


export const AddServerForm = () => {

  //Use states
  const [hostName, sethostName] = useState('')
  const [ipAddress, setipAddress] = useState('')
  const [cpuCapacity, setcpuCapacity] = useState('')
  const [diskCapacity, setdiskCapacity] = useState('')
  const [memoryCapacity, setmemoryCapacity] = useState('')
  const [portNo, setportNo] = useState('')

  //functions
  const handleClick = (e) => {
    e.preventDefault()
    const server = { hostName, ipAddress, cpuCapacity, diskCapacity, memoryCapacity, portNo }
    console.log(server)
    fetch("http://localhost:9090/servers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(server)
    }).then(() => {
      console.log("New Student added")
    })
  }


  return (

    <div className="formContent">
       <h1>Server Details</h1>
      <form className="row g-3 mt-3">
        <div className="col-md-6">
          <label htmlFor="hostName" className="form-label">Host Name</label>
          <input type="text" className="form-control" id="hostName" value={hostName}
            onChange={(e) => sethostName(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label htmlFor="ipAddress" className="form-label">IP address</label>
          <input type="text" className="form-control" id="ipAddress" value={ipAddress}
            onChange={(e) => setipAddress(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="memoryCapacity" className="form-label">Memory capacity</label>
          <input type="text" className="form-control" id="memoryCapacity" placeholder="Memory"
            value={memoryCapacity} onChange={(e) => setmemoryCapacity(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="diskCapacity" className="form-label">Disk capacity</label>
          <input type="text" className="form-control" id="diskCapacity" placeholder="Disk"
            value={diskCapacity} onChange={(e) => setdiskCapacity(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="cpuCapacity" className="form-label">CPU capacity</label>
          <input type="text" className="form-control" id="cpuCapacity" placeholder="CPU"
            value={cpuCapacity} onChange={(e) => setcpuCapacity(e.target.value)} />
        </div>

        <div className="col-md-4">
          <label htmlFor="memoryCapacity" className="form-label">Memory capacity</label>
          <input type="text" className="form-control" id="memoryCapacity" placeholder="Memory"
            value={memoryCapacity} onChange={(e) => setmemoryCapacity(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="diskCapacity" className="form-label">Disk capacity</label>
          <input type="text" className="form-control" id="diskCapacity" placeholder="Disk"
            value={diskCapacity} onChange={(e) => setdiskCapacity(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="cpuCapacity" className="form-label">CPU capacity</label>
          <input type="text" className="form-control" id="cpuCapacity" placeholder="CPU"
            value={cpuCapacity} onChange={(e) => setcpuCapacity(e.target.value)} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-outline-success m-3" onClick={handleClick}>Submit</button>
          <button type="submit" className="btn btn-outline-danger m-3">Cancel</button>
        </div>

      </form> 
    </div>
  );

}


// export const AddServerForm = () =>{

//   return(
//     <div className="formContent">
//       <h1>Server Details</h1>
//       <form>
//   <div className="form-row">
//     <div className="col-md-4 mb-3">
//       <input type="text" className="form-control" id="validationDefault01" placeholder="First name" value="Mark" required/>
//     </div>
//     <div className="col-md-4 mb-3">
  
//       <input type="text" className="form-control" id="validationDefault02" placeholder="Last name" value="Otto" required/>
//     </div>
//     <div className="col-md-4 mb-3">
      
//       <div className="input-group">
//         <div className="input-group-prepend">
//           <span className="input-group-text" id="inputGroupPrepend2">@</span>
//         </div>
//         <input type="text" className="form-control" id="validationDefaultUsername" placeholder="Username" aria-describedby="inputGroupPrepend2" required/>
//       </div>
//     </div>
//   </div>
//   <div className="form-row">
//     <div className="col-md-6 mb-3">
      
//       <input type="text" className="form-control" id="validationDefault03" placeholder="City" required/>
//     </div>
//     <div className="col-md-3 mb-3">
      
//       <input type="text" className="form-control" id="validationDefault04" placeholder="State" required/>
//     </div>
//     <div className="col-md-3 mb-3">
      
//       <input type="text" className="form-control" id="validationDefault05" placeholder="Zip" required/>
//     </div>
//   </div>
//   <div className="form-group">
//     <div className="form-check">
//       <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" required/>
      
//         Agree to terms and conditions
      
//     </div>
//   </div>
//   <button className="btn btn-primary" type="submit">Submit form</button>
// </form>
//     </div>
//   );

// }