import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Client } from "@gradio/client";

// Register Chart.js components, including Filler
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Realtime = () => {
  const [data, setData] = useState({
    labels: [], // Time values
    datasets: [] // Datasets for each category
  });
  const [client, setClient] = useState(null);

  // Initialize the Gradio client
  useEffect(() => {
    const initClient = async () => {
      const gradioClient = await Client.connect("samyak152002/ecg-real-time-react");
      setClient(gradioClient);
    };
    initClient();
  }, []);

  // Function to fetch ECG data from the Gradio API
  const fetchEcgData = async () => {
    if (!client) return;
    try {
      const result = await client.predict("/predict", {});
      console.log(result.data, "data"); // Log the API response data
      const { Cat_F, Cat_N, Cat_Q, Cat_S, Cat_V, time } = result.data[0];
      console.log(Cat_F)
      // Prepare datasets
      const datasets = [
        {
          label: 'Cat_F',
          data: Cat_F,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.1,
        },
        {
          label: 'Cat_N',
          data: Cat_N,
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          fill: true,
          tension: 0.1,
        },
        {
          label: 'Cat_Q',
          data: Cat_Q,
          borderColor: 'rgba(255, 159, 64, 1)',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          fill: true,
          tension: 0.1,
        },
        {
          label: 'Cat_S',
          data: Cat_S,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
          tension: 0.1,
        },
        {
          label: 'Cat_V',
          data: Cat_V,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
          tension: 0.1,
        },
      ];

      setData({
        labels: time,
        datasets: datasets.map(dataset => ({
          ...dataset,
          data: dataset.data.map((value, index) => ({ x: time[index], y: value }))
        }))
      });
      console.log(datasets, "datasets");
    } catch (error) {
      console.error("Error fetching ECG data:", error);
    }
  };

  // Use `useEffect` to fetch data at regular intervals
  useEffect(() => {
    
    const interval = setInterval(() => {
      fetchEcgData();
    }, 1000); // Fetch new data every second
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [client]); // Dependency array includes `client` to re-run when client is set

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        type: 'linear', // Use 'linear' scale if time is numeric
        title: {
          display: true,
          text: 'Time (ms)',
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Amplitude',
        },
      },
    },
  };

  return (
    <div>
      <h2>Real-Time ECG Visualization</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default Realtime;