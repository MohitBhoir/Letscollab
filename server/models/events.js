const mongoose = require('mongoose');


const eventSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,  // _id present in mongoDB
        required:true,
        ref:'User'  // to identify which model this ObjectId belongs to
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    link:{
        type:String
    },
    name:{
        type:String
    },
    date:{
         type:Date
    }
})

module.exports=mongoose.model("Events",eventSchema)