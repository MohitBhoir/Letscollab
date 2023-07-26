import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'
import h from './h.json'

const Home = () => {
  const userUser=JSON.parse(localStorage.getItem('userUser'))
  const userAdmin=JSON.parse(localStorage.getItem('userAdmin'))
  const [details,setDetails]=useState(null)
  const navigate=useNavigate()
  const getDetails=(title)=>{
         localStorage.setItem('ins',JSON.stringify(title))
        navigate('/details')
  }
  const goEdit=(category,createdAt,description,image,title,_id)=>{
      localStorage.setItem('e',JSON.stringify({category:category,description:description,image:image,title:title,id:_id}));
      navigate('/adDash')
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
  useEffect(()=>{
      if(userUser || userAdmin) fetchDetails()
  },[])
  return <>{details!=null && details.data.length!=0 ?<div className='grid grid-cols-3 gap-4 p-4'>
        {
           details.data.map((e)=>{
                const {category,createdAt,description,image,title,_id}=e
                return <div 
                className="max-w-sm bg-white border  rounded-lg dark:bg-gray-800 shadow-2xl" key={_id}>
     <a href="#">
        <img className="rounded-t-lg border-none h-[300px] w-full" src={image} alt="" />
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-900 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={()=>getDetails(title)}>
            Know more
             <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>
        {userAdmin? <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-900 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-5"
        onClick={()=>goEdit(category,createdAt,description,image,title,_id)}>
            Add / edit
             <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>:<></>}
    </div>
</div>

           })
        }
    </div>:<div className='flex'>
         <Lottie animationData={h} className='h-[650px] w-[650px]'/>
         
<section class="bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
    <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">We Make Collabartion Easy For You</h1>
        <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Create,Edit
        And Display Your Profile For Better Reach. Remember, Everyone has a chance to shine bright !! </p>
        <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a href="/login" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Get started
                <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
            <a href="/" class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                Learn more
            </a>  
        </div>
    </div>
</section>

      </div>}</>
}

export default Home