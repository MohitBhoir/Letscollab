import React, { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const List = () => {
  const userAdmin=JSON.parse(localStorage.getItem('userAdmin'))
  const eveName=JSON.parse(localStorage.getItem('eveName'))
  const [interList,setInterList]=useState(null)
  const navigate=useNavigate()

  const fetchList = async (eveName) => {
    try {
      const res = await fetch('/api/interest', {
        method: "GET",
        headers: {
          Authorization:"",
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if(res.ok){
          setInterList(data)
          // localStorage.removeItem('eveName')
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick=()=>{
      navigate("/")
  }
  useEffect(()=>{
      if(userAdmin){
          fetchList()
      }
  },[])
  return <>
       <div>{
       interList && interList.data.length!=0?<div>
                  <h1 className='text-3xl font-semibold m-5'>
                    List of students interested in {eveName}</h1>
                    {
                       interList.data.map((e)=>{
                              const {event,name,link1,link2}=e
                              return <article id={name} className='flex justify-between w-[500px] p-4'>
                                    {eveName==event?<><h1 className='text-2xl'>Name : {name}</h1>
                                    <div>
                                          <a href={link1}>link1</a>
                                          <br />
                                          <a href={link2}>link2</a>
                                    </div></>:<></>}
                              </article>
                       })
                    }
                    <hr />
             </div>:<div>No interested students</div>
        }<button onClick={handleClick} className='text-white bg-red-700 p-2 rounded-sm m-4'>
          back</button></div>
  </>
}

export default List