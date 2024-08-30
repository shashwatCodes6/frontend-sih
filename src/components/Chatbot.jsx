import { Button } from "@/components/ui/button";
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




export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [currMessage, setCurrMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      sender: 0,
      message: "Hi! How can I help you today?"
    }
  ]);
  const [inProcess, setInProcess] = useState(false)
  

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  const fetchLocation = async () => {
    try {
      const loc = await getLocation();
      setLocation(loc);
    } catch (err) {
      setError(err);
    }
  };

  fetchLocation();


  return (
    <div className="fixed bottom-4 right-4 p-3 flex flex-col justify-between">
      {open && (
        <Card className='m-4 z-10 h-96 w-80 md:w-96 bg-white shadow-lg rounded-lg'>
          <CardHeader className='text-xl font-semibold flex flex-row justify-between items-center p-2 border-b'>
            <span>Chat with AI</span>
            <button onClick={() => setOpen(prev => !prev)} className='text-gray-600 hover:text-gray-900'>
              <img width="25" height="25" src="https://img.icons8.com/ios/50/multiply-2.png" alt="Close chat" />
            </button>
          </CardHeader>
          <CardContent className='h-80 flex flex-col justify-between p-4 space-y-4 overflow-auto'>
            <div className="text-gray-800">
            {
              messages.map((key, ind) => {
                return (key.sender === 1 ? (
                    <div className="flex justify-end m-2">
                      <div key={ind * 10 + Math.floor(Math.random() * 1000)} className="w-fit border border-black rounded-xl p-3 text-sm">
                        {key.message}
                      </div>
                    </div>
                  ):
                  (
                    <div key={ind * 10 + Math.floor(Math.random() * 1000)} className="flex justify-start border border-black rounded-xl p-3 w-fit max-w-64 text-sm">
                      {key.message}
                    </div>
                  )
                )
              })
            }
            </div>
            <div className="flex items-center gap-2">
              <Input className="flex-1 border-gray-300 shadow-sm rounded-md" placeholder="Type your message..." 
                onChange = {(e) => {
                  setCurrMessage(e.target.value)
                }}
              value = {currMessage} />
              {
                !inProcess ? ( 
                <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
                  onClick={async () => {
                    const currMsg = currMessage
                    setMessages([...messages, {
                      sender: 1,
                      message: currMsg
                    }])
                    console.log(messages)
                    setCurrMessage("")
                    setInProcess(true)
                    axios.post("http://localhost:3000/predictDisease", {
                      text: currMsg
                    }).then(async res => {
                      setInProcess(false)
                      setMessages([...messages, {
                          sender: 1,
                          message: currMsg
                        },{
                          sender: 0,
                          message: res.data[0]
                        }
                      ])
                      // const inputString = res.data[0]
                      
                      // const conditionsArray = inputString.split(' ');

                      // let conditions = [];
                      // for (let i = 0; i < conditionsArray.length; ) {
                      //   let j = i;
                      //   let condition = "";
                      //   while(j < conditionsArray.length && conditionsArray[j][conditionsArray[j].length - 1] !== ':'){
                      //     condition += conditionsArray[j++] + ' ';
                      //   }
                      //   condition += conditionsArray[j++].slice(0, -1);
                      //   const probability = parseFloat(conditionsArray[j]);
                      //   conditions.push({ condition, probability });
                      //   i = j++;
                      // }

                      // conditions.sort((a, b) => b.probability - a.probability);

                      // console.log(conditions);
                      console.log(messages, location)
                      console.log(res)

                    }).catch(err => {
                      setInProcess(false)
                      alert("some error in server, pls try again later")
                      console.log("some error", err)
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
      <div className="flex justify-end">
        <button onClick={() => setOpen(prev => !prev)} className='w-24 h-24 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-600 focus:outline-none'>
          <span>Chat</span>
        </button>
      </div>
    </div>
  );
}
