import React,{useState} from 'react'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Modal = () => {
  const userAdmin=JSON.parse(localStorage.getItem('userAdmin'))
  const [showModal,setShowModal]=useState(false)
  const [formData,setFormData]=useState({
    title:'',
    description:'',
    link:'',
    name:'',
    date:new Date(),
  })

  const navigate=useNavigate()
  const {title,description,link,name,date}=formData

  const handleChange=(e)=>{
    setFormData((prevState)=>({
       ...prevState,
       [e.target.name]:e.target.value,
    }))
  }
  const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const res=await fetch('/api/events',{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${userAdmin.token}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({title:title,description:description,link:link,name:name,date:date})
          })
          const data=await res.json()
          if(res.ok){
              toast.success("event added successfully")
              localStorage.removeItem('e')
              navigate("/")
          }
       }catch(error){
            toast.error("sorry,some unexpected error occured!")
            console.log(error)
            navigate("/adDash")
       }
  }


  return <>
     <button
        className="bg-gray-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add upcoming events
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Event Details
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className='shadow-2xl rounded-md  m-8 p-4' onSubmit={handleSubmit}>
                    <div className='flex gap-6 justify-evenly'>
                    <input type="title" id="title" name="title" value={title} placeholder="Enter title" className='p-4 border-black border-2 rounded-md' onChange={handleChange}/>
                    </div>
                    <div className='flex gap-6 justify-evenly'>
                    <input type="text" id="name" name="name" value={name} placeholder="Enter institute name" className='p-4 border-black border-2 rounded-md' onChange={handleChange}/>
                    </div>
                    <div className='flex gap-6 justify-evenly'>
                    <input type="description" id="description" name="description" value={description} placeholder="Enter description" className='p-4 border-black border-2 rounded-md' onChange={handleChange}/>
                    </div>
                     <div className='flex gap-6 justify-evenly'>
                    <input type="text" id="link" name="link" value={link} placeholder="Link if any" className='p-4 border-black border-2 rounded-md' onChange={handleChange}/>
                    </div>
                    <div className='flex gap-6 justify-evenly'>
                    <input type="date" id="date" name="date" value={date} placeholder="Date: dd/mm/yyyy" className='p-4 border-black border-2 rounded-md' onChange={handleChange}/>
                    </div>
                    <div className='flex justify-center items-center'>
                    <button type="submit" className='p-2 text-white bg-emerald-600 
                    hover:text-black hover:bg-slate-400
                    duration-100 rounded-md hover:p-3'>Submit</button>
                    </div>
                </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
</>
}

export default Modal