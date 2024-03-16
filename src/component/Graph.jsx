import React, { useState, useEffect } from 'react';

import { Chart as ChartJs, LineElement, BarElement, PointElement, CategoryScale, LinearScale } from "chart.js";
import { Line } from 'react-chartjs-2';

ChartJs.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement

)
const Graph = () => {

  const Url = 'https://checkinn.co/api/v1/int/requests'
  const [requestData, setRequestData] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://checkinn.co/api/v1/int/requests');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(requestData)
        const firstFourRequests = data.requests.slice(0, 4);
        setRequestData(firstFourRequests);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const labels = requestData.map((item) => item.hotel.shortname)
  const data = {
    labels: labels,
    datasets: [{
      label: "Number of Requests",
      data: [7, 1, 6, 5],

      fill: false,
      backgroundColor: [
        "rgba(75,192,192,1)",
        "#ecf0f1",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0",
      ],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  }



  const options = {
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 8
      }
    },
    type: 'category',
    indexAxis: 'x'
  };

  return (
    <div>
      <div>
        <h2>Request Per Hotel</h2>
      </div>
      <Line height={200} width={600} data={data} options={options} />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        Total requests: 19
        List of unique department names across all Hotels: Housekeeping, Front Desk, Maintenance, Concierge, Spa, Fitness, Catering, Security, Recreation, Room Service, Water Sports, Guest Services
      </div>
    </div>
  );
}

export default Graph;
