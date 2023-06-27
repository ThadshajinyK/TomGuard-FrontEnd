import React, { useEffect, useState } from "react";
import axios from 'axios';
import id from "../images/ID Card.png";
import { Icon } from '@iconify/react';
import "../Styles/AppPageStyles.css";
import "../Styles/pagination.css"
import { Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import "../Styles/pagination.css"

export const ApplicationPage = () => {
  const [appsData, setAppsData] = useState([]);
  const [clientsData, setClientsData] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [apps, setApps] = useState([]);

  const handleSelectClient = (event) => {
    setSelectedClient(event.target.value);
  };

  useEffect(() => {
    loadapps();
  }, []);

  const loadapps = async () => {
    try {
      const response = await axios.get("http://localhost:9090/apps");
      setApps(response.data);
    } catch (error) {
      console.error('Error occurred while loading apps:', error);
    }
  };


  const generateAppPDF = async () => {
    try {
      const response = await axios.get("http://localhost:9090/apps/apppdf", {
        responseType: 'blob', // Set the response type to 'blob'
      });

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'apps.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error occurred while generating or downloading the PDF:', error);
    }
  };


  //update apps details
  const updateApps = (applicationName) => {
    
  };
//fetching Apps details from backend with the time interval
    const fetchApps = async () => {
     
      try {
        const appsResponse = await axios.get('http://localhost:9090/apps/all');
        setAppsData(appsResponse.data);
      } catch (error) {
        console.error('Error fetching metrics data:', error);
      }
      
    };

    useEffect(() => {
      fetchApps(); // Initial fetch
  
      // Polling every 12 seconds (adjust the interval as per your requirements)
      const interval = setInterval(fetchApps, 2000);
        return () => {
        clearInterval(interval); // Cleanup interval on component unmount
      };
    }, []);

//fetching Clients Details from backend with the time intervl
    const fetchclients = async () => {

      try {
        const appsResponse = await axios.get('http://localhost:9090/clients/all');
        setClientsData(appsResponse.data);
      } catch (error) {
        console.error('Error fetching metrics data:', error);
      }

    };
    useEffect(() => {
      fetchclients(); // Initial fetch
  
      // Polling every 12 seconds (adjust the interval as per your requirements)
      const interval = setInterval(fetchclients, 2000);
        return () => {
        clearInterval(interval); // Cleanup interval on component unmount
      };
    }, []);

    


  return (
    <div className=" appContent">
      {/* Apps Overview Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary overView-nav">
        <div className="container-fluid">
          <h3>Apps Overview</h3>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            </ul>

            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>


      {/* Apps Table  */}
      <div className="table-responsive-xxl apps-table">
        <table className="table table-striped "  >
          <thead className="table-dark">
            <tr>
              <th>Application Name</th>
              <th>App path</th>
              <th>status</th>
              {/* <th>App Type</th>
              <th>Client Name</th> */}
              {/* <th className="text-center">start</th> */}
              {/* <th className="text-center">delete</th> */}
              {/* <th className="text-center">Edit</th> */}
            </tr>
          </thead>

          {/*2nd row*/}
          <tbody>
            {appsData.map(apps => (
              <tr key={apps.applicationName}>
                <td> {apps.applicationName}</td>
                <td><a href={`http://localhost:8080/${apps.path}`}>{apps.path}</a></td>
                {/* <td className="text-center"><span className="badge rounded-pill" style={{
                  backgroundColor
                    : apps.state === "online" ? 'rgb(54, 139, 84)'
                      : apps.availability === "offline" ? 'rgb(190, 25, 25)'
                        : 'orange'
                }}>{apps.availability} </span>
                </td> */}

                <td>{apps.state}</td>
                {/* <td>{apps.appType}</td>
                <td>{apps.clientName}</td> */}
                {/* <td className="text-center">
                  <button className="btn btn-outline-primary">start/stop</button>
                </td> */}

                {/* delete button */}
                {/* <td className="text-center"><button
                  className="btn btn-link"
                  type="button"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Delete"
                  onClick={() => handleDeleteApps(apps.applicationName)}>
                  <Icon
                    icon="mdi:delete-outline"
                    color="#DC3545"
                    width="25"
                    height="25" /></button></td> */}
                    

                {/* edit button  */}
                {/* <td className="text-center ">
                  <button
                    className="btn btn-link  "
                    type="button"
                    data-placement="top"
                    data-bs-toggle="modal" data-bs-target="#clients"
                    title="edit"
                  >
                    <Icon icon="material-symbols:edit-outline" color="#4989f4" /></button></td> */}
                {/* ...modal hidden popup... */}
                <div class="modal fade" id="clients" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Add more details</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <div className="row">
                            <label htmlFor="client" className="form-label">
                              Client Company Name
                            </label>
                            <select
                              className="form-select"
                              id="client"
                              value={selectedClient}
                              onChange={handleSelectClient}
                              required
                            >
                              <option value="" disabled>Choose...</option>
                              {clientsData.map((client) => (
                                <option key={client.id} value={client.id}>
                                  {client.companyName} -{client.contactPerson}
                                </option>
                              ))}
                            </select>

                          </div>
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onClick={() => updateApps(apps.applicationName)}>Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>

              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={generateAppPDF}
                          type="button"
                          className="btn btn-outline-info"
                          
                        >
                          Download pdf
                        </button>
      </div>



      <div>
        <Link to="/ClientsDetails"><img src={id} alt="clients details" className="id"></img>View Clients Details Table<Icon icon="bi:arrow-up" color="#0d6efd" rotate={1} /></Link>
      
      </div>
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


    //email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      setPopupMessage("Please provide a valid email address");
      return;
    }
    //If all validations pass, proceed with form submission
    const clients = { companyName, contactPerson, phoneNumber, emailAddress, businessType, projectType, projectName, projectScope, targetAudience, expectedFeatures }
    console.log(clients)
    fetch("http://localhost:9090/clients/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clients)
    }).then((response) => {
      if (response.ok) {
        console.log("New Clients details added ");
        setPopupMessage("Form submitted successfully!");
      } else {
        throw new Error("Form submission Failed");
      }

    })
      .catch((error) => {
        console.error(error);
        setPopupMessage("Form submission failed. ")
      });

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

      <form className="mt-3 " onSubmit={handleSubmit}>
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
              required
            >
            </input>
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
              required
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
              type="email"
              // className={'form-control ${emailAddress ? 'is-valid' : 'is-invalid'}'}
              id="emailAddress"
              placeholder="example@example.com"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please provide a valid email address</div>
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
              required
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
              required
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
              onChange={(e) => setProjectType(e.target.value)}
              required>
                <option value="" selected>choose..</option>
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
              required
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
              required
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
              required
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
              required
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


export const ClientsDetails = () => {

  const [clientsData, setClientsData] = useState([]);
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;

  useEffect(() => {
    loadclients();
  }, []);

  const loadclients = async () => {
    try {
      const response = await axios.get("http://localhost:9090/clients");
      setClients(response.data);
    } catch (error) {
      console.error('Error occurred while loading clients:', error);
    }
  };
  const generateClientPDF = async () => {
    try {
      const response = await axios.get("http://localhost:9090/clients/clientpdf", {
        responseType: 'blob', // Set the response type to 'blob'
      });

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'clients.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error occurred while generating or downloading the PDF:', error);
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  
  const offset = currentPage * itemsPerPage;
  const currentClient = clientsData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(clientsData.length / itemsPerPage);

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
        <table className="table table-hover " >
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
            {currentClient.map(client => (
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
                  className="btn btn-link"
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
        <button           onClick={generateClientPDF}
                          type="button"
                          className="btn btn-outline-info"
                          
                        >
                          Download pdf
                        </button>

            {clientsData.length > itemsPerPage && (
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              pageClassName={"border-box"}
            />
          )}
      </div>

      
    </div>



  );
}