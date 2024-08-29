import React from 'react'
import { Link } from 'react-router-dom'
import Chatbot from './Chatbot'
import Hero from './Hero'
import { Reviews } from './Review'

export default function DashBoard() {
  return (
    <div className='h-screen w-screen'>
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
