import Alertnavbar from "../AlertNavbar/AlertNavbar";
import "./alertTable.css";

const AlertTable = () => {
  return (
    <div>
      <div>
        <Alertnavbar />
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
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                <tr>
                  <td>1</td>
                  <td>Low Disk Space</td>
                  <td className="text-danger">High</td>
                  <td>2023-02-13 10:30:00</td>
                  <td>
                    Server disk space running low. Available space is below 20%.
                  </td>
                  <td className="text-success">Solved</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>High CPU Utilization</td>
                  <td className="text-danger">High</td>
                  <td>2023-02-13 11:15:00</td>
                  <td>
                    CPU utilization has exceeded 80% for the last 5 minutes.
                  </td>
                  <td className="text-success"> Solved</td>
                </tr>

                <tr>
                  <td>3</td>
                  <td>Memory Leak</td>
                  <td className="text-info">Low</td>
                  <td>2023-02-13 12:00:00</td>
                  <td>Memory usage has increased by 10% in the last hour.</td>
                  <td className="text-danger">Unsolved</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Tomcat Service Down</td>
                  <td className="text-danger">high</td>
                  <td>2023-02-13 13:00:00</td>
                  <td>Tomcat service is not responding.</td>
                  <td className="text-success">Solved</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>High Traffic</td>
                  <td className="text-danger">High</td>
                  <td>2023-02-13 14:00:00</td>
                  <td>Server traffic has exceeded the threshold limit.</td>
                  <td className="text-success">Solved</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Database Connection Error</td>
                  <td className="text-danger">High</td>
                  <td>2023-02-13 15:00:00</td>
                  <td>Error connecting to the database.</td>
                  <td className="text-danger">Unsolved</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Tomcat Service Restarted</td>
                  <td className="text-warning">Medium</td>
                  <td>2023-02-13 16:00:00</td>
                  <td>Tomcat service has been restarted successfully.</td>
                  <td className="text-success">Solved</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertTable;
