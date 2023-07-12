import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../axios';

function Gutters({ hostName }) {
  const [servers, setServers] = useState([]);
  const [apps, setApps] = useState([]);
  const [data, setData] = useState([]);
  


  useEffect(() => {
    loadServerCount();
  }, []);

  const loadServerCount = async () => {
    try {
      const response = await axios.get("/server/servercount");
      setServers(response.data);
    } catch (error) {
      console.error('Error occurred while loading server count:', error);
    }
  };

  useEffect(() => {
    loadappCount();
  }, []);

  const loadappCount = async () => {
    try {
      const response = await axios.get("/apps/appcount");
      setApps(response.data);
    } catch (error) {
      console.error('Error occurred while loading app count:', error);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const serverResponse = await axios.get('http://localhost:9090/server/all');
  //       setData1(serverResponse.data);
  //     } catch (error) {
  //       console.error('Error fetching server data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);


  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:9090/api/metrics/all");
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error("Failed to fetch metrics data");
      }
    } catch (error) {
      console.error("Error fetching metrics data:", error);
    }
  };


  useEffect(() => {
    // Fetch metrics data initially
    fetchData();

    // Fetch metrics data every 1 seconds (adjust the interval as per your requirements)
    const interval = setInterval(fetchData, 1000);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);


  // Retrieve the lastly added server's metrics
  const lastUptime = data.length > 0 ? data[data.length - 1].uptimeInMillis : null;
  const lastResponsetime = data.length > 0 ? data[data.length - 1].responseTimeInMillis : null;
  const lastRequesttime = data.length > 0 ? data[data.length - 1].requestTimeInMillis : null;
  const lastThreadUsage = data.length> 0 ? data[data.length - 1].threadCount: null;

  return (
    <div className="container mt-3">
  <div className="row mx-5">
    <div className="col-md-2 ">
      <div className="p-3 border rounded bg-light m-2 " style={{ height: "85%" }}>
        Servers<br /><br />
        <b>{servers}</b>
      </div>
    </div>
    <div className="col-md-2">
      <div className="p-3 border rounded bg-light m-2" style={{ height: "85%" }}>
        Apps<br /><br />
        <b>{apps}</b>
      </div>
    </div>
    <div className="col-md-4">
      <div className="p-3 border rounded bg-light m-2">
        <div className="row">
          <div className="col-md-6">Response Time:</div>
          <div className="col-md-6"><b>{lastResponsetime ? `${lastResponsetime} ms` : ''}</b></div>
        </div>
      </div>
      <div className="p-3 border rounded bg-light m-2">
        <div className="row">
          <div className="col-md-6">Thread Usage:</div>
          <div className="col-md-6"><b>{lastThreadUsage ? `${lastThreadUsage}` : ''}</b></div>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="p-3 border rounded bg-light m-2">
        <div className="row">
          <div className="col-md-6">Request time:</div>
          <div className="col-md-6"><b>{lastRequesttime ? `${lastRequesttime} ms` : ''}</b></div>
        </div>
      </div>
      <div className="p-3 border rounded bg-light m-2">
        <div className="row">
          <div className="col-md-6">Up Time:</div>
          <div className="col-md-6"><b>{lastUptime ? `${lastUptime} ms` : ''}</b></div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default Gutters;
