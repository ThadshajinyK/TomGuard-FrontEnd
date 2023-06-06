import React from "react";
import "../Styles/LogPageStyles.css";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

export const LogPerform = () => {
    const logs = [
        {
            timestamp: '16:43:12 5m 37s ago',
            level: 'warning',
            message: 'Connection timed out',
            metaOS: 'Windows',
            metaVersionCode: '2.1.4'
        },
        {
            timestamp: '12:15:56 1h 12m 4s ago',
            level: 'error',
            message: 'Failed to load resource',
            metaOS: 'iOS',
            metaVersionCode: '1.0.3'
        },
        {
            timestamp: '09:21:02 3h 45m 11s ago',
            level: 'info',
            message: 'User session started',
            metaOS: 'Linux',
            metaVersionCode: '4.2.1'
        },
        {
            timestamp: '01:59:45 7m 34s ago',
            level: 'debug',
            message: 'API request sent',
            metaOS: 'Windows',
            metaVersionCode: '3.0.2'
        },
        {
            timestamp: '18:27:19 2h 10m 59s ago',
            level: 'info',
            message: 'Order received',
            metaOS: 'Android',
            metaVersionCode: '1.2.5'
        },
        {
            timestamp: '07:52:13 23m 52s ago',
            level: 'warning',
            message: 'Low disk space',
            metaOS: 'MacOS',
            metaVersionCode: '5.0.1'
        }

    ];

    return (
        <div className="InstanceContent">
            {/* <div className="row">
                <ul className="nav nav-tabs">
                    <li className="nav-item"><a className="nav-link" href="#">Logs</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Performance</a></li>
                </ul>

            </div> */}


            {/* Logs Table */}
            <div className="row">
                <div class="mt-4">
                    <h3>Logs</h3>
                    <div className="table-responsive-xxl">
                    <table class="table table-hover">
                        <thead className="table-active">
                            <tr>
                                <th>timestamp</th>
                                <th>Level</th>
                                <th>Message</th>
                                <th class="text-center">meta.OS.type</th>
                                <th class="text-center">meta.version.code</th>

                            </tr>
                        </thead>
                        {logs.map((val, key) => {
                            return (
                                <tbody><tr key={key}>
                                    <td><Link to="/logPerform"><Icon icon="ri:external-link-line" color="#36b5bd" width="25" height="25" /></Link>{val.timestamp}</td>
                                    <td>{val.level}</td>
                                    <td >{val.message}</td>
                                    <td class="text-center">{val.metaOS}</td>
                                    <td class="text-center">{val.metaVersionCode}<Icon icon="ic:outline-more-horiz" width="25" height="25" /></td>
                                </tr>
                                </tbody>
                            )
                        })}
                    </table>
                    </div>
                    
                </div>
            </div>


        </div>


    );
}



