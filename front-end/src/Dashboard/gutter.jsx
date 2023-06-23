import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Gutters() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    loadServerCount();
  }, []);

  const loadServerCount = async () => {
    try {
      const response = await axios.get("http://localhost:9090/server/servercount");
      setServers(response.data);
    } catch (error) {
      console.error('Error occurred while loading server count:', error);
    }
  };

  const [apps, setApps] = useState([]);

  useEffect(() => {
    loadappCount();
  }, []);

  const loadappCount = async () => {
    try {
      const response = await axios.get("http://localhost:9090/apps/appcount");
      setApps(response.data);
    } catch (error) {
      console.error('Error occurred while loading app count:', error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-2">
          <div className="p-3 border border-dark shadow shadow-lg rounded bg-light m-2" style={{ height: "85%" }}>
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
              <div className="col-md-8">Response Time:</div>
              <div className="col-md-4"><b>{/* Add response time value here */}s</b></div>
            </div>
          </div>
          <div className="p-3 border rounded bg-light m-2">
            <div className="row">
              <div className="col-md-8">No Of Session:</div>
              <div className="col-md-4"><b>{/* Add session count here */}</b></div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 border rounded bg-light m-2">
            <div className="row">
              <div className="col-md-8">Thread Usage:</div>
              <div className="col-md-4"><b>{/* Add thread usage value here */}</b></div>
            </div>
          </div>
          <div className="p-3 border rounded bg-light m-2">
            <div className="row">
              <div className="col-md-8">Up Time:</div>
              <div className="col-md-4"><b>{/* Add uptime value here */}s</b></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gutters;
