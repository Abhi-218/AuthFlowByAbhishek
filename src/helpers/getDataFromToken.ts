import { NextRequest, NextResponse } from "next/server";
import Jwt, { JwtPayload } from "jsonwebtoken";

export async function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value || '';
    console.log("token === ", token);

    const decodedtoken = Jwt.verify(token, process.env.TOKEN_SECRETE!) as JwtPayload;
    console.log("decodedtoken ======== ", decodedtoken);

    return decodedtoken.id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 400 });
  }
}
