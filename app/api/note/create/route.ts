import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "../../_models/user.model";
import { NoteModel } from "../../_models/note.model";
import { verify } from "../../_utils/jwt";


interface tokenOptions {
    id:string;
    email:string;
    username:string;
}

interface noteDetails {
    title:string;
    description:string;
}

interface UserDetails {
    email:string;
    password:string;
    _id:string;
    notes:Array<noteDetails>;
}

export async function POST(req:NextRequest){
    try {
        const {title,description}:noteDetails = await req.json()
        
        if (!title || !description) {
            return NextResponse.json({
                message:"All fields Must be provided",
                status:400,
                ok:false
            })
        }

        const token = req.cookies.get('token')?.value
        const {id} = verify(token)
        if (!id) {
           return NextResponse.json({
            message:'Invalid User',
            status:400,
            ok:false
           })
        }

        const User:UserDetails = await UserModel.findById(id)
        if (!User) {
            return NextResponse.json({
                message:'Invalid User',
                status:400,
                ok:false
            })
        }
        const Note = await NoteModel.create({title,description,user:User._id}) 

        User.notes.push(Note._id)

        await User.save()


        return NextResponse.json({
            message:'Note Created',
            status:201,
            ok:true
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message:'Something Went Wrong',
            status:400,
            ok:false
           })
    }
}