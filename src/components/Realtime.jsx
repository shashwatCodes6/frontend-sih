import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Client } from "@gradio/client";

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
  const [client, setClient] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const chartRef = useRef(null);
  const dataRef = useRef(null);

  const visiblePoints = 100; // Number of data points visible at once
  const updateInterval = 900; // Update interval in milliseconds

  useEffect(() => {
    const initClient = async () => {
      const gradioClient = await Client.connect("samyak152002/ecg-real-time-react");
      setClient(gradioClient);
    };
    initClient();
  }, []);

  const fetchEcgData = async () => {
    if (!client) return;
    try {
      const result = await client.predict("/predict", {});
      dataRef.current = result.data[0];
      setCurrentIndex(0); // Reset index when new data is fetched
    } catch (error) {
      console.error("Error fetching ECG data:", error);
    }
  };

  useEffect(() => {
    if (client) {
      fetchEcgData();
      const fetchInterval = setInterval(fetchEcgData, 1000000000); // Fetch new data every 5 seconds
      return () => clearInterval(fetchInterval);
    }
  }, [client]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (dataRef.current) {
        setCurrentIndex(prevIndex => (prevIndex + 1) % dataRef.current.time.length);
      }
    }, updateInterval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chartRef.current && dataRef.current) {
      const chart = chartRef.current;
      
      const startIndex = Math.max(0, currentIndex - visiblePoints);
      const endIndex = currentIndex;

      chart.data.labels = dataRef.current.time.slice(startIndex, endIndex);
      chart.data.datasets.forEach((dataset, i) => {
        const key = ['Cat_F', 'Cat_N', 'Cat_Q', 'Cat_S', 'Cat_V'][i];
        dataset.data = dataRef.current[key].slice(startIndex, endIndex);
      });

      chart.options.scales.x.min = dataRef.current.time[startIndex];
      chart.options.scales.x.max = dataRef.current.time[endIndex - 1];

      chart.update('none');
    }
  }, [currentIndex]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      x: {
        type: 'linear',
        title: { display: true, text: 'Time (s)' },
        ticks: { maxTicksLimit: 10 },
      },
      y: {
        type: 'linear',
        title: { display: true, text: 'Amplitude' },
        min: 0,
        max: 1,
      },
    },
    animation: { duration: 0 },
  };

  const data = {
    labels: [],
    datasets: [
      { label: 'Cat_F', data: [], borderColor: 'rgba(75, 192, 192, 1)', backgroundColor: 'rgba(75, 192, 192, 0.2)', fill: true, tension: 0.1 },
      { label: 'Cat_N', data: [], borderColor: 'rgba(153, 102, 255, 1)', backgroundColor: 'rgba(153, 102, 255, 0.2)', fill: true, tension: 0.1 },
      { label: 'Cat_Q', data: [], borderColor: 'rgba(255, 159, 64, 1)', backgroundColor: 'rgba(255, 159, 64, 0.2)', fill: true, tension: 0.1 },
      { label: 'Cat_S', data: [], borderColor: 'rgba(255, 99, 132, 1)', backgroundColor: 'rgba(255, 99, 132, 0.2)', fill: true, tension: 0.1 },
      { label: 'Cat_V', data: [], borderColor: 'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235, 0.2)', fill: true, tension: 0.1 },
    ],
  };

  return (
    <div>
      <h2>Real-Time ECG Visualization</h2>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default Realtime;