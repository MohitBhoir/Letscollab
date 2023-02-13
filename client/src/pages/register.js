import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import Loading from '../components/loading'

const Register = () => {
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:'',
    password2:'',
  })
  const [isLoading,setIsLoading]=useState(false)
  const navigate=useNavigate()

  const {name,email,password,password2}=formData

  
  const handleChange=(e)=>{
     setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value,
     }))
  }

  const handleSubmit=async(e)=>{
       e.preventDefault()
       if(password!==password2){
            toast.error('password does not match')
       }else{
          setIsLoading(true)
          const res = await fetch("/api/users/", {
              method: "POST",
              headers: {
                  "Authorization":"",
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({name:name,email:email,password:password})
          })
          const data = await res.json()
          if(res.ok){
             toast.success("register successfully")
             setIsLoading(false)
             navigate("/")
          }else{
             setIsLoading(false)
             if(data.msg==="user already exist"){
                toast.error("user already exist!")
             }else{
                toast.error("sorry,some unexpected error occured!")
             }
             navigate("/")
          }
        }
  }


  

  return <>
   <div className='flex gap-5 justify-center items-center'>
     <p>don't have an account?</p>
     <h1 className='font-extrabold text-3xl'>Register</h1>
   </div>
     {isLoading?<Loading/>:<form className='shadow-2xl rounded-md  m-8 p-4' onSubmit={handleSubmit}>
        <div  className='flex gap-6 justify-evenly'>
          <input type="text" id="name" name="name" value={name} placeholder="Enter your name" 
          className='p-4 border-black border-2 rounded-md'  onChange={handleChange}/>
        </div>
        <div className='flex gap-6 justify-evenly'>
          <input type="email" id="email" name="email" value={email} placeholder="Enter your email" className='p-4 border-black border-2 rounded-md' onChange={handleChange}/>
        </div>
        <div className='flex gap-6 justify-evenly'>
          <input type="password" id="password" name="password" value={password} placeholder="Enter password" className='p-4 border-black border-2 rounded-md' onChange={handleChange}/>
        </div>
        <div className='flex gap-6 justify-evenly'>
          <input type="password" id="password2" name="password2" value={password2} placeholder="confirm password" className='p-4 border-black border-2 rounded-md' onChange={handleChange}/>
        </div>
        <div className='flex justify-center items-center'>
          <button type="submit" className='p-2 text-white bg-black
           hover:text-black hover:bg-slate-400
          duration-100 rounded-md hover:p-3'>Submit</button>
        </div>
     </form>}
  </>
}

export default Register