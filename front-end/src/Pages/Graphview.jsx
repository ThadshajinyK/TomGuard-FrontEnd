// import React from "react";

// import AreaChartExample from "../Areachart";

// function Graphview() {
//   const data1 = [
//     { month: 'Jan', value: 400 },
//     { month: 'Feb', value: 300 },
//     { month: 'Mar', value: 500 },
//     { month: 'Apr', value: 200 },
//     { month: 'May', value: 600 },
//     { month: 'Jun', value: 350 },
//     { month: 'Jul', value: 450 },
//     { month: 'Aug', value: 550 },
//     { month: 'Sep', value: 350 },
//     { month: 'Oct', value: 700 },
//     { month: 'Nov', value: 400 },
//     { month: 'Dec', value: 550 },
//   ];


//   const data2 = [
//     { month: 'Jan', value: 450 },
//     { month: 'Feb', value: 550 },
//     { month: 'Mar', value: 350 },
//     { month: 'Apr', value: 600 },
//     { month: 'May', value: 250 },
//     { month: 'Jun', value: 400 },
//     { month: 'Jul', value: 700 },
//     { month: 'Aug', value: 300 },
//     { month: 'Sep', value: 500 },
//     { month: 'Oct', value: 400 },
//     { month: 'Nov', value: 200 },
//     { month: 'Dec', value: 650 },


//   ];

//   const data3 = [
//     { month: 'Jan', value: 200 },
//     { month: 'Feb', value: 500 },
//     { month: 'Mar', value: 350 },
//     { month: 'Apr', value: 400 },
//     { month: 'May', value: 600 },
//     { month: 'Jun', value: 250 },
//     { month: 'Jul', value: 450 },
//     { month: 'Aug', value: 550 },
//     { month: 'Sep', value: 300 },
//     { month: 'Oct', value: 700 },
//     { month: 'Nov', value: 550 },
//     { month: 'Dec', value: 150 },
//   ];




//   return (
//     <div >
//       <section >
//         Up Time
//         <AreaChartExample data={data1} color="#48C9B0" />
//         Response Time
//         <AreaChartExample data={data2} color="#F7DC6F" />
//         Request Time
//         <AreaChartExample data={data3} color="#FF5992" />
//         <div class="row justify-content-center">
//           <div class="col-md-8">

//           </div>
//           <div className="col-md-2"></div>
//           <div class="col-md-2">

//           </div>
//         </div>


//       </section>

//     </div>
//   );

// }

// export default// Graphview

import React, { useState, useEffect } from "react";
import AreaChartExample from "../Areachart";

function Graphview() {
  const [metricsData, setMetricsData] = useState([]);

  const colors = JSON.parse(localStorage.getItem("colorCollections"));

  const fetchMetricsData = async () => {
    try {
      const response = await fetch('http://localhost:9090/api/metrics/all');
      if (response.ok) {
        const data = await response.json();
        setMetricsData(data);
      } else {
        console.error('Failed to fetch metrics data');
      }
    } catch (error) {
      console.error('Error fetching metrics data:', error);
    }
  };

  useEffect(() => {
    // Fetch metrics data initially
    fetchMetricsData();

    // Fetch metrics data every 1 seconds (adjust the interval as per your requirements)
    const interval = setInterval(fetchMetricsData, 1000);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  const uptimeData = metricsData.map(metric => ({
    month: metric.timestamp,
    value: metric.uptimeInMillis,
  }));

  const responseTimeData = metricsData.map(metric => ({
    month: metric.timestamp,
    value: metric.responseTimeInMillis,
  }));

  const requestTimeData = metricsData.map(metric => ({
    month: metric.timestamp,
    value: metric.requestTimeInMillis,
  }));

  return (
    <div>
      <section>
        Up Time
        <AreaChartExample data={uptimeData} color={colors?.colors[0]} />
        Response Time
        <AreaChartExample data={responseTimeData} color={colors?.colors[1]} />
        Request Time
        <AreaChartExample data={requestTimeData} color={colors?.colors[2]} />
        <div className="row justify-content-center">
          <div className="col-md-8"></div>
          <div className="col-md-2"></div>
          <div className="col-md-2"></div>
        </div>
      </section>
    </div>
  );
}

export default Graphview;
