// app/api/verify/check/route.ts
import { dbConnect } from '@/dbConfig/dbCongfig';
import { EmailVerification } from '@/Models/emailVerification';

export async function POST(req: Request) {
  const { email, code } = await req.json();

  await dbConnect();

  const record = await EmailVerification.findOne({ email, code });
  console.log("Record  ===== ",record );
  if (!record || record.expiresAt < new Date()) {
    return new Response(JSON.stringify({ message: 'Invalid or expired code' }), { status: 400 });
  }

  // Optional: delete code after verification
  await EmailVerification.deleteMany({ email });

  return new Response(JSON.stringify({ message: 'Email verified successfully!' }), { status: 200 });
}
