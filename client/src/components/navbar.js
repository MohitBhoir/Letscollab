import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {FaSignInAlt,FaSignOutAlt,FaUser,FaHome} from 'react-icons/fa'

const Navbar = () => {
  const user=JSON.parse(localStorage.getItem('user'))
  const [data,setData]=useState(user)
  const logout=()=>{
     localStorage.removeItem('user')
     window.location.reload()
        setTimeout(()=>{
            window.stop()
        },40)
  }
  return <>
  <nav className='flex bg-slate-400 bg-opacity-10  justify-between items-center p-3 shadow-xl '>
    <div>
        <h1 className='font-extrabold text-black text-3xl font-sans'>TODO</h1>
    </div>
    <ul className='flex justify-evenly gap-5'>
    <Link to="/"><li className='text-black   text-xl  cursor-pointer'><FaHome 
    className='hover:text-white hover:bg-black p-2 
    rounded-md duration-200' size={40} />Home</li></Link>
    {
      data?

      <Link to="/login"><li className='text-black   text-xl  cursor-pointer'><FaSignOutAlt
      className='hover:text-white hover:bg-black p-2 
      rounded-md duration-200' size={40} onClick={logout} />Logout</li></Link>

      :
      
      <>
          <Link to="/login"><li className='text-black   text-xl  cursor-pointer'><FaSignInAlt 
          className='hover:text-white hover:bg-black p-2 
          rounded-md duration-200' size={40} />Login</li></Link>
          <Link to="/register"><li className='text-black 
          transition-all text-xl  cursor-pointer'><FaUser size={40} 
          className='hover:text-white hover:bg-black p-2 
          rounded-md duration-200'/>Register</li></Link>
      </>
    }
    </ul>
  </nav>
</>
}

export default Navbar