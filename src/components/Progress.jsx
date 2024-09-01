import { useEffect, useState } from "react";
import { Chart } from "./Chart";
import ProgressInputs from "./ProgressInputs";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
export default function Progress() {
  const [metrics, setMetrics] = useState([]);
  const [BOArray, setBOArray] = useState([]);
  const [BPArray, setBPArray] = useState([]);
  const [BSLArray, setBSLArray] = useState([]);
  const [BWArray, setBWArray] = useState([]);
  const [ECGArray, setECGArray] = useState([]);
  const [HRArray, setHRArray] = useState([]);
  const uri=import.meta.env.VITE_APP_SERVER_URL;
  // ye fetch krne hai!!

  const fetch=async ()=>{
    try {
      const response=await axios.get(`${uri}/api/metrics/getMetrics`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${Cookies.get('refreshToken')}`,
        },
      });
      console.log(response);
      if(response.status===200){
        const data= response.data;
        console.log('ye',data);
        console.log('fetch ho gaya');
        return data.metrics;
      }
      else {
        console.log('not ok');
      }
    } catch (error) {
      console.log('fe ko fetch krne me dikat aayi',error);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
        const dataArray = await fetch(); // Replace with your fetch function

        // Update state arrays directly
        setBOArray(prev => [...prev, ...dataArray.map(({ BO, date }) => ({ value: BO, date }))]);
        setBPArray(prev => [...prev, ...dataArray.map(({ BP, date }) => ({ value: BP, date }))]);
        setBSLArray(prev => [...prev, ...dataArray.map(({ BSL, date }) => ({ value: BSL, date }))]);
        setBWArray(prev => [...prev, ...dataArray.map(({ BW, date }) => ({ value: BW, date }))]);
        setECGArray(prev => [...prev, ...dataArray.map(({ ECG, date }) => ({ value: ECG, date }))]);
        setHRArray(prev => [...prev, ...dataArray.map(({ HR, date }) => ({ value: HR, date }))]);
    };
    console.log('values updated');

    fetchData();
}, []); 
  // const chartData = [
  //   { month: "Sunday", desktop: 186, mobile: 80 },
  //   { month: "Monday", desktop: 305, mobile: 200 },
  //   { month: "Tuesday", desktop: 237, mobile: 120 },
  //   { month: "Wednesday", desktop: 73, mobile: 190 },
  //   { month: "Thursday", desktop: 209, mobile: 130 },
  //   { month: "Friday", desktop: 214, mobile: 140 },
  //   { month: "Saturday", desktop: 214, mobile: 140 },
  // ];
  
  // const chartConfig= {
  //   desktop: {
  //     label: "Desktop",
  //     color: "#2563eb",
  //   },
  //   mobile: {
  //     label: "Mobile",
  //     color: "#60a5fa",
  //   },
  // };


  return (
    <div className=" w-screen flex flex-col justify-center m-8">
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
      <div className="grid grid-cols-1  md:grid-cols-2 w-screen items-center">
        <Chart obj={BOArray} type="BO"/>
        <Chart obj={BSLArray} type="BSL"/>
        <Chart obj={BWArray}type="BWA"/>
        {/* <Chart obj={ECGArray} type="ECG"/> */}
        <Chart obj={HRArray} type="HR"/>
        <Chart obj={BPArray} type="BP"/>
      </div>
      <ProgressInputs />
    </div>
  );
}
