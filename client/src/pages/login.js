import React,{useState} from 'react'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/loading'

const Login = () => {
  const [formData,setFormData]=useState({
    email:'',
    password:'',
  })
  const [isLoading,setIsLoading]=useState(false)
  const navigate=useNavigate()
  const {email,password}=formData

  const handleChange=(e)=>{
    setFormData((prevState)=>({
       ...prevState,
       [e.target.name]:e.target.value,
    }))
  }

  const handleSubmit=async(e)=>{
        e.preventDefault()
        setIsLoading(true)
        const res=await fetch('/api/users/login/',{
           method:"POST",
           headers:{
              "Authorization":"",
              "Content-Type":"application/json"
           },
           body:JSON.stringify({email:email,password:password})
        })
        const data=await res.json()
        if(res.ok){
            toast.success("login successfully")
            setIsLoading(false)
            localStorage.setItem('user',JSON.stringify(data))
            navigate("/")
            window.location.reload()
            setTimeout(()=>{
                 window.stop()
            },50)
       }else{
            setIsLoading(false)
            if(data.msg==="invalid credentials"){
              toast.error("invalid credentials!")
            }else{
              toast.error("sorry,some unexpected error occured!")
            }
            navigate("/")
       }
  }


  return <>
   <div className='flex gap-5 justify-center items-center my-2'>
     <h1 className='font-extrabold text-3xl'>Login</h1>
   </div>
     {isLoading?<Loading/>:<form className='shadow-2xl rounded-md  m-8 p-4' onSubmit={handleSubmit}>
        <div className='flex gap-6 justify-evenly'>
          <input type="email" id="email" name="email" value={email} placeholder="Enter your email" className='p-4 border-black border-2 rounded-md' onChange={handleChange}/>
        </div>
        <div className='flex gap-6 justify-evenly'>
          <input type="password" id="password" name="password" value={password} placeholder="Enter password" className='p-4 border-black border-2 rounded-md' onChange={handleChange}/>
        </div>
        <div className='flex justify-center items-center'>
          <button type="submit" className='p-2 text-white bg-black
           hover:text-black hover:bg-slate-400
          duration-100 rounded-md hover:p-3'>Submit</button>
        </div>
     </form>}
  </>
}

export default Login