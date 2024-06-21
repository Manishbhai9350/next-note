import { NextRequest, NextResponse } from "next/server";
import { verify } from "./app/api/_utils/jwt";
import { UserModel } from "./app/api/_models/user.model";

interface tokenProps {
    email:string;
    id:string;
    username:string;
}

export async function middleware (request:NextRequest){
    const token = request.cookies.get('token')?.value;
    const publicPaths = ['/login','/signup']
    const protectedPaths = ['/']
    const {pathname} = request.nextUrl
    let isPublic = publicPaths.includes(pathname)
    if (isPublic && token) {
        return NextResponse.redirect(new URL('/',request.url))
    } else if (protectedPaths.includes(pathname) && token) {
        return NextResponse.next()
    }  else if (protectedPaths.includes(pathname) && !token) {
        return NextResponse.redirect(new URL('/login',request.url))
    } 
    
}

const config = {
    matcher:[
        '/*'
    ]
}