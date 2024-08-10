import mongoose from "mongoose";
import { DB_name } from "../constants.js";

//DB is in  another continent
const connectDB = async () => {
    try {
      const connectionInstance=  await mongoose.connect(`${process.env.MONGODB_URL}/${DB_name}`)
     console.log(`\n Mongodb connected DB host:${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(" MONGODB Connection  Error: ",error);
        process.exit(1)
    }

}

export default connectDB;