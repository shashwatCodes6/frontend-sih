import { useState } from "react";
import { Chart } from "./Chart";
import ProgressInputs from "./ProgressInputs";
import { Link } from "react-router-dom";
export default function Progress() {
  const [metrics, setMetrics] = useState([]);
  // ye fetch krne hai!!

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
        <Chart />
        <Chart />
        <Chart />
        <Chart />
        <Chart />
        <Chart />
      </div>
      <ProgressInputs />
    </div>
  );
}
