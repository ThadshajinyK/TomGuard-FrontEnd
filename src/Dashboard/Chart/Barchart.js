import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' 
    },
    title: {
      display: true,
      text: 'Log count',
    },
  },
};

const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Week',
      data: [120,47,87,98,89,38,142],
      backgroundColor: '#5C5CFF',
      barThickness: 6
    }
    
  ],
};

export function Barchart() {
  return(
    <div style={{
        height:'15%',
        width:'25%'
    }}>
         <Bar options={options} data={data} />
    </div>
    
  );
}
