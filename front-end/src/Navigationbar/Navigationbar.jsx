import React from "react";
import "./NavBarStyles.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export const Navigationbar = ({ alertCount }) => {
  return (
    <div>
      <ul className="sidebar-lists">
        <li>
          <Link to="/dashboard" className="sidebar-item">
            <Icon icon="material-symbols:dashboard-customize-outline-rounded" />
            <span>Dashboard</span>
          </Link>
        </li>

        <li>
          <Link to="/servers" className="sidebar-item ">
            <Icon icon="ion:server-outline" />
            <span>Server</span>
          </Link>
        </li>
        <li>
          <Link to="/apps" className="sidebar-item">
            <Icon icon="ion:apps-sharp" />
            <span>Apps</span>
          </Link>
        </li>

        <li>
          <Link to="/alert" className="sidebar-item">
            <Icon icon="ri:notification-4-line" />
            <span className="side"></span>
            <span>Alerts</span>
            {alertCount > 0 && <span className="badge">{alertCount}</span>}
          </Link>
        </li>

        <li>
          <Link to="/settings" className="sidebar-item">
            <Icon icon="material-symbols:settings-applications-outline" />
            <span className="side"></span>
            <span>Settings</span>
          </Link>
        </li>
        <li>
          <Link to="/chat" className="chatLink">
            <Icon icon="fluent:chat-12-filled" className="chatIcon" />
          </Link>
        </li>
      </ul>
    </div>
  );
};
