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
  const [clients, setClients] = useState({});
  const [currentTime, setCurrentTime] = useState(0);
  const chartRefs = {
    ecg: useRef(null),
    bloodOxygen: useRef(null),
    heartRate: useRef(null),
    sugarLevel: useRef(null),
  };
  const dataRefs = {
    ecg: useRef({ time: [], Cat_F: [], Cat_N: [], Cat_Q: [], Cat_S: [], Cat_V: [] }),
    bloodOxygen: useRef({ time: [], oxygen_level: [] }),
    heartRate: useRef({ time: [], heart_rate: [] }),
    sugarLevel: useRef({ time: [], sugar_level: [] }),
  };

  const visiblePoints = 100;
  const updateInterval = 2;

  useEffect(() => {
    const initClients = async () => {
      const ecgClient = await Client.connect("samyak152002/ecg-real-time-react");
      const healthClient = await Client.connect("samyak152002/blood-pressure-heart-rate");
      setClients({ ecg: ecgClient, health: healthClient });
    };
    initClients();
  }, []);

  const fetchData = async (clientKey, endpoint, dataRef, dataType) => {
    if (!clients[clientKey]) return;
    try {
      const result = await clients[clientKey].predict(endpoint, {});
      const newData = result.data[0];
      console.log(`Data fetched for ${dataType}:`, newData);
      
      Object.keys(newData).forEach(key => {
        if (Array.isArray(dataRef.current[key])) {
          dataRef.current[key] = [...dataRef.current[key], ...newData[key]];
          if (dataRef.current[key].length > visiblePoints) {
            dataRef.current[key] = dataRef.current[key].slice(-visiblePoints);
          }
        }
      });
    } catch (error) {
      console.error(`Error fetching data for ${dataType}:`, error);
    }
  };

  useEffect(() => {
    if (clients.ecg && clients.health) {
      const fetchAllData = async () => {
        await Promise.all([
          fetchData('ecg', "/predict", dataRefs.ecg, "ECG"),
          fetchData('health', "/predict", dataRefs.bloodOxygen, "Blood Oxygen"),
          fetchData('health', "/predict_1", dataRefs.heartRate, "Heart Rate"),
          fetchData('health', "/predict_2", dataRefs.sugarLevel, "Sugar Level"),
        ]);
      };

      fetchAllData();
      const fetchInterval = setInterval(fetchAllData, 1000);

      return () => clearInterval(fetchInterval);
    }
  }, [clients]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(prevTime => prevTime + updateInterval / 1000);
    }, updateInterval);

    return () => clearInterval(interval);
  }, []);

  const updateChart = (chartRef, dataRef, keys) => {
    if (chartRef.current && dataRef.current) {
      const chart = chartRef.current;
      const data = dataRef.current;
      
      const newLabels = Array.from({ length: visiblePoints }, (_, i) => currentTime - (visiblePoints - 1 - i) * updateInterval / 1000);
      
      chart.data.labels = newLabels;
      chart.data.datasets.forEach((dataset, i) => {
        const key = keys[i];
        dataset.data = data[key].slice(-visiblePoints);
      });

      chart.options.scales.x.min = newLabels[0];
      chart.options.scales.x.max = currentTime;

      chart.update();
    }
  };

  useEffect(() => {
    updateChart(chartRefs.ecg, dataRefs.ecg, ['Cat_F', 'Cat_N', 'Cat_Q', 'Cat_S', 'Cat_V']);
    updateChart(chartRefs.bloodOxygen, dataRefs.bloodOxygen, ['oxygen_level']);
    updateChart(chartRefs.heartRate, dataRefs.heartRate, ['heart_rate']);
    updateChart(chartRefs.sugarLevel, dataRefs.sugarLevel, ['sugar_level']);
  }, [currentTime]);

  const commonOptions = {
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
        title: { display: true, text: 'Value' },
        beginAtZero: true,
      },
    },
    animation: {
      duration: 0,
    },
  };

  const createDataConfig = (label, color) => ({
    labels: [],
    datasets: [{ 
      label, 
      data: [], 
      borderColor: color, 
      backgroundColor: color.replace('1)', '0.1)'),
      fill: true, 
      tension: 0.4,
      pointRadius: 0,
    }]
  });

  const ecgData = {
    labels: [],
    datasets: [
      { label: 'Cat_F', data: [], borderColor: 'rgba(75, 192, 192, 1)', fill: false, tension: 0.4, pointRadius: 0 },
      { label: 'Cat_N', data: [], borderColor: 'rgba(153, 102, 255, 1)', fill: false, tension: 0.4, pointRadius: 0 },
      { label: 'Cat_Q', data: [], borderColor: 'rgba(255, 159, 64, 1)', fill: false, tension: 0.4, pointRadius: 0 },
      { label: 'Cat_S', data: [], borderColor: 'rgba(255, 99, 132, 1)', fill: false, tension: 0.4, pointRadius: 0 },
      { label: 'Cat_V', data: [], borderColor: 'rgba(54, 162, 235, 1)', fill: false, tension: 0.4, pointRadius: 0 },
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Real-Time Health Monitoring</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">ECG</h3>
          <div className="h-64">
            <Line ref={chartRefs.ecg} data={ecgData} options={commonOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Blood Oxygen</h3>
          <div className="h-64">
            <Line ref={chartRefs.bloodOxygen} data={createDataConfig('Blood Oxygen', 'rgba(153, 102, 255, 1)')} options={commonOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Heart Rate</h3>
          <div className="h-64">
            <Line ref={chartRefs.heartRate} data={createDataConfig('Heart Rate', 'rgba(255, 159, 64, 1)')} options={{...commonOptions, scales: {...commonOptions.scales, y: {...commonOptions.scales.y, suggestedMax: 100}}}} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Sugar Level</h3>
          <div className="h-64">
            <Line ref={chartRefs.sugarLevel} data={createDataConfig('Sugar Level', 'rgba(255, 99, 132, 1)')} options={commonOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Realtime;
