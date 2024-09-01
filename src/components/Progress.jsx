import { useEffect, useState } from "react";
import { Chart } from "./Chart";
import ProgressInputs from "./ProgressInputs";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { data } from "autoprefixer";


export default function Progress() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState([]);
  const [BOArray, setBOArray] = useState([]);
  const [BPArray, setBPArray] = useState([]);
  const [BSLArray, setBSLArray] = useState([]);
  const [BWArray, setBWArray] = useState([]);
  const [HRArray, setHRArray] = useState([]);
  const uri = import.meta.env.VITE_APP_SERVER_URL;

  const fetch = async () => {
    try {
      const response = await axios.get(`${uri}/api/metrics/getMetrics`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${Cookies.get('refreshToken')}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        const data = response.data;
        console.log('ye', data);
        console.log('fetch ho gaya');
        return data.metrics;
      }
      else {
        console.log('not ok');
      }
    } catch (error) {
      console.log('fe ko fetch krne me dikat aayi', error);
    }
  }
  useEffect(() => {
    if (!Cookies.get('accessToken')) {
      navigate('/login');
    }
  }, [Cookies, navigate])
  useEffect(() => {
    const fetchData = async () => {
      const dataArray = await fetch(); // Replace with your fetch function

      // Update state arrays directly
      if (Array.isArray(dataArray) && dataArray.length > 0) {
        setBOArray(prev => [...prev, ...dataArray.map(({ BO, date }) => ({ value: BO, date }))]);
        setBPArray(prev => [...prev, ...dataArray.map(({ BP, date }) => ({ value: BP, date }))]);
        setBSLArray(prev => [...prev, ...dataArray.map(({ BSL, date }) => ({ value: BSL, date }))]);
        setBWArray(prev => [...prev, ...dataArray.map(({ BW, date }) => ({ value: BW, date }))]);
        setHRArray(prev => [...prev, ...dataArray.map(({ HR, date }) => ({ value: HR, date }))]);
      }
    };
    console.log('values updated');

    fetchData();
  }, []);
  return (
    <div className="dark h-full w-screen flex flex-col gap-8 justify-center m-8">
      <Link to="/">
        <div className="flex">
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/ios-filled/50/back.png"
            alt="back"
          />
          <p className="text-xl font-bold">Back</p>
        </div>
      </Link>
      <div className="bg-black text-white grid grid-cols-1  md:grid-cols-2 w-screen items-center">
        <Chart obj={BOArray} type="BO" />
        <Chart obj={BSLArray} type="BSL" />
        <Chart obj={BWArray} type="BW" />
        <Chart obj={HRArray} type="HR" />
      </div>
      <div className="bg-black text-white flex justify-center pb-8">
        <Chart obj={BPArray} type="BP" /> 
      </div>
      <ProgressInputs />
    </div>
  );
}
