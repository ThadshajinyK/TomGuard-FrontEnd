import React from "react";

import AreaChartExample from "../Areachart";

function Graphview() {
  const data1 = [
    { month: 'Jan', value: 400 },
    { month: 'Feb', value: 300 },
    { month: 'Mar', value: 500 },
    { month: 'Apr', value: 200 },
    { month: 'May', value: 600 },
    { month: 'Jun', value: 350 },
    { month: 'Jul', value: 450 },
    { month: 'Aug', value: 550 },
    { month: 'Sep', value: 350 },
    { month: 'Oct', value: 700 },
    { month: 'Nov', value: 400 },
    { month: 'Dec', value: 550 },
  ];


  const data2 = [
    { month: 'Jan', value: 450 },
    { month: 'Feb', value: 550 },
    { month: 'Mar', value: 350 },
    { month: 'Apr', value: 600 },
    { month: 'May', value: 250 },
    { month: 'Jun', value: 400 },
    { month: 'Jul', value: 700 },
    { month: 'Aug', value: 300 },
    { month: 'Sep', value: 500 },
    { month: 'Oct', value: 400 },
    { month: 'Nov', value: 200 },
    { month: 'Dec', value: 650 },


  ];

  const data3 = [
    { month: 'Jan', value: 200 },
    { month: 'Feb', value: 500 },
    { month: 'Mar', value: 350 },
    { month: 'Apr', value: 400 },
    { month: 'May', value: 600 },
    { month: 'Jun', value: 250 },
    { month: 'Jul', value: 450 },
    { month: 'Aug', value: 550 },
    { month: 'Sep', value: 300 },
    { month: 'Oct', value: 700 },
    { month: 'Nov', value: 550 },
    { month: 'Dec', value: 150 },
  ];




  return (
    <div >
      <section >
        Up Time
        <AreaChartExample data={data1} color="#48C9B0" />
        Response Time
        <AreaChartExample data={data2} color="#F7DC6F" />
        Sample
        <AreaChartExample data={data3} color="#ffc658" />
        <div class="row justify-content-center">
          <div class="col-md-8">

          </div>
          <div className="col-md-2"></div>
          <div class="col-md-2">

          </div>
        </div>


      </section>

    </div>
  );

}

export default Graphview