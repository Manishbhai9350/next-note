import mongoose, { Schema, model } from "mongoose";

const schema = new Schema({
    username:String,
    email:String,
    password:String,
    notes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Note'
        },
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const modal = mongoose.models.User || model('User',schema)
export  {modal as UserModel}