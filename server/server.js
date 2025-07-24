require("dotenv").config()
const express=require("express")
const cors=require("cors")
const corsOptions=require("./config/corsOptions")
const conectDB=require("./config/dbConect")
const mongoose  = require("mongoose")
const app=express()
conectDB()
app.use(express.json())
app.use(cors(corsOptions))
const PORT=process.env.PORT ||2345

app.use(express.static("public"))
app.use("/api/products",require("./routs/productRoute"))
app.use("/api/auth",require("./routs/authRoute"))
app.use("/api/cart", require("./routs/shoppinCartRoute"))

mongoose.connection.once("open",()=>{
    console.log(`conected to mongoDB`)
    app.listen(PORT,()=>{
        console.log(`the server runing on PORT:${PORT}`)
    })
})
