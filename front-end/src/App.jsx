import { Titlebar, Titlebar2 } from "./Titlebar/Titlebar";
import { Navigationbar } from "./Navigationbar/Navigationbar";
import { ServerPage, AddServerForm, MetricsTable, LogsTable } from "./Pages/ServerPage";
import { ApplicationPage, AddAppsForm , ClientForm, ClientsDetails} from "./Pages/ApplicationPage";
import { InstancePage, AddInstanceForm } from "./Pages/InstancesPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LogPerform } from "./Pages/LogPerform";
import AlertNavbar from "./Alert_page/AlertNavbar/AlertNavbar";
import AlertTable from "./Alert_page/AlertTable/AlertTable";
import ChatRoom from "./Alert_page/Chat/ChatRoom";
import Dashboard from "./Dashboard/Dashboard";
import Settings from "./Pages/Settings";
import { Fragment, useEffect, useState } from "react";
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import ForgotPassword from "./Pages/auth/ForgotPassword";



function App() {
  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("loggedInUser")) || null;
  //   setToken(user?.accessToken);
  // }, [token]);

  return (
    <BrowserRouter>
      {/* {!token ? ( */}
         {/* <Fragment> */}
          {/* These are public pages   */}
          {/* <Routes> */}
            {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/sign-up" element={<Signup />} /> */}
            {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          {/* </Routes> */}
        {/* </Fragment> */}
       {/* ) : ( */}
        {/* <Fragment> */}
          {/* These are private pages   */}

          
          <Titlebar2 />
          <section className="sidebar">
            <Navigationbar />
          </section>
          <Routes>
            <Route path="/servers" element={<ServerPage />}></Route>
            <Route path="/apps" element={<ApplicationPage />}></Route>
            <Route path="/addApp" element={<AddAppsForm />}></Route>
            <Route path="/addClient" element={<ClientForm/>}></Route>
            <Route path="/ClientsDetails" element={<ClientsDetails/>}></Route>
            <Route path="/addServer" element={<AddServerForm />}></Route>
            <Route path="/performance" element={<MetricsTable/>}></Route>
            <Route path="/logs" element={<LogsTable/>}></Route>
            <Route path="/Servers/Instance" element={<InstancePage />}></Route>
            <Route path="/addInstance" element={<AddInstanceForm />}></Route>
            <Route path="/logPerform" element={<LogPerform />}></Route>
            <Route
              path="/alertNavbar"
              element={<AlertNavbar /> && <AlertTable />}
            ></Route>
            <Route path="/alertTable" element={<AlertTable />}></Route>
            <Route path="/chat" element={<ChatRoom />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        {/* </Fragment> */}
       {/* ) */}
    </BrowserRouter>
  );

}


export default App;
