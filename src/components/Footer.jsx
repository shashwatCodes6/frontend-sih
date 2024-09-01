import React from 'react'
import { Button } from './ui/button'

export default function Footer() {
  const teamMembers = [
    {
      name: "Samyak Jain",
      rollno: "2021UCM2329",
      link: "https://github.com/samyak1512"
    },{
      name: "Rahul Nain",
      rollno: "2021UIT3054",
      link: "https://github.com/Rahul-nain172"
    },{
      name: "Shashwat Saxena",
      rollno: "2021UIT3036",
      link:"https://github.com/shashwatCodes6"
    },{
      name: "Deeptesh Chattopadhya",
      rollno: "2021UIT3044",
      link: "https://github.com/deeptesh123"
    },{
      name: "Aditya Agrawal",
      rollno: "2021UCM2311",
      link: "https://github.com/devLucario"
    },{
      name: "Khushi",
      rollno: "2021UIN3345",
      link: "https://github.com/KDkhushi"
    },
  ]
  return (
    <div className='flex justify-evenly bottom-0 w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold p-10'>
      <div className='text-md'>
        Developed by: {
          teamMembers.map((key, val) => {
            return <div className='mx-10'>
              <div onClick={() => window.location.href = key.link} className='hover:underline hover:text-blue-400'>
                {key.name} ({key.rollno})
              </div>
            </div>
          })
        }
      </div>  
      <div>
        <button 
          onClick={() => window.location.href="https://github.com/SIH-hackathon-nsut"}
          className='bg-white rounded-2xl'
        > 
          <img src="https://img.icons8.com/?size=100&id=62856&format=png&color=000000" />
        </button>
      </div>
    </div>
  )
}
