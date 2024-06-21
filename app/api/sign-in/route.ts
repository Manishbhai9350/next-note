import { NextRequest, NextResponse } from "next/server";
import { connect } from "../_utils/connect.db";
import { UserModel } from "../_models/user.model";
import { compare } from "../_utils/bcrypt";
import { sign } from "../_utils/jwt";


interface LoginOptions {
    email:string;
    password:string;
}

interface User {
    email:string;
    password:string;
    username:string;
    _id:string;
}
connect()

export const POST = async (req:NextRequest) => {
    try {
        const {email,password}:LoginOptions = await req.json();
        
        if (!email || !password) {
            return  NextResponse.json({
                message:"Invalid Credentials",
                status:400,
                ok:false
            })
        }

        const ExistUser:User = await UserModel.findOne({email})
        if (!ExistUser) {
            return  NextResponse.json({
                message:"Invalid Credentials",
                status:400,
                ok:false
            })
        }

        const isPasswordMatch = compare(password,ExistUser.password)

        if (!isPasswordMatch){
            return  NextResponse.json({
                message:"Invalid Credentials",
                status:400,
                ok:false
            })
        }

        const token = sign({email,username:ExistUser.username,id:ExistUser._id})

        const response = NextResponse.json({
            message:"Login Succesfully",
            status:200,
            ok:true
        })

        response.cookies.set('token',token,{
            httpOnly:true
        })

        return  response
    } catch (error) {
        return  NextResponse.json({
            message:"Something went wrong",
            status:400,
            ok:false
        })
        console.log('error while sign in ')
        console.log(error)
    }
}