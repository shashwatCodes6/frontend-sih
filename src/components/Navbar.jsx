import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <div className='h-screen w-screen'>
    <div className='flex justify-between h-16 items-center  my-2'>
        <img src="/si.png" width="60" alt='logo'></img>
        <div className='flex justify-evenly w-1/2'>
            <Link to='/progress/ab' className='hover:text-blue-500' >Progress</Link>
            <Link to='' className='hover:text-blue-500'><button>Connect Devices</button></Link>
        </div>
        <div className='text-xl hover:bg-slate-200 p-2 rounded-xl'>
        <Link to="/login">Login/Signup</Link>
        </div>
    </div>
    <Outlet/>
    </div>
  )
}
