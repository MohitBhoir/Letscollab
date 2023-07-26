import React from 'react'
import { useNavigate } from 'react-router-dom'
import admin from './admin.json'
import Lottie from 'lottie-react'
import student from './student.json'

const Register = () => {
  const navigate=useNavigate()
  return <>
       <>
       <h1 className='text-center font-bold text-blue-900 text-3xl font-sans mt-3'>who are you?</h1>
         <div className='flex justify-around'>
            <div>
            <Lottie animationData={admin} className='w-[500px] h-[500px]'/>
            <button onClick={()=>{navigate("/registerAdmin")}} className='text-3xl text-emerald-600 font-bold ml-[20%] hover:text-white hover:bg-emerald-600 p-2 rounded-sm'>admin</button>
        </div>
        <div>
            <Lottie animationData={student} className='w-[500px] h-[500px]'/>
            <button onClick={()=>{navigate("/registerUser")}} className='text-3xl text-blue-700
            font-bold ml-[20%] hover:text-white hover:bg-blue-700 p-2 rounded-sm'>
              student</button>
        </div>
         </div>
  </>
  </>
}

export default Register