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
import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 p-3">
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
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            </div>
            <div className="flex items-center gap-2">
              <Input className="flex-1 border-gray-300 shadow-sm rounded-md" placeholder="Type your message..." />
              <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none">
                <img width="24" height="24" src="https://img.icons8.com/ios-filled/50/sent.png" alt="Send" />
              </button>
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
