import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Cookies from 'js-cookie'
export default function Navbar() {
  const handleMenu = () => {
    const navdialog = document.getElementById('navdialog');
    navdialog.classList.toggle('hidden');
  }
  return (<>
    <div className='dark h-24 w-screen flex flex-col overflow-y-scroll'>
      <div className='flex justify-between h-16 items-center  my-2'>
        <Link to="/">
          <img className='h-24 w-24' src="/si.png" width="70" alt='logo' />
        </Link>
        <div className='hidden md:flex justify-evenly w-1/2'>
          <Link to='/progress/ab' className='hover:text-blue-500 font-bold font-serif text-xl' >Progress</Link>
          <Link to='/Realtime' className='hover:text-blue-500 font-bold font-serif text-xl' >Realtime</Link>
          {/* <Link to='' className='hover:text-blue-500'><button>Connect Devices</button></Link> */}
        </div>
        <div className=' hidden md:flex text-xl hover:bg-slate-200 p-2 rounded-xl m-5'>
          {
            Cookies.get('accessToken') ?
              <Link to="/logout">Logout</Link> :
              <Link to="/login"> Login/Signup </Link>
          }
        </div>
      <button className="p-2 md:hidden " onClick={handleMenu}>
        <img src="https://img.icons8.com/?size=100&id=8113&format=png&color=000000" className='h-8 w-8'></img>
      </button>
      <div id="navdialog" className="hidden z-10  fixed inset-0 w-2/3 bg-black text-white p-3 md:hidden">
        <div className='flex justify-between'>
          <Link to='/' className="flex flex-col items-center gap-2">
            <img className='h-24 w-24' src="/si.png" width="70" alt='logo' />
            <span className="text-2xl md:text-3xl lg:text-4xl  md:font-medium font-display">Zk Health</span>
          </Link>
          <button className="p-0 " onClick={handleMenu}>
           <img src="https://img.icons8.com/?size=100&id=37795&format=png&color=000000" className='bg-white rounded-xl h-8 w-8' />
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-4">
        <Link to='/progress/ab' className='hover:text-blue-500 font-bold font-serif text-xl' >Progress</Link>
        <Link to='/Realtime' className='hover:text-blue-500 font-bold font-serif text-xl' >Realtime</Link>
        <span >
          {
            Cookies.get('accessToken') ?
              <Link to="/logout"><button>Logout</button></Link> :
              <Link to="/login"> Login/Signup </Link>
          }
          </span>
        </div>
      </div>
      </div>
    </div>
    <Outlet />
    <Footer />
  </>
  )
}


