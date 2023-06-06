import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
  // Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" 
    },
    title: {
      display: true,
      text: "Network Traffic",
    },
  },
};

const labels = ["00","1", "2", "3", "4", "5", "6", "7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];

export const data = {
  labels,
  datasets: [
    {
      label: "hour",
      data: [20,43,78,87,23,76,98,28,98,47,76,26,65,89,57,73,17,63,43,86,43,56,29,11],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    }
    // {
    //     label: "day",
    //     data: [34,76,57,35,98,54,67,58,39,44,12,56,43,43,43,56,98,15,34,56,47,58,24,65],
    //     borderColor: "rgb(255, 99, 132)",
    //     backgroundColor: "rgba(255, 99, 132, 0.5)",
    //   }
    
  ],
};

export function Linechart() {
  return (
  <div style={{
    height:'100%'
  
  }}>
     <Line options={options} data={data} />
  </div>
 );
}
