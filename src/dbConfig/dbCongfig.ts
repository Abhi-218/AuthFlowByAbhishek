import mongoose from "mongoose";

export async function dbConnect() {
    try{
        await mongoose.connect(process.env.MONGO_URI!)

         const connection = mongoose.connection

         connection.on('connected',()=>{console.log("mongo db connected")})
         connection.on('error',(err)=>{console.log("mongo db connection error " + err);
          process.exit()
        })
     
    }
    catch(error){
         console.log('Somthing went wrong in connecting to db' + error)
    }
}