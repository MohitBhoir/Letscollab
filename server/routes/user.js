const express=require('express')
const router=express.Router()
const {registerUser,loginUser,getInfo}=require("../controllers/user")
const authMiddleware=require('../middleware/auth')

router.route("/").post(registerUser)
router.route("/login").post(loginUser)
router.route("/getMe").get(authMiddleware,getInfo)


module.exports=router