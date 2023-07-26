const asyncHandler=require('express-async-handler')
const Event=require("../models/events")

const getEvents=asyncHandler(async(req,res)=>{
    const events= await Event.find({})
    res.status(200).json({data:events})
})

const createEvents=asyncHandler(async(req,res)=>{
    const events=await Event.create({
        title:req.body.title,
        description:req.body.description,
        link:req.body.link,
        name:req.body.name,
        date:req.body.date,
        user:req.user.id
    })
    res.status(200).json({data:events})
})

const deleteEvents=asyncHandler(async(req,res)=>{
    const events=await Event.findById(req.params.id)
    if(!events){
        res.status(400)
        throw new Error("details not found")
    }

    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }
    // match the logged in user
    if(events.user.toString()!==req.user.id){
        res.status(401)
        throw new Error('user not authorized')
    }
    

    const deletedEvents=await Event.findByIdAndDelete(req.params.id)

    res.status(200).json({data:deletedEvents})
})

module.exports={getEvents,createEvents,deleteEvents}