import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL


export function SignUp() {
  const navigate = useNavigate()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState()


  const handleSubmit = async (event) => {
    event.preventDefault();


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   
    if (!email || !emailRegex.test(email)) {
      window.alert('invalid email');
      return;
    }
    if(!password || password.length > 15 || password.length < 5){
      window.alert('password length should be in range [5, 15]');
      return; 
    }
    if(!name || name.length === 0){
      window.alert('enter a name');
      return;
    }
    if(!age || age < 1 || age > 100){
      window.alert('age should be between 1 to 100')
      return;
    }

    const response = await axios.post(`${SERVER_URL}/api/user/signup`, {
      email, 
      password, 
      age, 
      name
    });

    // console.log(response)

    if(response.status === 200){
      window.alert('congrats! you are a member now!!')
      navigate('/login');
    }else{
      window.alert('invalid credentials');
    }
  };

  return (
    <div className="flex justify-center h-screen items-center">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>Enter your credentials to Signup.</CardDescription>
      </CardHeader>
        <form onSubmit={handleSubmit}>
        <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input onChange = {(e) => setName(e.target.value)} id="name" type="text" placeholder="Whats your Name?" />
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Age</Label>
                <Input onChange = {(e) => setAge(e.target.value)} id="age" type="number" min="1" max="100" placeholder="Whats your Age?" />
              </div>
              
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input onChange = {(e) => setEmail(e.target.value)} id="email" type="email" placeholder="Whats your Email?" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input onChange = {(e) => setPassword(e.target.value)} id="pass" type="password" placeholder="Whats your Password?" />
              </div>

            </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline"><Link to="/login">Login</Link></Button>
          <Button type="submit">Signup</Button>
        </CardFooter>
      </form>
    </Card>
    
    </div>
  )
}
