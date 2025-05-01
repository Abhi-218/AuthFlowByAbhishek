import { dbConnect } from "@/dbConfig/dbCongfig";
import { NextResponse} from "next/server";
dbConnect()

export async function GET(){
     try {
        const response = NextResponse.json({
            message : "user logout successfully",
            success : true
        });
        console.log("responce ==",response)
        response.cookies.set("token","",{httpOnly:true,expires:new Date(0)});

        return response;
     } catch (error: unknown) {
      if (error instanceof Error) {
          return NextResponse.json({ error: `this is logout Error ===== ${error.message}` }, { status: 500 });
      }
      return NextResponse.json({ error: `this is logout Error ===== ${String(error)}` }, { status: 500 });
  }
}