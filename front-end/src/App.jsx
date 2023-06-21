import { Titlebar2 } from "./Titlebar/Titlebar";
import { Navigationbar } from "./Navigationbar/Navigationbar";
import { ServerPage, AddServerForm } from "./Pages/ServerPage";
import { ApplicationPage, AddAppsForm } from "./Pages/ApplicationPage";
import { InstancePage, AddInstanceForm } from "./Pages/InstancesPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LogPerform } from "./Pages/LogPerform";
import AlertTable from "./Alert_page/AlertTable/AlertTable";
import Dashboard from "./Dashboard/Dashboard";
import Settings from "./Pages/Settings";
import { Fragment, useContext, useEffect, useState } from "react";
import ChatLogin from "./Alert_page/Chat/chat_pages/ChatLogin";
import ChatRegister from "./Alert_page/Chat/chat_pages/ChatRegister";
import { AuthContext } from "./Alert_page/Chat/context/AuthContext";
import ChatHome from "./Alert_page/Chat/chat_pages/ChatHome";

function App() {
  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("loggedInUser")) || null;
  //   setToken(user?.accessToken);
  // }, [token]);

  //This code for chat
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/chatLogin" />;
    }
    return children;
  };
  //end

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
        <Route path="/addServer" element={<AddServerForm />}></Route>
        <Route path="/Servers/Instance" element={<InstancePage />}></Route>
        <Route path="/addInstance" element={<AddInstanceForm />}></Route>
        <Route path="/logPerform" element={<LogPerform />}></Route>

        <Route
          path="/alert"
          element={<AlertTable />}
        ></Route>
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatHome />
            </ProtectedRoute>
          }
        />
        <Route path="/chatLogin" element={<ChatLogin />}></Route>
        <Route path="/chatRegister" element={<ChatRegister />}></Route>

        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
