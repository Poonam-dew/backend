//require("dotenv").config({path:'./env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js";
dotenv.config ({
  path:'./env'
})
connectDB()






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