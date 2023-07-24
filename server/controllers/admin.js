const asyncHandler=require('express-async-handler')
const Admin=require("../models/admin")

const getDetails=asyncHandler(async(req,res)=>{
    const details= await Admin.find({user:req.user.id})
    if(!details){
        res.status(400)
        throw new Error("you haven't created anything")
    }
    res.status(200).json({data:details})
})

const createDetails=asyncHandler(async(req,res)=>{
    const details=await Admin.create({
        category:req.body.category,
        title:req.body.title,
        description:req.body.description,
        image:req.body.image,
        user:req.user.id
    })
    res.status(200).json({data:details})
})

const updateDetails=asyncHandler(async(req,res)=>{
    const details=await Admin.findById(req.params.id)
    if(!details){
        res.status(400)
        throw new Error("no match found")
    }

    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }
    // match the logged in user
    if(details.user.toString()!==req.user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    const updatedDetails=await Admin.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    })
    res.status(200).json({data:updatedDetails})
})

const deleteDetails=asyncHandler(async(req,res)=>{
    const details=await Admin.findById(req.params.id)
    if(!details){
        res.status(400)
        throw new Error("details not found")
    }

    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }
    // match the logged in user
    if(details.user.toString()!==req.user.id){
        res.status(401)
        throw new Error('user not authorized')
    }
    

    const deletedDetails=await Admin.findByIdAndDelete(req.params.id)

    res.status(200).json({data:deletedDetails})
})

module.exports={getDetails,createDetails,updateDetails,deleteDetails}