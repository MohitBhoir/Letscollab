const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter your name']
    },
    email:{
        type:String,
        required:[true,'please enter email']
    },
    password:{
        type:String,
        required:[true,'please enter the password']
    },
    userType:{
        type:String,
        required:[true,'please enter the type of user']
    }
})

module.exports=mongoose.model("User",userSchema)