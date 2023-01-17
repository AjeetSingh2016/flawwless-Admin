import React from 'react'
import { Navbar } from '../components'

const NotAuthorized = () => {
  return (
    <div className="h-screen">
    <Navbar />
    <div className=" section flex flex-col pt-40 items-center bg-slate-100 ">
    <img src="https://img.icons8.com/color/96/null/restriction-shield.png" alt='img'/>

      <h1 className="font-bold text-2xl text-red-600">You are Not Authorized</h1>
    </div>
  </div>
  )
}

export default NotAuthorized