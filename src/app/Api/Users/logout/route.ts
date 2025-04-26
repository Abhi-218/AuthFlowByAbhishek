import { dbConnect } from "@/dbConfig/dbCongfig";
import {NextRequest , NextResponse} from "next/server";
dbConnect()

export async function GET(request : NextRequest){
     try {
        const response = NextResponse.json({
            message : "user logout successfully",
            success : true
        });
        console.log("responce ==",response)
        response.cookies.set("token","",{httpOnly:true,expires:new Date(0)});

        return response;
     } catch (error:any) {
        return NextResponse.json({error : error.message},{status : 500});
         
     }
}