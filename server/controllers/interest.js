const asyncHandler=require('express-async-handler')
const Interest=require("../models/interest")

const getInterests=asyncHandler(async(req,res)=>{
    const interests= await Interest.find({})
    res.status(200).json({data:interests})
})

const createInterests=asyncHandler(async(req,res)=>{
    const interests=await Interest.create({
        event:req.body.event,
        name:req.body.name,
        link1:req.body.link1,
        link2:req.body.link2,
        user:req.user.id
    })
    res.status(200).json({data:interests})
})

module.exports={getInterests,createInterests}