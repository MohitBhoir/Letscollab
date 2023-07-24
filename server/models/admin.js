const mongoose = require('mongoose');


const adminSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,  // _id present in mongoDB
        required:true,
        ref:'User'  // to identify which model this ObjectId belongs to
    },
    category:{
        type:String
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    image:{
         type:String
    }
},{
    timestamps:true,
})

module.exports=mongoose.model("Admin",adminSchema)