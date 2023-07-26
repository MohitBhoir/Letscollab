const mongoose = require('mongoose');


const interestSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,  // _id present in mongoDB
        required:true,
        ref:'User'  // to identify which model this ObjectId belongs to
    },
    event:{
        type:String
    },
    name:{
        type:String
    },
    link1:{
        type:String
    },
    link2:{
         type:String
    }
})

module.exports=mongoose.model("Interest",interestSchema)