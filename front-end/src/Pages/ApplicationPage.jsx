import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Icon } from '@iconify/react';
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
      <nav className="navbar navbar-expand-lg bg-body-tertiary overView-nav">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Apps Overview</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            </ul>
            <Link to="/addApp" className="btn btn-outline-primary me-2">
              Add new App
            </Link>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
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

      
      <div>
        <Link to="/ClientsDetails">View Clients Details Table</Link>
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

export const AddAppsForm = () => {
  return (
    <div className="formContent">
      <h1>Application Details</h1>
      <form className="row g-3 mt-3">
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">App Name</label>
          <input type="text" className="form-control" id="appName" />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">Client Name</label>
          <input type="text" className="form-control" id="clientName" />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputAddress" className="form-label">App type</label>
          <input type="text" className="form-control" id="appType" placeholder="select correct type" />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputAddress2" className="form-label">App version</label>
          <input type="text" className="form-control" id="appVersion" placeholder="type app version" />
        </div>
        <div className="col-md-6">
          <fieldset className="row">
            <legend className="col-form-label col-sm-2 pt-0">Status</legend>
            <div className="col-sm-10">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="status" id="status" value="stopped" />
                <label className="form-check-label" htmlFor="gridRadios1">
                  stopped
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="status" id="status" value="running" />
                <label className="form-check-label" htmlFor="gridRadios2">
                  running
                </label>
              </div>
            </div>
          </fieldset>
          {/* <label htmlFor="inputCity" className="form-label">Status</label>
    <input type="text" className="form-control" id="inputCity"/> */}
        </div>
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">Deployed Server Instance</label>
          <select id="inputState" className="form-select" defaultValue="Instance 1">
            <option value="Instance 1">Instance 1</option>
            <option value="Instance 2">Instance 2</option>
            <option value="Instance 3">Instance 3</option>
            <option value="Instance 4">Instance 4</option>
            <option value="Instance 5">Instance 5</option>
          </select>
        </div>


        <div className="col-12">
          <button type="submit" className="btn btn-primary">Add app</button>
        </div>
      </form>
    </div>
  );

}

export const ClientForm = () => {

  const [companyName, setCompanyName] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [projectType, setProjectType] = useState('')
  const [projectName, setProjectName] = useState('')
  const [projectScope, setProjectScope] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [expectedFeatures, SetExpectedFeatures] = useState('')
  const [popupMessage, setPopupMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    const clients = { companyName, contactPerson,phoneNumber,emailAddress,businessType, projectType,projectName,projectScope,targetAudience,expectedFeatures}
    console.log(clients)
    fetch("http://localhost:9090/clients/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clients)
    }).then(() => {
      console.log("New Clients details added ")
    })
    setPopupMessage("Form submitted successfully!");

    setCompanyName("");
    setContactPerson("");
    setEmailAddress("");
    setPhoneNumber("");
    setBusinessType("");
    setProjectType("");
    setProjectName("");
    setProjectScope("");
    setTargetAudience("");
    SetExpectedFeatures("");

  };


  return (
    <div className="ClientFormContent">
      <h1>Client Details Form</h1>

      <form className="mt-3">
        {/* Company Name */}
        <div className="form-group row mt-3">
          <label htmlFor="companyName"
            className="col-sm-2 col-form-label">
            Company Name
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              id="companyName"
              placeholder="Company or Business Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            ></input>
          </div>
        </div>

        {/* Contact Person */}
        <div className="form-group row mt-3">
          <label htmlFor="emailAddress"
            className="col-sm-2 col-form-label">
            Contact Person
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              id="contactPerson"
              placeholder="Contact Person Name"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
            ></input>
          </div>
        </div>

        {/* Email address */}
        <div className="form-group row mt-3">
          <label htmlFor="emailAddress"
            className="col-sm-2 col-form-label">
            Email Address
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="emailAddress"
              placeholder="example@example.com"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            ></input>
          </div>
        </div>

        {/* Phone Number */}

        <div className="form-group row mt-3">
          <label htmlFor="phoneNumber"
            className="col-sm-2 col-form-label">
            Contact No
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              placeholder="123-456-7890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></input>
          </div>
        </div>
        {/* Business Type */}
        <div className="form-group row mt-3">
          <label htmlFor="businessType"
            className="col-sm-2 col-form-label">
            Business Type
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="businessType"
              placeholder="Eg: Retail, E-com"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
            ></input>
          </div>
        </div>

        {/* Project Type */}
        <div className="form-group row mt-3">
          <label htmlFor="projectType"
            className="col-sm-2 col-form-label">
            Project Type
          </label>
          <div className="col-sm-3">
            <select
              className="form-select"
              id="projectType"
              value={projectType}
              defaultValue="None"
              onChange={(e) => setProjectType(e.target.value)}>
              <option value="Retail POS">Retail POS</option>
              <option value="Food POS">Food POS</option>
              <option value="E-Commerce">E-Commerce</option>
            </select>
          </div>
        </div>
        {/* Project Name */}
        <div className="form-group row mt-3">
          <label htmlFor="projectName"
            className="col-sm-2 col-form-label">
            Project Name
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="projectName"
              placeholder="project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            ></input>
          </div>
        </div>
        {/* Project Scope */}
        <div className="form-group row mt-3">
          <label htmlFor="projectScope"
            className="col-sm-2 col-form-label">
            Project Scope
          </label>
          <div className="col-sm-8">
          
            <textarea
              type="text"
              className="form-control"
              rows="5"
              id="projectScope"
              placeholder="Briefly describe your project requirements and scope"
            
              value={projectScope}
              onChange={(e) => setProjectScope(e.target.value)}
            ></textarea>
          </div>
        </div>
        {/* Target Audience */}
        <div className="form-group row mt-3">
          <label htmlFor="targetAudience"
            className="col-sm-2 col-form-label">
            Target Audience
          </label>
          <div className="col-sm-8">
            <textarea
              type="text"
              className="form-control"
              id="targetAudience"
              rows="3"
              
              placeholder="Enter Project's target audience"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
            ></textarea>
          </div>
        </div>
        {/* Expected Features */}
        <div className="form-group row mt-3">
          <label htmlFor="expectedFeatures"
            className="col-sm-2 col-form-label">
            Expected Features
          </label>
          <div className="col-sm-8">
            <textarea
              type="text"
              className="form-control"
              id="expectedFeatures"
              rows="5"
              
              placeholder="List the expected features you require"
              value={expectedFeatures}
              onChange={(e) => SetExpectedFeatures(e.target.value)}
            ></textarea>
          </div>
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

export const ClientsDetails= () =>{

  const [clientsData, setClientsData] = useState([]);

  const handleDeleteMetrics = (id) => {
    // Make a DELETE request to the delete endpoint
    fetch(`http://localhost:9090/clients/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          // Delete successful, perform any necessary actions (e.g., update UI)
          setClientsData(prevData => prevData.filter(item => item.id !== id));
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
        const metricsResponse = await axios.get('http://localhost:9090/clients/all');
        setClientsData(metricsResponse.data);
      } catch (error) {
        console.error('Error fetching metrics data:', error);
      }

    };

    fetchData();
  }, []);

  return (
    <div className="ClientFormContent">
      <nav className="navbar navbar-expand-lg bg-body-tertiary overView-nav">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Clients Details</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            </ul>
            <Link to="/addClient" className="btn btn-outline-primary me-2">
              Add Client Details
            </Link>
            <div>
      </div>

          </div>
        </div>
      </nav>


      {/* Metrics Table */}
      <div className="table-responsive-xxl mt-5 clientsTable">
        <table className="table table-striped " >
          <thead className="table-dark">
            <tr>{/*1st row */}
              <th className="text-center">Timestamp</th>
              <th className="text-center">Company name</th>
              <th className="text-center">Contact Person</th>
              <th className="text-center">Business Type</th>
              <th className="text-center">Email Address</th>
              <th className="text-center">Project Name</th>
              <th className="text-center">Project Type</th>
              <th className="text-center">Project Details</th>
              {/* <th className="text-center">Project Scope</th>
              <th className="text-center">Target Audience</th>
              <th className="text-center">Expected Features</th> */}
              <th></th>
            </tr>
          </thead>
          {/*2nd row*/}
          <tbody>
            {clientsData.map(client => (
              <tr key={client.id}>
                <td className="text-center">{client.timestamp}</td>
                <td className="text-center">{client.companyName}</td>
                <td className="text-center">{client.contactPerson}</td>
                <td className="text-center">{client.businessType}</td>
                <td className="text-center">{client.emailAddress}</td>
                <td className="text-center">{client.projectName}</td>
                <td className="text-center">{client.projectType}</td>
                <td>
                <div><b>Project Scope:</b> {client.projectScope}</div>
                <div className="mt-2"><b>Target Audience:</b> </div>
                <div>{client.targetAudience}</div>
                <div className="mt-2"><b>Expected Features and Requirements: </b></div>
                <div>{client.expectedFeatures}</div>
                
                </td>
                {/* <td className="text-center">{client.projectScope}</td>
                <td className="text-center">{client.targetAudience}</td>
                <td className="text-center">{client.expectedFeatures}</td> */}

                <td><button
                  class="btn btn-link"
                  type="button"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Delete"
                  onClick={() => handleDeleteMetrics(client.id)}>
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