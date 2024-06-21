import { NextRequest, NextResponse } from "next/server";
import { connect } from "../_utils/connect.db";
import { UserModel } from "../_models/user.model";
import { hash } from "../_utils/bcrypt";
import { sign } from "../_utils/jwt";

connect()

interface SignUpOptions {
    email:string;
    password:string;
    username:string;
}

export const POST = async (req:NextRequest) => {
    try {
        const {email,password,username} : SignUpOptions = await  req.json()
        if (!email ||!password ||!username) {
            const response = NextResponse.json({
                message:'Check Your Credentials',
                status:400,
                ok:false
            })
            return response
        }

        const ExistUser = await UserModel.findOne({email})
        if (ExistUser) {
            const response = NextResponse.json({
                message:'Check Your Credentials',
                status:400,
                ok:false
            })
            return response
        }
        const hashedPassword =  hash(password)
        const User = await UserModel.create({email,password:hashedPassword,username})
        const token = sign({
            username,
            email,
            id:User.id
        })
        const response = NextResponse.json({
            message:'User Created SuccessFully',
            ok:true,
            status:201
        })
        response.cookies.set('token',token,{
            httpOnly:true
        })
        return response
    } catch (error) {
        return  NextResponse.json({
            message:"Something went wrong",
            status:400,
            ok:false
        })
        console.log('error while sign UP ')
        console.log(error)
    }
}