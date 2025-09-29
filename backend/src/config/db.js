import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("Mongodb Connected Successfully");
    }catch(error){
        console.log("Mongodb Connection Failed",error);
        process.exit(1);
    }
}
 