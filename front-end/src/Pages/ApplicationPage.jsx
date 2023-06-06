import React from "react";
import "../Styles/AppPageStyles.css";
import { Link } from 'react-router-dom';


export const ApplicationPage = () => {
  const apps = [
    {
      App_ID: "001",
      App_name: "Ticket Master",
      Client_name: "David Johnson",
      status: "running",
      app_type: "Retail POS",
      Version: "2.0",
      instance: "Instance 01"
    }
    ,
    {
      App_ID: "002",
      App_name: "Event Planner",
      Client_name: "Maria Rodriguez",
      status: "stopped",
      app_type: "Event Management",
      Version: "1.5",
      instance: "Instance 02"
    }
    ,
    {
      App_ID: "003",
      App_name: "Sales Tracker",
      Client_name: "John Smith",
      status: "running",
      app_type: "Sales Management",
      Version: "3.2",
      instance: "Instance 03"
    }
    ,
    {
      App_ID: "004",
      App_name: "Inventory Manager",
      Client_name: "Sophia Lee",
      status: "running",
      app_type: "Inventory Management",
      Version: "2.1",
      instance: "Instance 04"
    }
    ,
    {
      App_ID: "005",
      App_name: "Time Tracker",
      Client_name: "James Kim",
      status: "stopped",
      app_type: "Time Management",
      Version: "1.0",
      instance: "Instance 05"
    }
    ,
    {
      App_ID: "006",
      App_name: "Task Manager",
      Client_name: "Emily Chen",
      status: "running",
      app_type: "Task Management",
      Version: "2.3",
      instance: "Instance 06"
    }
    ,
    {
      App_ID: "007",
      App_name: "CRM",
      Client_name: "Brian Wilson",
      status: "running",
      app_type: "CRM",
      Version: "4.0",
      instance: "Instance 07"
    }
    ,
    {
      App_ID: "008",
      App_name: "Expense Tracker",
      Client_name: "Linda Nguyen",
      status: "stopped",
      app_type: "Expense Management",
      Version: "1.2",
      instance: "Instance 08"
    }
    ,
  ];

  return (
    <div className=" appContent">
      {/* Apps Overview Navbar */}
      <nav class="navbar navbar-expand-lg bg-body-tertiary overView-nav">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Apps Overview</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">

            </ul>
            <Link to="/addApp" className="btn btn-outline-primary me-2">
                                Add new App
                            </Link>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>


      {/* Apps Table  */}
      <div className="table-responsive-xxl">
        <table className="table table-striped apps-table"  >
          <thead className="table-dark"><tr>{/*1st row */}
            <th>App ID</th>
            <th>App Name</th>
            <th>Client Name</th>
            <th>Status</th>
            <th>App Type</th>
            <th>Version</th>
            <th>Server Instance</th>
          </tr></thead>

          {/*2nd row*/}

          {apps.map((val, key) => {
            return (
              <tbody><tr key={key}>
                <td>{val.App_ID}</td>
                <td>{val.App_name}</td>
                <td>{val.Client_name}</td>
                <td>
                  <span className="badge rounded-pill" style={{ backgroundColor: val.status === "running" ? 'rgb(54, 139, 84)' : 'rgb(190, 25, 25)' }}>
                    {val.status}
                  </span>
                </td>

                {/* <td>
                  <span className={`badge rounded-pill text-bg-${val.status === "running" ? "success" : "danger"}`}>
                    {val.status}
                  </span>
                </td> */}
                <td>{val.app_type}</td>
                <td>{val.Version}</td>
                <td>{val.instance}</td>
              </tr>
              </tbody>
            )
          })}


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

export const AddAppsForm = () => {
  return (
    <div className="formContent">
      <h1>Application Details</h1>
      <form class="row g-3 mt-3">
        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">App Name</label>
          <input type="text" class="form-control" id="appName" />
        </div>
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">Client Name</label>
          <input type="text" class="form-control" id="clientName" />
        </div>
        <div class="col-md-6">
          <label for="inputAddress" class="form-label">App type</label>
          <input type="text" class="form-control" id="appType" placeholder="select correct type" />
        </div>
        <div class="col-md-6">
          <label for="inputAddress2" class="form-label">App version</label>
          <input type="text" class="form-control" id="appVersion" placeholder="type app version" />
        </div>
        <div class="col-md-6">
          <fieldset class="row">
            <legend class="col-form-label col-sm-2 pt-0">Status</legend>
            <div class="col-sm-10">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="status" id="status" value="stopped" />
                <label class="form-check-label" for="gridRadios1">
                  stopped
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="status" id="status" value="running" />
                <label class="form-check-label" for="gridRadios2">
                  running
                </label>
              </div>
            </div>
          </fieldset>
          {/* <label for="inputCity" class="form-label">Status</label>
    <input type="text" class="form-control" id="inputCity"/> */}
        </div>
        <div class="col-md-4">
          <label for="inputState" class="form-label">deployed Server Instance</label>
          <select id="inputState" class="form-select">
            <option selected>Instance 1</option>
            <option>Instance 2</option>
            <option>Instance 3</option>
            <option>Instance 4</option>
            <option>Instance 4</option>
          </select>
        </div>

        <div class="col-12">
          <button type="submit" class="btn btn-primary">Add app</button>
        </div>
      </form>
    </div>
  );

}