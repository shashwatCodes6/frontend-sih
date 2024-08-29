
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input"
import { useState } from "react"

export default function Chatbot() {
  const [open,setOpen]=useState(false);
  return (
    <div className="fixed bottom-4 right-4 p-3 ">
      {open&&<Card className='m-4 z-10 h-96 w-96'>
        <CardHeader>
          Chat with AI
        </CardHeader>
        <CardContent className='h-80 flex flex-col justify-end'>
          <div className="items-start">
            "Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
            laboris nisi ut aliquip ex ea commodo consequat.
          </div>
          <div className="flex justify-between gap-2">
            <Input></Input>
            <img width="40" height="40" src="https://img.icons8.com/ios-filled/50/sent.png"
              alt="sent" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
        </CardFooter>
      </Card>}
      <div className="flex justify-end">
      <button onClick={()=>{setOpen(prev=>!prev)}} className=' w-20 h-20 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"'>Chatbot</button>
      </div>
    </div>
  )
}
