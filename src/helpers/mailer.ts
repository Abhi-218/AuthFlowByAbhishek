import User from "@/Models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const sendmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    console.log("hashedToken ===== ", hashedToken);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESATE") {
      await User.findByIdAndUpdate(userId, {
        $set: {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
        }
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "f7707cb690d835",
        pass: "7b7ffcb35cf46b",
      },
    });
    const mailOptions = {
      from: "abhi@218", // sender address
      to: email, // list of receivers
      subject: emailType, // Subject line
      html: `<p>click <a href='${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}'>here</a> for ${
        emailType === "VERIFY" ? "verify your email" : "change your password"
      } token=${hashedToken}`,
    };

    const mailresponse = await transporter.sendMail(mailOptions);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
