
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import axios from "axios";
import { getLocation } from "./Location";
import MapComponent from "./MapComponent";
import Cookies from "js-cookie";


const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL



export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [currMessage, setCurrMessage] = useState("")
  const [messages, setMessages] = useState([{
    role: "map",
    content: ""
  }]);

  const [inProcess, setInProcess] = useState(false)
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const loc = await getLocation();
        setLocation(loc);
      } catch (err) {
        setError(err);
      }
    };
    if(!location.latitude||!location.longitude)
    fetchLocation();
  }, [location]);

  console.log(messages.length);
  return (
    <div className="w-full p-3 flex flex-col items-center justify-between">
      {open && (
        <Card className='m-4 z-10 h-96 w-full md:w-1/2 bg-white shadow-lg rounded-lg'>
          <CardHeader className='text-xl  font-semibold flex flex-row justify-between items-center p-2 border-b'>
            <span>Chat with AI</span>
            <button onClick={() => setOpen(prev => !prev)} className='text-gray-600 hover:text-gray-900'>
              <img width="25" height="25" src="https://img.icons8.com/ios/50/multiply-2.png" alt="Close chat" />
            </button>
          </CardHeader>
          <CardContent className='h-80 flex flex-col justify-between p-4 space-y-4 overflow-auto'>
            <div className="text-gray-800">
            {
              messages && 
              messages.map((key, ind) => {
                  return key.role === "map" ? (
                    <div className="h-60">
                    <MapComponent lat={location.latitude} lng={location.longitude} />
                    </div>
                  ) : key.role === "user" ? (
                    <div className="flex justify-end m-2">
                      <div key={ind * 10 + Math.floor(Math.random() * 1000)} className="w-fit border border-black rounded-xl p-3 text-sm">
                        {key.content}
                      </div>
                    </div>
                  ) : (
                      <div key={ind * 10 + Math.floor(Math.random() * 1000)} className="flex justify-start border border-black rounded-xl p-3 w-fit max-w-80 text-sm">
                        {key.content}
                      </div>
                  
                  )
                }
              )
            }
            </div>
        {/* <MapComponent lat={location.latitude} lng={location.longitude} /> */}
            <div className="flex items-center gap-2">
              <Input className="flex-1 border-gray-300 shadow-sm rounded-md" placeholder="Type your message..." 
                onChange = {(e) => {
                  setCurrMessage(e.target.value)
                }}
              value = {currMessage} />
              {
                !inProcess ? ( 
                <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
                  id = "SubmitButton"
                  onClick={async () => {
                    const currMsg = currMessage
                    setMessages([...messages, {
                      role: "user",
                      content: currMsg
                    }])
                    console.log("kyu nahi aa raha: ", messages, currMsg)
                    setCurrMessage("")
                    setInProcess(true)


                    axios.post(`${SERVER_URL}/api/chatbot/converse`, {
                      messages: (messages.filter(ele => ele.role !== "map")),
                      newMessage: currMsg
                    },{
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${Cookies.get('refreshToken')}`,
                      },
                    }).then(async res => {
                      setInProcess(false)
                      console.log("response ye aa raha, mistral: ", res)
                      if (Array.isArray(res.data)) {
                        let x = res.data.filter(ele => ele.role !== "system")
                        x.reverse()
                        x.push({role: "map",content: ""})
                        x.reverse()
                        setMessages(x)
                      } else {
                        console.error("Expected res to be an array, but got:", res.data)
                      }
                      // console.log("message: ", messages, location)

                      }).catch(err => {
                        setInProcess(false)
                        alert("some error in server, pls try again later")
                        console.log("some error", err)
                        setOpen(false);
                        setMessages([{
                          role: "map",
                          content: ""
                        }])
                      })
                    if(location.error){
                      console.log(error);
                    }else{
                      console.log(location);
                    }
                  }}
                >
                  <img width="24" height="24" src="https://img.icons8.com/ios-filled/50/sent.png" alt="Send" />
                </button>
                ):
                (
                  <button className="bg-blue-800 text-white p-2 rounded-md focus:outline-none">
                    <img width="24" height="24" src="https://img.icons8.com/ios-filled/50/sent.png" alt="Send" />
                  </button>
                )
              }
            </div>
          </CardContent>
          <CardFooter className="p-4 border-t">
          
          </CardFooter>
        </Card>
      )}
      {!open&&<div className="flex justify-center w-full">
        <button onClick={() => setOpen(prev => !prev)} className='w-full md:w-1/4 rounded-xl h-20 bg-black text-white  shadow-lg flex items-center justify-center text-2xl hover:bg-white hover:text-black focus:outline-none'>
          <span>{messages.length==1?"Click to Start Chat":"Continue Chat"}</span>
        </button>
      </div>}
    </div>
  );
}
