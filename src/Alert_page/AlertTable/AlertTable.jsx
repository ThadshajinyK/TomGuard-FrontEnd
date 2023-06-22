import React from "react";
import Alertnavbar from "../AlertNavbar/AlertNavbar";
import "./alertTable.css";

const dummyData = [
  {
    serverId: "1",
    alertType: "Low Disk Space",
    severityLevel: "High",
    typeOfOccurrence: "2023-02-13 10:30:00",
    desc: " Server disk space running low. Available space is below 20%.",
    Action: " delete",
    
    
   
  },
  {
    serverId: "2",
    alertType: "High CPU Utilization",
    severityLevel: "High",
    typeOfOccurrence: "2023-02-13 11:15:00",
    desc: "CPU utilization has exceeded 80% for the last 5 minutes.",
    
  },
  {
    serverId: "3",
    alertType: "Memory Leak",
    severityLevel: "Low",
    typeOfOccurrence: "2023-02-13 12:00:00",
    desc: "Memory usage has increased by 10% in the last hour.",
    
  },
  {
    serverId: "4",
    alertType: "Tomcat Service Down",
    severityLevel: "high",
    typeOfOccurrence: "2023-02-13 13:00:00",
    desc: "Tomcat service is not responding.",
    
  },

  {
    serverId: "5",
    alertType: "High Traffic",
    severityLevel: "high",
    typeOfOccurrence: "2023-02-13 14:00:00",
    desc: "Server traffic has exceeded the threshold limit.",
    
  },

  {
    serverId: "6",
    alertType: "Database Connection Error",
    severityLevel: "high",
    typeOfOccurrence: "2023-02-13 15:00:00",
    desc: "Error connecting to the database.",
    
  },

  {
    serverId: "7",
    alertType: "Tomcat Service Restarted",
    severityLevel: "Medium",
    typeOfOccurrence: "2023-02-13 16:00:00",
    desc: "Tomcat service has been restarted successfully.",
    
  },


];

const SEARCH_BY = {
  SERVER_ID: "SERVER_ID",
  ALERT_TYPE: "ALERT_TYPE",
  SEVERITY_LEVEL: "SEVERITY_LEVEL",
};
const SORT_BY = {
  ASCE: "ASCE",
  DESCE: "DESCE",
};

const AlertTable = () => {
  const [searchBy, setSearchBy] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");
  const [searchInput, setSearchInput] = React.useState("");

  return (
    <div>
      <div>
        <Alertnavbar
          {...{
            SEARCH_BY,
            SORT_BY,
            searchBy,
            setSearchBy,
            sortBy,
            setSortBy,
            searchInput,
            setSearchInput,
          }}
        />
      </div>
      <div className="tableContainer">
        <div className="container">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover ">
              <thead className="table-info">
                <tr>
                  <th>serverID</th>
                  <th>Alert Type</th>
                  <th>Severity Level</th>
                  <th>Time of Occurrence</th>
                  <th>Description</th>
                  <th> Action</th>
                 
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {dummyData
                  .filter(
                    (server) =>
                      (searchBy === "" && server) ||
                      (searchBy === SEARCH_BY.SERVER_ID &&
                        server.serverId.includes(searchInput)) ||
                      (searchBy === SEARCH_BY.ALERT_TYPE &&
                        server.alertType
                          .toLowerCase()
                          .includes(searchInput.toLowerCase())) ||
                      (searchBy === SEARCH_BY.CLIENT_NAME &&
                        server.Client_name.toLowerCase().includes(
                          searchInput.toLowerCase()
                        )) ||
                      (searchBy === SEARCH_BY.SEVERITY_LEVEL &&
                        server.severityLevel
                          .toLowerCase()
                          .includes(searchInput.toLowerCase()))
                  )
                  .slice()
                  .sort((a, b) => {
                    if (sortBy === "") return 0;
                    return sortBy === SORT_BY.ASCE
                      ? a.serverId
                          ?.toLowerCase()
                          ?.localeCompare(b.serverId?.toLowerCase())
                      : b.serverId
                          ?.toLowerCase()
                          ?.localeCompare(a.serverId?.toLowerCase());
                  })
                  .map((server, index) => (
                    <tr>
                      <td>{server.serverId}</td>
                      <td>{server.alertType}</td>
                      {/* <td className="text-danger"> */}
                      <td >{server.severityLevel}</td>
                      <td>{server.typeOfOccurrence}</td>
                      <td>{server.desc}</td>
                      <td className="text-success">{server.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertTable;
