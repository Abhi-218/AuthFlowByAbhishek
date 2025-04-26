import { dbConnect } from "@/dbConfig/dbCongfig";
import bcrypt from 'bcryptjs';
import User from "@/Models/userModel";
import {NextRequest , NextResponse} from "next/server";
import { sendmail } from "@/helpers/mailer";

dbConnect()

export async function POST(request: NextRequest) {
    try {
        const reqBody =await request.json();
        const {username , email , password} = reqBody;
        console.log('reqBody ========== ',reqBody)

        const user = await User.findOne({email})
        console.log('uset ===========' , user)

        if(user){
              return NextResponse.json({error : "user already exist"},{status: 400})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({username,email,password : hashedPassword});

        const savedUser = await newUser.save();
        console.log('saveduser ===========',savedUser)
        
        console.log("saveduser._id ======", savedUser._id)
       await sendmail({email , emailType : "VERIFY" , userId : savedUser._id})
       return NextResponse.json({message: "user register successfully ",savedUser  })

    } catch (error:any) {
        return NextResponse.json({error : error.message},{status : 500})
    }
}