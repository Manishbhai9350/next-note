import mongoose , { Schema, model } from "mongoose";


const schema = new Schema({
    title:String,
    description:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})


const modal = mongoose.models.Note || model('Note',schema)

export  {modal as NoteModel}