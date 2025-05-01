import { dbConnect } from "@/dbConfig/dbCongfig";
import bcrypt from 'bcryptjs';
import User from "@/Models/userModel";
import {NextRequest , NextResponse} from "next/server";

dbConnect()

export async function POST(request: NextRequest) {
    try {
         
        const {email , password} =await request.json();

        const user = await User.findOne({email});

        if(!user){
              return NextResponse.json({error : "user not Found"},{status: 400})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 });


    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: `this is Signup Error ===== ${error.message}` }, { status: 500 });
        }
        return NextResponse.json({ error: `this is Signup Error ===== ${String(error)}` }, { status: 500 });
    }
}