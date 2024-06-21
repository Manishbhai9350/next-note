import { NextRequest, NextResponse } from "next/server";
import { verify } from "../../_utils/jwt";
import { UserModel } from "../../_models/user.model";
import { NoteModel } from "../../_models/note.model";


interface editOptions {
    title?:string;
    description?:string;
}

export async function POST(req:NextRequest){
    try {
        const {id:NoteId} = await req.json();
        const token = req.cookies.get('token')?.value;
        if (!token || !NoteId) {
            return NextResponse.json({
                message:'Some Error',
                status:400,
                ok:false
            })
        }
        const decoded = verify(token)
        if (!decoded) {
            return NextResponse.json({
                message:'Some Error',
                status:400,
                ok:false
            })
        }

        const {id:UserID}:any = decoded
        const User = await UserModel.findById(UserID)
        const Note = await NoteModel.findByIdAndDelete(NoteId)
        let NoteIdx = User.notes.indexOf(NoteId)
        User.notes.splice(NoteIdx, 1)
        await User.save()
        return NextResponse.json({
            message:'Note Deleted',
            status:200,
            ok:true
        })
    } catch (error) {
        console.log('Error While Deleting Note',error)
    }
}