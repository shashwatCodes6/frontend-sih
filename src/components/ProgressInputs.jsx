
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";



const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL

export default function ProgressInputs() {

  const [BW, setBW] = useState('');
  const [HR, setHR] = useState('');
  const [ECG, setECG] = useState('');
  const [BSL, setBSL] = useState('');
  const [BP, setBP] = useState('');
  const [BO, setBO] = useState(''); 

  async function handleSubmit(event){
    event.preventDefault();

    if(!BW || !HR || !ECG || !BSL || !BP || !BO){
      window.alert('invalid inputs')
      return;
    }

    try{
      const response = await axios.post(`${SERVER_URL}/api/metrics/update`,
        {
          metrics: {BW ,HR ,ECG ,BSL ,
          BP:{
            systolic : BP.split('/')[0],
            diastolic: BP.split('/')[1]
          },
          BO}
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('refreshToken')}`,
          },
        }
      )
      console.log(response)

      if(response.ok){
        console.log("ok")
      }

    }catch(err){
      console.log(err)
      window.alert('some error occured');
    }

  }


  return (
    <Card className='w-1/2'>
      <form onSubmit={handleSubmit}>
      <CardHeader>Enter your daily Health Metrics</CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="BW">Body Weight(in kgs)</Label>
          <Input onChange = {(e) => setBW(e.target.value)} id="BW" type="number">
          </Input>
        </div>
        <div>
          <Label htmlFor="HR">Heart Rate</Label>
          <Input onChange = {(e) => setHR(e.target.value)} id="HR" type="number">
          </Input>
        </div>
        <div>
          <Label htmlFor="ECG">ECG</Label>
          <Input onChange = {(e) => setECG(e.target.value)} id="ECG" type="string">
          </Input>
        </div>
        <div>
          <Label htmlFor="BSL">Blood Sugar Level</Label>
          <Input onChange = {(e) => setBSL(e.target.value)} id="BSL" type="number">
          </Input>
        </div>
        <div>
          <Label htmlFor="BP">Blood Pressure</Label>
          <Input onChange = {(e) => setBP(e.target.value)} id="BP" type="string" placeholder="enter like sys/dias">
          </Input>
        </div>
        <div>
          <Label htmlFor="BO">Blood Oxygen(in spO2)</Label>
          <Input onChange = {(e) => setBO(e.target.value)} id="BO" type="number">
          </Input>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit">Submit</Button>
      </CardFooter>
      </form>
    </Card>
  )
}
