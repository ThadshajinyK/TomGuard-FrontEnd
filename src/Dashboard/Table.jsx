import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./table.css";

function createData(serverid, client, location,ip, status,app) {
  return { serverid,client,location,ip, status,app };
}

const rows = [
  createData("001","Ceylon Theaters", "Sri lanka",'192.168.2.1',"Active","Bookmyshow.lk"),
  createData("002","Srilankan Railway","Sri lanka","192.168.2.4","Shutdown","railway.gov.lk"),
  createData("003","Alibaba", "China", "192.168.2.15","Active","Daraz.lk"),
  createData("004","SpiceJet Ltd","India", "192.168.2.34", "Active","spicejet.com"),
];


const makeStyle=(status)=>{
  if(status === 'Active')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'Shutdown')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function BasicTable() {
  return (
      <div className="Table">
      <h3>Top Servers</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ServerID</TableCell>
                <TableCell align="left">Client</TableCell>
                <TableCell align="left">Location</TableCell>
                <TableCell align="left">Ip Address</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">App</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.serverid}
                  </TableCell>
                  <TableCell align="left">{row.client}</TableCell>
                  <TableCell align="left">{row.location}</TableCell>
                  <TableCell align="left">{row.ip}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                  </TableCell>
                  <TableCell align="left">{row.app}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
