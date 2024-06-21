import { NextRequest, NextResponse } from "next/server";

export async function POST (req:NextRequest) {
    try {
        const response = NextResponse
                        .json({
                            message:"Log Out Successfully",
                            status:200,
                            ok:true
                        })
        response.cookies.set("token",'',{httpOnly:true})
        return response
    } catch (error) {
        
    }
}