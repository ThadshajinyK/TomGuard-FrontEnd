// import React, { useEffect, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
// import axios from 'axios';

//  export function Linechart() {
//   // const [data, setData] = useState([]);

//   // useEffect(() => {
//   //   fetchData();
//   // }, []);

//   // const fetchData = async () => {
//   //   // Simulating fetching data from the backend
//   //   const response = [
//   //     { timestamp: '2023-06-24 09:00:00', uptime: 99.8, responseTime: 120, requestTime: 150 },
//   //     { timestamp: '2023-06-24 10:00:00', uptime: 99.9, responseTime: 110, requestTime: 160 },
//   //     { timestamp: '2023-06-24 11:00:00', uptime: 99.7, responseTime: 130, requestTime: 140 },
//   //     { timestamp: '2023-06-24 12:00:00', uptime: 99.6, responseTime: 140, requestTime: 170 },
//   //     { timestamp: '2023-06-24 13:00:00', uptime: 99.8, responseTime: 125, requestTime: 155 },
//   //     { timestamp: '2023-06-24 14:00:00', uptime: 99.9, responseTime: 115, requestTime: 165 },
//   //     { timestamp: '2023-06-24 15:00:00', uptime: 99.7, responseTime: 135, requestTime: 145 },
//   //     { timestamp: '2023-06-24 16:00:00', uptime: 99.6, responseTime: 145, requestTime: 175 },
//   //   ];

//   //   setData(response);
//   // };

//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:9090/metrics'); // Replace '/api/metrics' with your actual backend API endpoint
//       setData(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   return (
//     <div>
//       Time(ms)
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="timestamp" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="uptime" stroke="#8884d8" name="Uptime"/>
//           <Line type="monotone" dataKey="responseTime" stroke="#82ca9d" name="Response Time" />
//           <Line type="monotone" dataKey="requestTime" stroke="#ff0000" name="Request Time" />
//         </LineChart>

//       </ResponsiveContainer>
//     </div>

//   );
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export function Linechart() {
  const [data, setData] = useState([]);

  const colors = JSON.parse(localStorage.getItem("colorCollections"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9090/metrics/all');
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Time(ms)
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="uptimeInMillis" stroke={colors?.colors[0]} name="Uptime" />
          <Line type="monotone" dataKey="responseTimeInMillis" stroke={colors?.colors[1]} name="Response Time" />
          <Line type="monotone" dataKey="requestTimeInMillis" stroke={colors?.colors[2]} name="Request Time" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
