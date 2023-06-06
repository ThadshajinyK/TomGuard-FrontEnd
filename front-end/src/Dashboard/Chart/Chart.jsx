import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function CircularProgressBar() {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (percentage < 100) {
        setPercentage(percentage + 1);
      }
    }, 50);
  }, [percentage]);

  return (
    
    <ul  >
      
      <li style={{ width: 100}}>
        <CircularProgressbar value={67} text={`${67}%`} /> 
        <h4 style={{fontSize:15}} >cpu usage</h4>
      </li>
      <li style={{ width: 100}}>
        <CircularProgressbar value={81} text={`${81}%`} /> 
        <h4 style={{fontSize:15}}>memory usage</h4>
      </li>
      <li style={{ width: 100}}>
        <CircularProgressbar value={74} text={`${74}%`} /> 
        <h4 style={{fontSize:15}}>storage usage</h4>
      </li>
    </ul>
    
  );
}
export default CircularProgressBar;

