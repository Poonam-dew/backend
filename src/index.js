//require("dotenv").config({path:'./env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js";
dotenv.config ({
  path:'./env'
})
connectDB()
.then(()=> {
  app.on("error",(error) => {
    console.log("error on app",error)
    throw error
  })
  app.listen(process.env.PORT || 8000 , () => {
    console.log(` Server is running at port: ${process.env.PORT}`);
    
  })
})
.catch((err) =>{
  console.log("MONGODB Connection Error !!!:",err)
})





/*
import express from "express"
const app=express();

( async () => {
    try{
      await mongoose.connect(`${process.env.MONGOD_URL}/${DB_name}`)
 //process is the global obj used from anywhere
      app.on("error",(error) => {
        console.log("error",error)
        throw error
      })
      app.listen(process.env.PORT,() => {
        console.log(`App is listening on port ${process.env.PORT}`)
      })
    }
    catch(error){
        console.log("Error",error)
        throw error
    }
})()*/