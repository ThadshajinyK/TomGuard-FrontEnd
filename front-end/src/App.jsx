import { Titlebar ,Titlebar2 } from "./Titlebar/Titlebar";
import { Navigationbar } from "./Navigationbar/Navigationbar";
import { ServerPage, AddServerForm } from "./Pages/ServerPage";
import { ApplicationPage, AddAppsForm } from "./Pages/ApplicationPage";
import { InstancePage, AddInstanceForm } from "./Pages/InstancesPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LogPerform } from "./Pages/LogPerform";
import AlertNavbar from './Alert_page/AlertNavbar/AlertNavbar';
import AlertTable from './Alert_page/AlertTable/AlertTable';
import ChatRoom from './Alert_page/Chat/ChatRoom';
import Dashboard from './Dashboard/Dashboard';
import  Graphview  from "./Pages/Graphview";


function App() {
  return (
    <BrowserRouter>
      <Titlebar2 />
      <section className="sidebar">
        <Navigationbar />
      </section>
      <Routes>
        <Route path="/Servers" element={<ServerPage />}></Route>
        <Route path="/Apps" element={<ApplicationPage />}></Route>
        <Route path="/addApp" element={<AddAppsForm />}></Route>
        <Route path="/addServer" element={<AddServerForm />}></Route>
        <Route path="/Servers/Instance" element={<InstancePage />}></Route>
        <Route path="/addInstance" element={<AddInstanceForm />}></Route>
        <Route path="/logPerform" element={<LogPerform />}></Route>
        <Route
          path="/alertNavbar"
          element={<AlertNavbar/> && <AlertTable/>}
        ></Route>
        <Route path="/alertTable" element={<AlertTable />}></Route>
        <Route path="/chat" element={<ChatRoom/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/graphview" element={<Graphview/>}></Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
