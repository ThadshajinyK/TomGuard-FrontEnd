import { Titlebar2 } from "./Titlebar/Titlebar";
import { Navigationbar } from "./Navigationbar/Navigationbar";
import {
  ServerPage,
  AddServerForm,
  MetricsTable,
  LogsTable,
} from "./Pages/ServerPage";
import {
  ApplicationPage,
  ClientForm,
  ClientsDetails,
} from "./Pages/ApplicationPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LogPerform } from "./Pages/LogPerform";
import Settings from "./Pages/Settings";
import { Fragment, useContext, useState } from "react";
import ChatLogin from "./Alert_page/Chat/chat_pages/ChatLogin";
import ChatRegister from "./Alert_page/Chat/chat_pages/ChatRegister";
import { AuthContext } from "./Alert_page/Chat/context/AuthContext";
import ChatHome from "./Alert_page/Chat/chat_pages/ChatHome";
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import ForgotPassword from "./Pages/auth/ForgotPassword";
import ResetPassword from "./Pages/auth/ResetPassword";

function App() {
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
    <Fragment>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <div className="AppMain">

              <Route path="/alert" element={<AlertTable />}></Route>


      )}
    </Fragment>
  );
}

export default App;
