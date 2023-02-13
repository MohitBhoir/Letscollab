const asyncHandler=require('express-async-handler')
const Task=require("../models/random")
const User=require("../models/user")

const readTask=asyncHandler(async(req,res)=>{
    const task= await Task.find({user:req.user.id})
    if(!task){
        res.status(400)
        throw new Error("no task to fetch")
    }
    res.status(200).json({data:task})
})

const createTask=asyncHandler(async(req,res)=>{
    const task=await Task.create({
        title:req.body.title,
        description:req.body.description,
        user:req.user.id
    })
    res.status(200).json({task:task})
})

const updateTask=asyncHandler(async(req,res)=>{
    const task=await Task.findById(req.params.id)
    if(!task){
        res.status(400)
        throw new Error("task not found")
    }

    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }
    // match the logged in user
    if(task.user.toString()!==req.user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    const updatedTask=await Task.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    })
    res.status(200).json({data:updatedTask})
})

const deleteTask=asyncHandler(async(req,res)=>{
    const task=await Task.findById(req.params.id)
    if(!task){
        res.status(400)
        throw new Error("task not found")
    }

    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }
    // match the logged in user
    if(task.user.toString()!==req.user.id){
        res.status(401)
        throw new Error('user not authorized')
    }
    

    await task.remove()
    res.status(200).json({data:task})
})

module.exports={readTask,createTask,updateTask,deleteTask}