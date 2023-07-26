import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import create from './create.json'
import Lottie from 'lottie-react'
import Modal from "./Modal";


const AdDash = () => {
  const e=JSON.parse(localStorage.getItem('e'))
  const navigate = useNavigate();
  const [showModal,setShowModal]=useState(false)
  const [formData, setFormData] = useState({
    category:"",
    image:"",
    title: "",
    description: "",
  });

  const { category,image,title, description } = formData;
  const userAdmin = JSON.parse(localStorage.getItem("userAdmin"));
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = (E) => {
    E.preventDefault();
    if(e){
      updateUser()
    }else{
      createUser()
    }
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64)
    setFormData((prevState)=>({
           ...prevState,
           image:base64
    }))
  }

  function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}
  const createUser = async () => {
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userAdmin.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category:category,title: title, description: description,image:image }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("profile added successfully");
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      toast.error("oops!some error occured");
    }
  };

  const updateUser = async () => {
    try {
      const res = await fetch(`/api/admin/${e.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userAdmin.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category:category,title: title, description: description,image:image }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("profile edited successfully");
        localStorage.removeItem('e')
        navigate('/')
      }else{
         toast.error("user not authorized")
         navigate("/")
      }
    } catch (error) {
      toast.error("oops!some error occured");
    }
  };
  useEffect(() => {
    if (!userAdmin) {
      navigate("/login");
    }
  }, [userAdmin, navigate]);

  useEffect(()=>{
      if(e){
        setFormData({category:e.category,image:e.image,title:e.title,description:e.description})
        setIsEdit(true)
      }
  },[])
  return (
    <>
      <div className="flex-col cont gap-5 justify-center items-center my-2">
        <h1 className="font-extrabold text-3xl">
          {userAdmin ? `Hey,${userAdmin.name} you can start creating` : ``}
        </h1>
          <div className="flex p-0 gap-5 justify-between items-center">
            <form
              className="shadow-2xl rounded-md  m-8 p-4 w-[600px]"
              onSubmit={handleSubmit}
            >
            
<div className="flex items-center justify-center w-full">
    <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        {e && e.image?<img src={e.image} alt="" className="w-[100%] h-[100%]"
        />:<div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">
              Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG </p>
        </div>}
        <input id="dropzone-file" type="file" className="hidden"
                name="image"
                accept='.jpeg, .png, .jpg'
                onChange={handleFileUpload} />
    </label>
</div> 

              <div className="flex gap-6 justify-evenly">
                <h1 className="font-bold ">school / college / university</h1>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={category}
                  placeholder="category"
                  className="p-4 border-black border-2 rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-6 justify-evenly">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  placeholder="Enter your institute name"
                  className="p-4 border-black border-2 rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-6 justify-between">
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={description}
                  placeholder="Enter descripiton if any"
                  className="p-4 border-black border-2 
           rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="p-2 text-white bg-black
            hover:text-black hover:bg-slate-400
           duration-100 rounded-md hover:p-3"
                >
                  {e?'edit':'add'}
                </button>
              </div>
            </form>
            
            <div>
                <div>
                  {isEdit?<Modal name={e.name}/>:<></>}
                </div>
                <Lottie animationData={create} className='w-[500px] h-[500px]'/>
            </div>
          </div>
      </div>
    </>
  );
};

export default AdDash;