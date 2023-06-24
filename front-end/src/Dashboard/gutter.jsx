import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { useState,useEffect } from "react";


function Gutters() {
    const [servers, setserver] = useState([]);

    useEffect(() => {
      loadserver();
    }, []);
  
    const loadserver = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setserver(response.data);
      } catch (error) {
        console.error('Error occurred while loading users:', error);
      }
    };
    return (
        <div class="container mt-3">
            {servers.map((server)=>(
            <div class="row ">
                <div class="col-md-2">
                   <div class="p-3 border border-dark shadow shadow-lg rounded bg-light m-2" style={{ "height": "85%" }}>Servers<br/><br></br><b>{server.server}</b></div>
                </div>
                <div class="col-md-2">
                    <div class="p-3 border rounded bg-light m-2" style={{ "height": "85%" }}>Apps<br/><br></br><b>{server.app}</b></div>
                </div>
                <div class="col-md-4">
                    <div class="p-3 border rounded bg-light m-2" >
                        <div className="row">
                            <div className="col-md-8">Response Time :</div>
                            <div className="col-md-4"><b>{server.response}s</b></div>
                        </div>
                    </div>
                    <div class="p-3 border rounded bg-light m-2">
                        <div className="row">
                            <div className="col-md-8">No Of Session :</div>
                            <div className="col-md-4"><b>{server.Noofsession}</b></div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="p-3 border rounded bg-light m-2">
                        <div className="row">
                            <div className="col-md-8">Thread Usage :</div>
                            <div className="col-md-4"><b>{server.Thread}</b></div>
                        </div>
                    </div>
                    <div class="p-3 border rounded bg-light m-2">
                        <div className="row">
                            <div className="col-md-8">Up Time :</div>
                            <div className="col-md-4"><b>{server.uptime}s</b></div>
                        </div>
                    </div>
                </div>


            </div>))}
        </div>
    );
}

export default Gutters;

