import mongoose from "mongoose";

export  async function connect() {
    try {
         await mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log('db connected successfully')
        })
        connection.on('error',()=>{
            console.log('Error in mongodb connection')
            process.exit()
        })
        return connection
    } catch (error) {
        console.log('Something went wrong in connecting to DB')
    }
}