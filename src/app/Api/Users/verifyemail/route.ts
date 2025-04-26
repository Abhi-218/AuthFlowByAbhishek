import { dbConnect } from "@/dbConfig/dbCongfig";
import User from "@/Models/userModel";
import {NextRequest , NextResponse} from "next/server";


dbConnect()

export async function POST(request : NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody;
        console.log('tokenroute =====',token);

    const user = await User.findOne({verifyToken : token,verifyTokenExpiry:{$gt:Date.now()}})
    
    if(!user){
        return NextResponse.json({error :"your token is not valid"},{status : 400})
    }

    console.log("user verifyemail ====== ",user)

    user.isVerified=true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    const saveduser = await user.save();
    console.log(saveduser);
    return NextResponse.json({message : saveduser},{status : 200})

    } catch (error : any) {
        return NextResponse.json({error :    error.message},{status : 500})
    }
}