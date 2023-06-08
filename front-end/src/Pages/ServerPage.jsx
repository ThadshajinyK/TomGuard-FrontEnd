import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import "../Styles/ServerStyles.css";
import { Link } from 'react-router-dom';
import axios from 'axios';


export const ServerPage = () => {
  const [data,setData] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:9090/')
    .then(response =>{setData(response.data);})
    .catch(error =>{console.error('Error fetching data',error);});
  },[]);

  return (
    <div className="serverContent">
      {/* Apps Overview Navbar */}
      <nav class="navbar navbar-expand-lg bg-body-tertiary overView-nav">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Servers Overview</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">

            </ul>
            <Link to="/addServer" className="btn btn-outline-primary me-2">
                                Add new server
                            </Link>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      <div className="table-responsive-xxl mt-4">
        <table className="table table-striped server-table" >
          <thead className="table-dark">
            <tr>{/*1st row */}
              <th>Server Id</th>
              <th  class="text-center">Host name</th>
              <th  class="text-center">Availability</th>
              <th>IP address</th>
              <th class="text-center">server port</th>
              <th class="text-center">server uptime</th>
              <th  class="text-center">CPU capacity</th>
              <th  class="text-center">Disk capacity</th>
              <th  class="text-center">memory capacity</th>
              <th  class="text-center">server location</th>
              <th class="text-center">server name</th>
              
              
              
            </tr>
          </thead>
          {/*2nd row*/}
          <tbody>
          {data.map(item => (
            <tr key={item.serverId}>
              <td>{item.serverId}</td>
              <td className="text-center">{item.hostName}</td>
              <td className="text-center">{item.availability}</td>
              <td className="text-center">{item.ipAddress}</td>
              <td className="text-center">{item.serverPort}</td>
              <td className="text-center">{item.uptime}</td>
              <td className="text-center">{item.serverCpuCapacity}</td>
              <td className="text-center">{item.serverDiskCapacity}</td>
              <td className="text-center">{item.serverMemoryCapacity}</td>
              <td className="text-center">{item.serverLocation}</td>
              <td className="text-center">{item.serverName}</td>
              
              
              {/* ...other table cells... */}
            </tr>
          ))}
        </tbody>
        </table>
      </div>

      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-end">
          <li class="page-item">
            <a class="page-link" href="#">Previous</a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>

    </div>
  );

}

// export const ServerPage = () => {
//   const server = [
//     { host_name: 'server1', ip_address: '192.168.1.100', status: 'online', server_location: 'New York', cpu: 2.4, memory: 16.0, disk: 500.0, uptime: "6 days",ins:"instance1, instance2, instance3"},
//     { host_name: 'server2', ip_address: '192.168.1.101', status: 'online', server_location: 'California', cpu: 2.6, memory: 32.0, disk: 1000.0, uptime: "6 days",ins:"instance1, instance2, instance3" },
//     { host_name: 'server3', ip_address: '192.168.1.102', status: 'offline', server_location: 'Texas', cpu: 2.8, memory: 64.0, disk: 2000.0, uptime: "6 days",ins:"instance1, instance2, instance3" },
//     { host_name: 'server4', ip_address: '192.168.1.103', status: 'online', server_location: 'New York', cpu: 2.4, memory: 16.0, disk: 500.0, uptime: "6 days" ,ins:"instance1, instance2, instance3"},
//     { host_name: 'server5', ip_address: '192.168.1.104', status: 'online', server_location: 'California', cpu: 2.6, memory: 32.0, disk: 1000.0, uptime: "6 days",ins:"instance1, instance2, instance3" },
//     { host_name: 'server6', ip_address: '192.168.1.105', status: 'offline', server_location: 'Texas', cpu: 2.8, memory: 64.0, disk: 2000.0, uptime: "6 days",ins:"instance1, instance2, instance3" },
//     { host_name: 'server7', ip_address: '192.168.1.106', status: 'online', server_location: 'New York', cpu: 2.4, memory: 16.0, disk: 500.0, uptime: "6 days",ins:"instance1, instance2, instance3" },
//     { host_name: 'server8', ip_address: '192.168.1.107', status: 'online', server_location: 'California', cpu: 2.6, memory: 32.0, disk: 1000.0, uptime: "6 days" ,ins:"instance1, instance2, instance3"},
//     { host_name: 'server9', ip_address: '192.168.1.108', status: 'offline', server_location: 'Texas', cpu: 2.8, memory: 64.0, disk: 2000.0, uptime: "6 days",ins:"instance1, instance2, instance3" },
//     { host_name: 'server10', ip_address: '192.168.1.109', status: 'online', server_location: 'New York', cpu: 2.4, memory: 16.0, disk: 500.0, uptime: "6 days" ,ins:"instance1, instance2, instance3"},
//   ];

//   return (
//     <div className="serverContent">
//       {/* Apps Overview Navbar */}
//       <nav class="navbar navbar-expand-lg bg-body-tertiary overView-nav">
//         <div class="container-fluid">
//           <a class="navbar-brand" href="#">Servers Overview</a>
//           <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//             <span class="navbar-toggler-icon"></span>
//           </button>
//           <div class="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul class="navbar-nav me-auto mb-2 mb-lg-0">

//             </ul>
//             <Link to="/addServer" className="btn btn-outline-primary me-2">
//                                 Add new server
//                             </Link>
//             <form class="d-flex" role="search">
//               <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
//               <button class="btn btn-outline-success" type="submit">Search</button>
//             </form>
//           </div>
//         </div>
//       </nav>
//       <div className="table-responsive-xxl mt-4">
//         <table className="table table-striped server-table" >
//           <thead className="table-dark">
//             <tr>{/*1st row */}
//               <th>Server Id</th>
//               <th  class="text-center">Availability</th>
//               <th  class="text-center">Host name</th>
//               <th>IP address</th>
//               <th  class="text-center">CPU capacity</th>
//               <th  class="text-center">Disk capacity</th>
//               <th  class="text-center">server location</th>
//               <th  class="text-center">memory capacity</th>
//               <th class="text-center">server name</th>
//               <th class="text-center">server port</th>
//               <th class="text-center">server uptime</th>
//             </tr>
//           </thead>
//           {/*2nd row*/}
//           {server.map((val, key) => {
//             return (
//               <tbody>
//                 <tr key={key}>
//                   <td><a href="/Servers/Instance">{val.host_name}</a><Icon icon="tabler:player-track-next-filled" color="#36b5bd" /></td>
//                   <td  class="text-center">{val.ip_address}</td>
//                   <td  class="text-center">{val.host_name}</td>
//                   <td>
//                     <span className="badge" style={{ backgroundColor: val.status === "online" ? 'rgb(54, 139, 84)' : 'rgb(190, 25, 25)' }}>
//                       {val.status}
//                     </span>
//                   </td>
//                   {/* <td>
//                     <span className={`badge text-bg-${val.status === "online" ? "success" : "danger"}`}>
//                       {val.status}
//                     </span>
//                   </td> */}
//                   <td  class="text-center">{val.cpu}</td>
//                   <td  class="text-center">{val.memory}</td>
//                   <td  class="text-center">{val.disk}</td>
//                   <td  class="text-center">{val.uptime}</td>
//                   <td  class="text-center">{val.ins}</td>
//                 </tr>
//               </tbody>

//             )
//           })}


//         </table>
//       </div>

//       <nav aria-label="Page navigation example">
//         <ul class="pagination justify-content-end">
//           <li class="page-item">
//             <a class="page-link" href="#">Previous</a>
//           </li>
//           <li class="page-item"><a class="page-link" href="#">1</a></li>
//           <li class="page-item"><a class="page-link" href="#">2</a></li>
//           <li class="page-item"><a class="page-link" href="#">3</a></li>
//           <li class="page-item">
//             <a class="page-link" href="#">Next</a>
//           </li>
//         </ul>
//       </nav>

//     </div>
//   );

// }

export const AddServerForm = () => {
  return (
    <div className="formContent">
      <h1>Server Details</h1>
      <form class="row g-3 mt-3">
        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">Host Name</label>
          <input type="text" class="form-control" id="appName" />
        </div>
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">IP address</label>
          <input type="text" class="form-control" id="clientName" />
        </div>
        <div class="col-md-4">
          <label for="inputAddress" class="form-label">Memory capacity</label>
          <input type="text" class="form-control" id="appType" placeholder="Memory" />
        </div>
        <div class="col-md-4">
          <label for="inputAddress2" class="form-label">Disk capacity</label>
          <input type="text" class="form-control" id="appVersion" placeholder="Disk" />
        </div>
        <div class="col-md-4">
          <label for="inputAddress2" class="form-label">CPU capacity</label>
          <input type="text" class="form-control" id="appVersion" placeholder="CPU" />
        </div>
        <div class="col-md-4">
          <fieldset class="row">
            <legend class="col-form-label col-sm-2 pt-0">Status</legend>
            <div class="col-sm-10">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="status" id="status" value="online" />
                <label class="form-check-label" for="gridRadios1">
                  online
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="status" id="status" value="offline" />
                <label class="form-check-label" for="gridRadios2">
                  offline
                </label>
              </div>
            </div>
          </fieldset>
      
        </div>
        <div class="col-md-4">
          <label for="inputAddress2" class="form-label">Server Port no</label>
          <input type="text" class="form-control" id="appVersion" placeholder="type app version" />
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">Add server</button>
        </div>
      </form>
    </div>
  );

}

export const AddServerForm2 = () => {

  //Use states
  const[hostName, sethostName] = useState('')
  const[ipAddress, setipAddress] = useState('')
  const[cpuCapacity, setcpuCapacity] = useState('')
  const[diskCapacity, setdiskCapacity] = useState('')
  const[memoryCapacity, setmemoryCapacity] = useState('')
  const[portNo, setportNo] = useState('')
 
  //functions
  const handleClick=(e)=>{
   e.preventDefault()
   const server={hostName, ipAddress, cpuCapacity, diskCapacity, memoryCapacity, portNo}
   console.log(server)
   fetch("http://localhost:9090/servers",{
     method: "POST",
     headers:{"Content-Type":"application/json"},
     body:JSON.stringify(server)
   }).then(()=>{
     console.log("New Student added")
   })
  }
 
 
   return (
     
     <div className="formContent">
       <h1>Server Details</h1>
       <form class="row g-3 mt-3">
         <div class="col-md-6">
           <label for="hostName" class="form-label">Host Name</label>
           <input type="text" class="form-control" id="hostName" value={hostName}
           onChange={(e)=>sethostName(e.target.value)}/>
         </div> 
         <div class="col-md-6">
           <label for="ipAddress" class="form-label">IP address</label>
           <input type="text" class="form-control" id="ipAddress" value={ipAddress}
           onChange={(e)=>setipAddress(e.target.value)}/>
         </div>
         <div class="col-md-4">
           <label for="memoryCapacity" class="form-label">Memory capacity</label>
           <input type="text" class="form-control" id="memoryCapacity" placeholder="Memory" 
           value={memoryCapacity} onChange={(e)=>setmemoryCapacity(e.target.value)}/>
         </div>
         <div class="col-md-4">
           <label for="diskCapacity" class="form-label">Disk capacity</label>
           <input type="text" class="form-control" id="diskCapacity" placeholder="Disk" 
           value={diskCapacity} onChange={(e)=>setdiskCapacity(e.target.value)}/>
         </div>
         <div class="col-md-4">
           <label for="cpuCapacity" class="form-label">CPU capacity</label>
           <input type="text" class="form-control" id="cpuCapacity" placeholder="CPU" 
           value={cpuCapacity} onChange={(e)=>setcpuCapacity(e.target.value)}/>
         </div>
        
         <div class="col-md-4">
           <label for="serverPortNo" class="form-label">Port no</label>
           <input type="text" class="form-control" id="appVersion" placeholder="server port no" 
           value={portNo} onChange={(e)=>setportNo(e.target.value)}/>
         </div>
         <div class="col-12">
           <button type="submit" class="btn btn-outline-success m-3" onClick={handleClick}>Submit</button>
           <button type="submit" class="btn btn-outline-danger m-3">Cancel</button>
         </div>
         
       </form>
     </div>
   );
 
 }