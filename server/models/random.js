const mongoose = require('mongoose');


const taskSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,  // _id present in mongoDB
        required:true,
        ref:'User'  // to identify which model this ObjectId belongs to
    },
    title:{
        type:String,
        required:[true,'please add title']
    },
    description:{
        type:String
    }
},{
    timestamps:true,
})

module.exports=mongoose.model("Task",taskSchema)