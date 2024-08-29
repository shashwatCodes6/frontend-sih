import React from 'react'
import { Link } from 'react-router-dom'
import Chatbot from './Chatbot'
import Hero from './Hero'
import { Reviews } from './Review'

export default function DashBoard() {
  return (
    <div className='h-screen w-screen'>
        {/* //Navbar */}
        <div className='flex justify-between h-16 items-center mx-8'>
            <img src="/si.png" width="60" alt='logo'></img>
            <div className='flex justify-evenly w-56'>
                <Link to='/progress/ab'>Progress</Link>
                <Link><button>Connect Devices</button></Link>
            </div>
            <div className='text-xl hover:bg-slate-200 p-2 rounded-xl'>
              <Link to="/login">Login/Signup</Link>
            </div>
        </div>
        <div className='h-full w-full'>
            <Hero/>
            <Reviews/>
        </div>
        <div className='z-50'>
          <Chatbot/>
        </div>
    </div>
  )
}
