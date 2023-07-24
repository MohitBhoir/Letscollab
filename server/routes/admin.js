const {getDetails,createDetails,updateDetails,deleteDetails}=require("../controllers/admin")
const express=require('express')

const router=express.Router()

const authMiddleware=require("../middleware/auth")

router.route("/").get(getDetails).post(authMiddleware,createDetails)
router.route("/:id").put(authMiddleware,updateDetails).delete(authMiddleware,deleteDetails)


module.exports=router;