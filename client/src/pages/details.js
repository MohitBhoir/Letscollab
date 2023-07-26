import React, { useState , useEffect } from 'react'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const Details = () => {
  const n=JSON.parse(localStorage.getItem('n'))
  const userAdmin=JSON.parse(localStorage.getItem('userAdmin'))
  const userUser=JSON.parse(localStorage.getItem('userUser'))

  const ins=JSON.parse(localStorage.getItem('ins'))

  const [details,setDetails]=useState(null)
  const [events,setEvents]=useState(null)
  const [open,setOpen]=useState(false)
  const navigate=useNavigate()
  const handleDelete=(id)=>{
       removeEvents(id)
  }
  const handleList=(title)=>{
       localStorage.setItem('eveName',JSON.stringify(title))
       navigate('/list')
  }
  const handleInterest=(title,date)=>{
        localStorage.setItem('title',JSON.stringify({title,date}))
        navigate("/interest")
  }
  const handleClick=(name)=>{
         fetchEvents(name)
         localStorage.setItem('n',JSON.stringify(name))
         setOpen(!open)
  }
  const fetchDetails = async () => {
    try {
      const res = await fetch("/api/admin", {
        method: "GET",
        headers: {
          Authorization:"",
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if(res.ok){
          setDetails(data)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeEvents= async (id) => {
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization:`Bearer ${userAdmin.token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if(res.ok){
          toast.success("Event deleted successfully")
      }else{
          toast.error("user not authorized")
      }
    } catch (error) {
       toast.error("user not authorized")
    }
  };
  const fetchEvents = async (name) => {
    try {
      const res = await fetch('/api/events', {
        method: "GET",
        headers: {
          Authorization:"",
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if(res.ok){
          setEvents(data)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
       if(userUser || userAdmin){
           fetchDetails()
       }
  },[])
  return <>
    <div>
      {details!=null && details.data.length!=0?<div>
          {
             details.data.map((e)=>{
                    const {image,title,category,description}=e
                    return <article className='flex-col p-3 '>
                          {title===ins?<><h1 className='text-5xl m-2 font-bold'>{title}</h1>
                         <img src={image} alt="" className='rounded-md shadow-2xl shadow-black m-2'/>
                          <h1 className='text-3xl m-2 font-bold'>{category}</h1>
                          <blockquote class="text-xl italic font-semibold text-gray-900 dark:text-white">
              <svg class="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4" aria-hidden="true" 
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                  <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
              </svg>
                <p className='text-black'>{description}</p>
            </blockquote>
                <div>
                     {!open?<button onClick={()=>handleClick(title)}
                      className='font-bold bg-blue-900 text-white rounded-md p-2'
                     >upcoming events</button>:<></>}
                     {events && events.data.length!=0?<div>
                      <h1 className='text-3xl font-bold m-6'>Events</h1>
                      <hr className='font-bold'/>
                         {
                            events.data.map((e)=>{
                                const {name,title,description,date,_id,link}=e
                                  return <div>
                                    {n==name?<div className='shadow-md
                                     shadow-black rounded-md p-4 m-5 bg-[#B0C4DE]'>
                    <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black text-center">{title}</h1>
                    <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-black">{description}</p>
                     <div className='flex'>
                         <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-black"><span className="text-3xl font-bold">
                          At </span>{date.split('T')[0]}</p>
                     </div>
                      <div className='flex gap-4'>
                        <a href={link} class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                        Learn more
                        <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                    </a>
                     {userUser? <button class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
                      onClick={()=>handleInterest(title,date)}>
                          Interested
                          <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                      </button>:<></>}
                    {userAdmin? <div className='flex gap-4'><button class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                      onClick={()=>handleDelete(_id)}>
                          Remove Event
                          <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                      </button>
                      <button class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
                      onClick={()=>handleList(title)}>
                          Interested students
                          <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                      </button></div>:<></>}
                      </div>
</div>:<></>}
                                  </div>
                            })
                         }
                     </div>:<></>}
                 </div></>:<></>}
              </article>
             })
          }
      </div>:<></>}
    </div>

  </>
}

export default Details