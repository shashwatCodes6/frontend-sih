import * as React from "react"
import { useState } from "react"

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
import Cookies from "js-cookie"

const FRONTEND_URL = import.meta.env.VITE_APP_FRONTEND_URL
const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL


export function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      window.alert('invalid email');
      return;
    }
    if(password.length > 15 || password.length < 5){
      window.alert('password length should be in range [5, 15]');
      return; 
    }

    const response = await axios.post(`${SERVER_URL}/api/user/login`, {
      email, 
      password 
    });

    // console.log(response)

    if(response.status === 200){
      Cookies.set('accessToken', response.data.accessToken)
      Cookies.set('refreshToken', response.data.refreshToken)
      window.location.href = FRONTEND_URL
    }else{
      window.alert('invalid credentials');
    }
  };


  return (
    <div className="flex justify-center h-screen items-center">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to login.</CardDescription>
      </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Email</Label>
                  <Input onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="Whats your Email?" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Password</Label>
                  <Input onChange={(e) => setPassword(e.target.value)} id="pass" type="password" min="5" max="15" placeholder="Whats your Password?" />
                </div>
              </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline"><Link to="/signup">SignUp</Link></Button>
            <Button type="submit">Login</Button>
          </CardFooter>
        </form>
    </Card>
    </div>
  )
}
