import { connect } from "@/src/DBConfiguration/dbConfig";
import bcryptjs from "bcryptjs";
import User from "@/src/models/userModel";

connect();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    let { name, email, password, confirmpassword, mobile } = data;

    //Password matching
    if (password !== confirmpassword) {
      return Response.json(
        { error: "Password doesnot match" },
        { status: 400 }
      );
    }

    //checking user is exist or not
    const user = await User.findOne({ email });

    if (user) {
      return Response.json({ error: "Email already exist" }, { status: 400 });
    }

    //hashing
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);

    //creating a new user
    let newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      mobile,
    });

    return Response.json(
      { newUser, success: true, data, msg: "Signup successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: "Password doesnot match" }, { status: 500 });
  }
}
