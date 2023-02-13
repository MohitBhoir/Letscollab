import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Dashboard= () => {
  const navigate=useNavigate()
  const user=JSON.parse(localStorage.getItem('user'))

  useEffect(()=>{
     if(!user){
       navigate("/login")
     }
  },[user,navigate])
  
  return (
    <div>dashboard</div>
  )
}

export default Dashboard