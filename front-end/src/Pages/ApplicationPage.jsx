/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import axios from "axios";
import id from "../images/ID Card.png";
import { Icon } from "@iconify/react";
import "../Styles/AppPageStyles.css";
import "../Styles/pagination.css";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../Styles/pagination.css";
import { useLocation } from "react-router-dom";

export const ApplicationPage = () => {
  const [appsData, setAppsData] = useState([]);
  const [clientsData, setClientsData] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [apps, setApps] = useState([]);

  const [searchBy, setSearchBy] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const SEARCH_BY = {
    APP_NAME: "APP_NAME",
    PATH: "PATH",
    STATUS: "STATUS",
  };

  const handleSelectClient = (event) => {
    setSelectedClient(event.target.value);
  };

  useEffect(() => {
    loadapps();
  }, []);

  const loadapps = async () => {
    try {
      const response = await axios.get("http://localhost:9090/api/apps");
      setApps(response.data);
    } catch (error) {
      console.error("Error occurred while loading apps:", error);
    }
  };

  const generateAppPDF = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/api/apps/apppdf",
        {
          responseType: "blob", // Set the response type to 'blob'
        }
      );

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "apps.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(
        "Error occurred while generating or downloading the PDF:",
        error
      );
    }
  };

  //update apps details
  const updateApps = (applicationName) => {};
  //fetching Apps details from backend with the time interval
  const fetchApps = async () => {
    try {
      const appsResponse = await axios.get(
        "http://localhost:9090/api/apps/all"
      );
      setAppsData(appsResponse.data);
    } catch (error) {
      console.error("Error fetching metrics data:", error);
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
      const appsResponse = await axios.get(
        "http://localhost:9090/api/clients/all"
      );
      setClientsData(appsResponse.data);
    } catch (error) {
      console.error("Error fetching metrics data:", error);
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

  const filteredData = appsData.filter(
    (app) =>
      (searchBy === "" && app) ||
      (searchBy === SEARCH_BY.APP_NAME &&
        app.applicationName.includes(searchInput)) ||
      (searchBy === SEARCH_BY.PATH &&
        app.path.toLowerCase().includes(searchInput.toLowerCase())) ||
      (searchBy === SEARCH_BY.STATUS &&
        app.state.toLowerCase().includes(searchInput.toLowerCase()))
  );

  return (
    <div className=" appContent">
      {/* Apps Overview Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary overView-nav">
        <div className="container-fluid ">
          <h3>Apps Overview</h3>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <div style={{ margin: "10px", width: "200px" }}>
              <select
                class="form-select "
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
              >
                <option hidden selected>
                  Search by
                </option>
                <option value={SEARCH_BY.APP_NAME}>App name</option>
                <option value={SEARCH_BY.PATH}>Path</option>
                <option value={SEARCH_BY.STATUS}>Status</option>
              </select>
            </div>

            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Apps Table  */}
      <div className="table-responsive-xxl apps-table">
        <table className="table table-striped ">
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
            {filteredData.length === 0 ? (
              <p className="text-center m-2">No data Found !</p>
            ) : (
              filteredData.map((apps) => (
                <tr key={apps.applicationName}>
                  <td> {apps.applicationName}</td>
                  <td>
                    <a href={`http://localhost:8080/${apps.path}`}>
                      {apps.path}
                    </a>
                  </td>
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
                  <div
                    class="modal fade"
                    id="clients"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">
                            Add more details
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
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
                                <option value="" disabled>
                                  Choose...
                                </option>
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
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            class="btn btn-primary"
                            onClick={() => updateApps(apps.applicationName)}
                          >
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <button
          onClick={generateAppPDF}
          type="button"
          className="btn btn-outline-info"
        >
          Download pdf
        </button>
      </div>

      {/* <div>
        <Link to="/ClientsDetails">
          <img src={id} alt="clients details" className="id"></img>View Clients
          Details Table
          <Icon icon="bi:arrow-up" color="#0d6efd" rotate={1} />
        </Link>
      </div> */}
    </div>
  );
};

export const ClientForm = () => {
 
  

  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectScope, setProjectScope] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [expectedFeatures, SetExpectedFeatures] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //company name must not be empty
    if (companyName.length == 0) {
      alert("Invlaid Form, Company name cannot be empty");
      return;
    }

    if (contactPerson.length == 0) {
      alert("Invalid form, Contact person name cannot be empty");
      return;
    }
    //email validation
    if (emailAddress.length == 0) {
      alert(
        "Email address cannot be empty. please provide a valid email address"
      );
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailAddress)) {
        alert("Please provide a valid email address");
        return;
      }
    }

    if (phoneNumber.length === 0) {
      alert(
        "Phone number cannot be empty. Please provide a valid phone number."
      );
      return;
    } else if (/\D/.test(phoneNumber)) {
      alert("Invalid number. Please provide a valid phone number.");
      return;
    } else if (phoneNumber.length != 10) {
      alert("phone number should be in 10 digits (including 0)");
      return;
    }

    if (businessType.length == 0) {
      alert("Business type cannot be empty");
      return;
    }

    if (projectType === "choose") {
      alert("Please select a suitable project type");
      return;
    }

    if (projectName.length == 0) {
      alert("project name cannot be empty");
      return;
    }

    if (projectScope.length == 0) {
      alert("project scope cannot be empty");
      return;
    }

    if (targetAudience.length == 0) {
      alert("target Audience cannot be empty");
      return;
    }

    if (expectedFeatures.length == 0) {
      alert("Features cannot be empty");
      return;
    }

    //If all validations pass, proceed with form submission
    const clients = {
      companyName,
      contactPerson,
      phoneNumber,
      emailAddress,
      businessType,
      projectType,
      projectName,
      projectScope,
      targetAudience,
      expectedFeatures,
    };
    console.log(clients);
    fetch("http://localhost:9090/api/clients/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clients),
    })
      .then((response) => {
        if (response.ok) {
          console.log("New Clients details added ");
          setPopupMessage("Form submitted successfully!");
          alert("Form submitted successfully!");
        } else {
          throw new Error("Form submission Failed");
        }
      })
      .catch((error) => {
        console.error(error);
        setPopupMessage("Form submission failed. ");
        alert("Form submission failed.");
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
          <label htmlFor="companyName" className="col-sm-2 col-form-label">
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
            ></input>
          </div>
        </div>

        {/* Contact Person */}
        <div className="form-group row mt-3">
          <label htmlFor="emailAddress" className="col-sm-2 col-form-label">
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
          <label htmlFor="emailAddress" className="col-sm-2 col-form-label">
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
            <div className="invalid-feedback">
              Please provide a valid email address
            </div>
          </div>
        </div>

        {/* Phone Number */}

        <div className="form-group row mt-3">
          <label htmlFor="phoneNumber" className="col-sm-2 col-form-label">
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
          <label htmlFor="businessType" className="col-sm-2 col-form-label">
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
          <label htmlFor="projectType" className="col-sm-2 col-form-label">
            Project Type
          </label>
          <div className="col-sm-3">
            <select
              className="form-select"
              id="projectType"
              value={projectType}
              defaultValue="None"
              onChange={(e) => setProjectType(e.target.value)}
              required
            >
              <option value="" selected>
                choose..
              </option>
              <option value="Retail POS">Retail POS</option>
              <option value="Food POS">Food POS</option>
              <option value="E-Commerce">E-Commerce</option>
            </select>
          </div>
        </div>
        {/* Project Name */}
        <div className="form-group row mt-3">
          <label htmlFor="projectName" className="col-sm-2 col-form-label">
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
          <label htmlFor="projectScope" className="col-sm-2 col-form-label">
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
          <label htmlFor="targetAudience" className="col-sm-2 col-form-label">
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
          <label htmlFor="expectedFeatures" className="col-sm-2 col-form-label">
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
          <button
            type="submit"
            className="btn btn-outline-success m-3"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button type="submit" className="btn btn-outline-danger m-3">
            Cancel
          </button>
        </div>
      </form>
      {popupMessage && (
        <div className="alert alert-success">{popupMessage}</div>
      )}
    </div>
  );
};

export const ClientsDetails = () => {
  const [clientsData, setClientsData] = useState([]);
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;

  const [searchBy, setSearchBy] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const SEARCH_BY = {
    COMPANY_NAME: "COMPANY_NAME",
    CONTACT_PERSON: "CONTACT_PERSON",
    PROJECT_NAME: "PROJECT_NAME",
    PROJECT_TYPE: "PROJECT_TYPE",
    BUSINESS_TYPE: "BUSINESS_TYPE",
  };

  useEffect(() => {
    loadclients();
  }, []);

  const loadclients = async () => {
    try {
      const response = await axios.get("http://localhost:9090/api/clients");
      setClientsData(response.data);
    } catch (error) {
      console.error("Error occurred while loading clients:", error);
    }
  };

  const generateClientPDF = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/api/clients/clientpdf",
        {
          responseType: "blob", // Set the response type to 'blob'
        }
      );

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "clients.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(
        "Error occurred while generating or downloading the PDF:",
        error
      );
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
    fetch(`http://localhost:9090/api/clients/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Delete successful, perform any necessary actions (e.g., update UI)
          setClientsData((prevData) =>
            prevData.filter((item) => item.id !== id)
          );
          console.log("Record deleted successfully");
        } else {
          // Delete failed, handle the error (e.g., show error message)
          console.error("Failed to delete record");
        }
      })
      .catch((error) => {
        // Handle network or other errors
        console.error("Error occurred while deleting record:", error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const metricsResponse = await axios.get(
          "http://localhost:9090/api/clients/all"
        );
        setClientsData(metricsResponse.data);
      } catch (error) {
        console.error("Error fetching metrics data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredClient = currentClient.filter(
    (client) =>
      (searchBy === "" && client) ||
      (searchBy === SEARCH_BY.COMPANY_NAME &&
        client.companyName.includes(searchInput)) ||
      (searchBy === SEARCH_BY.CONTACT_PERSON &&
        client.contactPerson
          .toLowerCase()
          .includes(searchInput.toLowerCase())) ||
      (searchBy === SEARCH_BY.BUSINESS_TYPE &&
        client.businessType
          .toLowerCase()
          .includes(searchInput.toLowerCase())) ||
      (searchBy === SEARCH_BY.PROJECT_NAME &&
        client.projectName.toLowerCase().includes(searchInput.toLowerCase())) ||
      (searchBy === SEARCH_BY.PROJECT_TYPE &&
        client.projectType.toLowerCase().includes(searchInput.toLowerCase()))
  );

  return (
    <div className="ClientFormContent">
      <nav className="navbar navbar-expand-lg bg-body-tertiary overView-nav">
        <div className="container-fluid ">
          <a className="navbar-brand" href="#">
            Clients Details
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <div style={{ margin: "10px", width: "200px" }}>
              <select
                class="form-select "
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
              >
                <option hidden selected>
                  Search by
                </option>
                <option value={SEARCH_BY.COMPANY_NAME}>Company name</option>
                <option value={SEARCH_BY.BUSINESS_TYPE}>Business type</option>
                <option value={SEARCH_BY.CONTACT_PERSON}>Contact person</option>
                <option value={SEARCH_BY.PROJECT_NAME}>Project name</option>
                <option value={SEARCH_BY.PROJECT_TYPE}>Project type</option>
              </select>
            </div>

            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </form>
            <Link to="/addClient"
             className="btn btn-outline-primary ">
              <Icon
                icon="mdi:add-bold"
                width="20"
                height="20"
                className="mt-0 me-2 mb-1"
              />
              Add Client Details
            </Link>
            <div></div>
          </div>
        </div>
      </nav>

      {/* Metrics Table */}
      <div className="table-responsive-xxl mt-5 clientsTable">
        <table className="table table-hover ">
          <thead className="table-dark">
            <tr>
              {/*1st row */}
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
            {filteredClient.length === 0 ? (
              <p className="text-center m-2">No data Found !</p>
            ) : (
              filteredClient.map((client) => (
                <tr key={client.id}>
                  <td className="text-center">{client.timestamp}</td>
                  <td className="text-center">{client.companyName}</td>
                  <td className="text-center">{client.contactPerson}</td>
                  <td className="text-center">{client.businessType}</td>
                  <td className="text-center">{client.emailAddress}</td>
                  <td className="text-center">{client.projectName}</td>
                  <td className="text-center">{client.projectType}</td>
                  <td>
                    <div>
                      <b>Project Scope:</b> {client.projectScope}
                    </div>
                    <div className="mt-2">
                      <b>Target Audience:</b>{" "}
                    </div>
                    <div>{client.targetAudience}</div>
                    <div className="mt-2">
                      <b>Expected Features and Requirements: </b>
                    </div>
                    <div>{client.expectedFeatures}</div>
                  </td>
                  {/* <td className="text-center">{client.projectScope}</td>
      <td className="text-center">{client.targetAudience}</td>
      <td className="text-center">{client.expectedFeatures}</td> */}

                  <td>
                    {/* <button
            className="btn btn-link"
            type="button"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
            onClick={() => handleDeleteMetrics(client.id)}
          >
            <Icon
              icon="mdi:delete-outline"
              color="#DC3545"
              width="25"
              height="25"
            />
          </button> */}
                    {/* drop down start */}
                    <div class="btn-group" role="group">
                      <button
                        type="button"
                        class="btn btn-primary btn-sm dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <Icon
                          icon="icon-park-outline:more-one"
                          width="20"
                          height="20"
                        />
                        More
                      </button>
                      <ul class="dropdown-menu">
                        {/* <li>
                          <a class="dropdown-item" href="#">
                            <Icon
                              icon="fluent:edit-16-regular"
                              width="20"
                              height="20"
                            />
                            edit
                          </a>
                        </li> */}
                        <li>
                          <Link
                            to={{
                              pathname: "/addClient",
                              state: { clients: client },
                            }}
                            className="dropdown-item"
                          >
                            <Icon
                              icon="fluent:edit-16-regular"
                              width="20"
                              height="20"
                            />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            href="#"
                            onClick={() => handleDeleteMetrics(client.id)}
                          >
                            <Icon
                              icon="mdi-light:delete"
                              width="20"
                              height="20"
                            />
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* dropdown end */}
                  </td>
                  {/* ...other table cells... */}
                </tr>
              ))
            )}
          </tbody>
        </table>
        <button
          onClick={generateClientPDF}
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
};
