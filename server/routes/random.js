const {readTask,createTask,updateTask,deleteTask}=require("../controllers/random")
const express=require('express')

const router=express.Router()

const authMiddleware=require("../middleware/auth")

router.route("/").get(authMiddleware,readTask).post(authMiddleware,createTask)
router.route("/:id").put(authMiddleware,updateTask).delete(authMiddleware,deleteTask)


module.exports=router;