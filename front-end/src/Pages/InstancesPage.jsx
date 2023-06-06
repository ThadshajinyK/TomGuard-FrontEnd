import React from "react";
import "../Styles/InstancePageStyles.css";
import { Link } from 'react-router-dom';

export const InstancePage = () => {
    const instances = [
        {
            instance: "Instance 1",
            ip: "192.168.1.2",
            hostname: "instance1.ex.com",
            status: "running",
            cpu: "40%",
            memory: "1GB / 4GB",
            disk: "300GB / 1TB",
            applications: "Ticket Master , SuperNova",
            uptime: "7 days"
        },
        {
            instance: "Instance 2",
            ip: "192.168.1.3",
            hostname: "instance2.ex.com",
            status: "running",
            cpu: "50%",
            memory: "1.5GB / 4GB",
            disk: "450GB / 1TB",
            applications: "Roxo retail",
            uptime: "6 days"
        },
        {
            instance: "Instance 3",
            ip: "192.168.1.4",
            hostname: "instance3.ex.com",
            status: "Offline",
            cpu: "N/A",
            memory: "N/A",
            disk: "N/A",
            applications: "N/A",
            uptime: "N/A"
        },
        {
            instance: "Instance 4",
            ip: "192.168.1.5",
            hostname: "instance4.ex.com",
            status: "running",
            cpu: "70%",
            memory: "2GB / 8GB",
            disk: "500GB / 2TB",
            applications: "Salesforce, JIRA",
            uptime: "14 days"
        },

        {
            instance: "Instance 5",
            ip: "192.168.1.6",
            hostname: "instance5.ex.com",
            status: "running",
            cpu: "80%",
            memory: "3GB / 8GB",
            disk: "700GB / 2TB",
            applications: "WordPress, Drupal",
            uptime: "10 days"
        },

        {
            instance: "Instance 6",
            ip: "192.168.1.7",
            hostname: "instance6.ex.com",
            status: "Offline",
            cpu: "N/A",
            memory: "N/A",
            disk: "N/A",
            applications: "N/A",
            uptime: "N/A"
        },

        {
            instance: "Instance 7",
            ip: "192.168.1.8",
            hostname: "instance7.ex.com",
            status: "running",
            cpu: "60%",
            memory: "2.5GB / 16GB",
            disk: "800GB / 2TB",
            applications: "Magento, Shopify",
            uptime: "21 days"
        },

        {
            instance: "Instance 8",
            ip: "192.168.1.9",
            hostname: "instance8.ex.com",
            status: "running",
            cpu: "30%",
            memory: "1GB / 4GB",
            disk: "200GB / 1TB",
            applications: "GitLab, Redmine",
            uptime: "3 days"
        },

    ];


    return (
        <div className="InstanceContent">
            {/* Apps Overview Navbar */}
            <nav class="navbar navbar-expand-lg bg-body-tertiary overView-nav">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Server1...Instances Overview</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                        </ul>
                        <Link to="/addInstance" className="btn btn-outline-primary me-2">
                            Add new Instance
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
                        <th>Server Instance</th>
                        <th>IP address</th>
                        <th class="text-center">Host name</th>
                        <th class="text-center">Status</th>
                        <th class="text-center">CPU</th>
                        <th class="text-center">Memory</th>
                        <th class="text-center">Disk</th>
                        <th class="text-center">Applications</th>
                        <th class="text-center">Uptime</th>
                    </tr></thead>

                    {/*2nd row*/}

                    {instances.map((val, key) => {
                        return (
                            <tbody><tr key={key}>
                                <td><Link to="/logPerform">{val.instance}</Link></td>
                                <td>{val.ip}</td>
                                <td class="text-center">{val.hostname}</td>
                                <td class="text-center">
                                    <span className="badge rounded-pill" style={{ backgroundColor: val.status === "running" ? 'rgb(54, 139, 84)' : 'rgb(190, 25, 25)' }}>
                                        {val.status}
                                    </span>
                                </td>
                                <td class="text-center">{val.cpu}</td>
                                <td class="text-center">{val.memory}</td>
                                <td class="text-center">{val.disk}</td>
                                <td class="text-center">{val.applications}</td>
                                <td class="text-center">{val.uptime}</td>
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

export const AddInstanceForm = () => {
    return (
        <div className="formContent">
            <h1>Instance Details</h1>
            <form class="row g-3 mt-3">
                <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">Instance Name</label>
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
                    <label for="inputState" class="form-label">deployed Server</label>
                    <select id="inputState" class="form-select">
                        <option>server 1</option>
                        <option>server 2</option>
                        <option>server 3</option>
                        <option>server 4</option>
                        <option>server 5</option>
                    </select>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">Add server</button>
                </div>
            </form>
        </div>
    );

}