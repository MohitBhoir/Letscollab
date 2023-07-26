const {getDetails,createDetails,updateDetails,deleteDetails}=require("../controllers/admin")
const express=require('express')

const router=express.Router()

const authMiddleware=require("../middleware/auth")

router.route("/").post(authMiddleware,createDetails).get(getDetails)
router.route("/:id").put(authMiddleware,updateDetails).delete(authMiddleware,deleteDetails)

module.exports=router;