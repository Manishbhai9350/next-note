import { NextRequest, NextResponse } from "next/server";
import { verify } from "../../_utils/jwt";
import { connect } from "../../_utils/connect.db";
import { NoteModel } from "../../_models/note.model";


connect()


export async function POST(req:NextRequest){
    try {
        const token =  req.cookies.get('token')?.value
        if (!token) {
            return NextResponse.json({
                message:"Something Is Wrong",
                status:400,
                ok:false
            })
        }
        const decoded:any = verify(token)
        const {id} = decoded
        if (!id) {
            return NextResponse.json({
                message:"Something Is Wrong",
                status:400,
                ok:false
            })
        }
        
        const Notes = await NoteModel.find({user:id}).populate('user')
        if (Notes.length <= 0 ) {
            return NextResponse.json({
                message:"Create Notes",
                status:400,
                ok:false
            })
        }
        
        return NextResponse.json({
            message:"Showing All Notes",
            status:200,
            ok:true,
            notes:Notes || [],
            userDetails:{
                username:decoded.username,
                email:decoded.email
            }
        })
    } catch (error) {
        console.log('Error while showing posts')
        console.log(error)
    }
}