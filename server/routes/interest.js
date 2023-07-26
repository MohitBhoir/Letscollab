const {getInterests,createInterests}=require("../controllers/interest")
const express=require('express')

const router=express.Router()

const authMiddleWare=require('../middleware/auth')

router.route("/").get(getInterests).post(authMiddleWare,createInterests)


module.exports=router;