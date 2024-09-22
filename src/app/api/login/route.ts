import jwt from "jsonwebtoken";
import User from "@/src/models/userModel";
import bcryptjs from "bcryptjs";
import { connect } from "@/src/DBConfiguration/dbConfig";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

connect();
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    let { email, password } = data;

    //we are checking the user exist
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return Response.json({ error: "User doesnot exist" }, { status: 400 });
    }

    //we are checking the password
    let validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return Response.json({ error: "Password is incorrect" }, { status: 500 });
    }

    // create token
    const token = await jwt.sign(
      { id: user._id, email: user.email },
      process.env.TOKEN_SECRET!,
      { expiresIn: "1d" }
    );

    //setting cookies

    const cookie = cookies();
    cookie.set("token", token, { httpOnly: true });

    const res = Response.json(
      {
        msg: "Login successful",
        success: true,
        headers: {
          "Set-Cookie": `token=${token}`,
        },
      },
      { status: 200 }
    );

    return res;
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
