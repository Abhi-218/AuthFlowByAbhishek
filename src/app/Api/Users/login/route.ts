    import { dbConnect } from "@/dbConfig/dbCongfig";
    import bcrypt from 'bcryptjs';
    import User from "@/Models/userModel";
    import {NextRequest , NextResponse} from "next/server";
    import jwt from "jsonwebtoken"
    dbConnect()

    export async function POST(request : NextRequest){
        try {
            const reqBody =await request.json()
            const {email,password} = reqBody;
            console.log("email ====",email , "\npassword ==== ",password)
            const user = await User.findOne({email:email}) || await User.findOne({username:email})
            console.log("user =======",user)
            if(!user){
                return NextResponse.json({error: "user can not found please check your email"},{status:500})
            }
            const validPassword = await bcrypt.compare(password,user.password);
            console.log("validpass ====",validPassword)
            if(!validPassword){
                return NextResponse.json({error: "your password is not correct"},{status:500})
        }

        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email,
        }

            const token = await jwt.sign(tokenData,process.env.TOKEN_SECRETE!,{ expiresIn: '1d' });
            console.log("token ===", token)
        
            user.save()
            const response = NextResponse.json({
                message : "Loging successfully",
                success : true,
            })

            response.cookies.set("token",token,{httpOnly:true});

            return response

        } catch (error: unknown) {
            if (error instanceof Error) {
                return NextResponse.json({ error: `this is loginerror ===== ${error.message}` }, { status: 500 });
            }
            return NextResponse.json({ error: `this is loginerror ===== ${String(error)}` }, { status: 500 });
        }
    }