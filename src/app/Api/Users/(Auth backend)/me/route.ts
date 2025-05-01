import { dbConnect } from "@/dbConfig/dbCongfig";
import User from "@/Models/userModel";
import {NextRequest , NextResponse} from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
dbConnect()


export async function POST(request : NextRequest) {

   try {
     const userId =await getDataFromToken(request);
     console.log("user id ======",userId)
     const user = await User.findOne({_id:userId}).select('-password');
     console.log("user ======",user)
     if(!user){
         return NextResponse.json({error : 'user not found'},{status : 404})
        }
        return NextResponse.json({
          data: user
        },{status:200})
      } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: `this is Me Error ===== ${error.message}` }, { status: 500 });
        }
        return NextResponse.json({ error: `this is Me Error ===== ${String(error)}` }, { status: 500 });
    }
}