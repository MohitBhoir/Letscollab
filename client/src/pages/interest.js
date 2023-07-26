import React,{useState} from 'react'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/loading'
import Lottie from 'lottie-react'
import cry from './cry.json'

const Interest = () => {
  const {title,date}=JSON.parse(localStorage.getItem('title'))
  const userUser=JSON.parse(localStorage.getItem('userUser'))
  
  const [formData,setFormData]=useState({
    name:'',
    link1:'',
    link2:''
  })
  const [isLoading,setIsLoading]=useState(false)
  const navigate=useNavigate()
  const {name,link1,link2}=formData

  const handleChange=(e)=>{
    setFormData((prevState)=>({
       ...prevState,
       [e.target.name]:e.target.value,
    }))
  }

  const handleSubmit=async(e)=>{
        e.preventDefault()
        setIsLoading(true)
        try{
            const res=await fetch('/api/interest',{
           method:"POST",
           headers:{
              "Authorization":`Bearer ${userUser.token}`,
              "Content-Type":"application/json"
           },
           body:JSON.stringify({event:title,name:name,link1:link1,link2:link2})
        })
        const data=await res.json()
        if(res.ok){
            toast.success("your interest has been sent")
            setIsLoading(false)
            localStorage.removeItem('title')
            navigate("/")
            window.location.reload()
            setTimeout(()=>{
                 window.stop()
            },50)
        }else{console.log(res)}
        }catch(error){
            setIsLoading(false)
              toast.error("sorry,some unexpected error occured!")
              console.log(error)
              navigate("/")
       }
  }
  return <>
     {date && new Date().getTime()>new Date(date).getTime()?<><h1 
     className='text-center text-3xl font-bold text-blue-800 my-6'>Sorry,Event is already finished !!</h1>
     <Lottie animationData={cry} className='h-[500px] w-full'/>
     </>:<>
   <div className='flex gap-5 justify-center items-center my-2'>
     <h1 className='font-extrabold text-3xl text-blue-700 '>Add details</h1>
   </div>
   {isLoading?<Loading/>:<form className='shadow-2xl rounded-md  m-8 p-4' onSubmit={handleSubmit}>
         <h1 className='font-bold text-2xl'>Event: {title}</h1>
        <div className='flex gap-6 justify-evenly'>
          <input type="text" id="name" name="name" value={name} placeholder="Enter your name" className='p-4 border-black border-2 rounded-md' onChange={handleChange}/>
        </div>
        <div className='flex gap-6 justify-evenly'>
          <input type="text" id="link1" name="link1" value={link1} placeholder="Enter link 1" className='p-4 border-black border-2 rounded-md' onChange={handleChange}/>
        </div>
        <div className='flex gap-6 justify-evenly'>
          <input type="text" id="link2" name="link2" value={link2} placeholder="Enter link 2" className='p-4 border-black border-2 rounded-md' onChange={handleChange}/>
        </div>
        <div className='flex justify-center items-center'>
          <button type="submit" className='p-2 text-white bg-blue-700 
           hover:text-black hover:bg-slate-400
          duration-100 rounded-md hover:p-3'>Submit</button>
        </div>
     </form>}
  </>}
  </>
}

export default Interest