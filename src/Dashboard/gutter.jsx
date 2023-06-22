import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


function Gutters() {
    return (
        <div class="container mt-3">
            <div class="row ">
                <div class="col-md-2">
                    <div class="p-3 border border-dark shadow shadow-lg rounded bg-light m-2" style={{ "height": "85%" }}>Servers<br/><br></br><b>58</b></div>
                </div>
                <div class="col-md-2">
                    <div class="p-3 border rounded bg-light m-2" style={{ "height": "85%" }}>Apps<br/><br></br><b>124</b></div>
                </div>
                <div class="col-md-4">
                    <div class="p-3 border rounded bg-light m-2" >
                        <div className="row">
                            <div className="col-md-8">Response Time :</div>
                            <div className="col-md-4"><b>30s</b></div>
                        </div>
                    </div>
                    <div class="p-3 border rounded bg-light m-2">
                        <div className="row">
                            <div className="col-md-8">No Of Session :</div>
                            <div className="col-md-4"><b>26</b></div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="p-3 border rounded bg-light m-2">
                        <div className="row">
                            <div className="col-md-8">Tread Usage :</div>
                            <div className="col-md-4"><b>15</b></div>
                        </div>
                    </div>
                    <div class="p-3 border rounded bg-light m-2">
                        <div className="row">
                            <div className="col-md-8">Up Time :</div>
                            <div className="col-md-4"><b>5s</b></div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Gutters;

