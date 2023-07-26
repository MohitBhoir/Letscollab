const {getEvents,createEvents,deleteEvents}=require("../controllers/events")
const express=require('express')

const router=express.Router()

const authMiddleware=require("../middleware/auth")

router.route("/").post(authMiddleware,createEvents).get(getEvents)
router.route("/:id").delete(authMiddleware,deleteEvents)


module.exports=router;