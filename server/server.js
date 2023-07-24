const express=require('express')
const app=express();
const dotenv=require('dotenv').config()
const connectDB=require("./config/DB")
const errorHandler=require("./middleware/error")
const cors=require('cors')

connectDB()


const port=5000

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use("/api/admin",require("./routes/admin"))
app.use("/api/users",require("./routes/user"))

app.use(errorHandler)


app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
})