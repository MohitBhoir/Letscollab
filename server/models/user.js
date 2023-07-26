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
    }
})

module.exports=mongoose.model("User",userSchema)