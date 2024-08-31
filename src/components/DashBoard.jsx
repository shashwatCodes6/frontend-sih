import React from 'react'
import Chatbot from './Chatbot'
import Hero from './Hero'
import { Reviews } from './Review'

export default function DashBoard() {
  return (
    <div className='h-full w-screen'>
        <div className='h-full w-full'>
            <Hero/>
            <Reviews/>
        </div>
    </div>
  )
}
