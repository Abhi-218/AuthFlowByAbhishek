import mongoose from "mongoose";
import { NextRequest , NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";

export async function getDataFromToken(request:NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || '';
        console.log("token === ",token)
        const decodedtoken:any = Jwt.verify(token,process.env.TOKEN_SECRETE!) 
        console.log("decodedtoken ======== ", decodedtoken)
        return decodedtoken.id;
    } catch (error:any) {
        return NextResponse.json({error : error.message},{status:400})
    }
}