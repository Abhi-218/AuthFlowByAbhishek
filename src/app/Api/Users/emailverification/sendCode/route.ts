// app/api/verify/send/route.ts

import { dbConnect } from "@/dbConfig/dbCongfig";
import emailsender from "@/helpers/emailsender";
import { EmailVerification } from "@/Models/emailVerification";
import User from "@/Models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, path } = await req.json();
  await dbConnect();

  const alreadyAccount = await User.findOne({ email });
    if(path === "forgetPassword" && !alreadyAccount){
      return new Response(JSON.stringify({message : "user does not have an Account .",noAccount : true}))
    }
    if (alreadyAccount && path === 'register' ) {
      return new Response(JSON.stringify({ message: 'User already has Account .',  noAccount: false }), { status: 200 });
    }
      const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
      const exisingEmail = await EmailVerification.findOne({ email })
      if (exisingEmail) {
        await EmailVerification.updateOne({ email },
          {
            $set: {
              code,
              expiresAt
            }
          });
        emailsender(email, code , path) ;
        return new Response(JSON.stringify({ message: 'Code sended.' , }), { status: 200 });
      }
      //   await emailVerification.create({ email, code, expiresAt });
      const sendcode = new EmailVerification({ email, code, expiresAt });
      await sendcode.save();

      // TODO: Send code via email here (e.g. nodemailer)
        emailsender(email, code , path);

      return new Response(JSON.stringify({ message: 'Code sent.' }), { status: 200 });
   }
    

    

