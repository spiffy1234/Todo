import User from "@/src/models/userModel";
import bcryptjs from "bcryptjs";

export async function POST(request: Request) {
  const data = await request.json();
  let { email, password } = data;

  //we are checking the user exist
  const user = await User.findOne({ email });

  if (!user) {
    return Response.json({ error: "User doesnot exist" }, { status: 400 });
  }

  //we are checking the password
  let validPassword = await bcryptjs.compare(password, user.password);
  if (!validPassword) {
    return Response.json({ error: "Password is incorrect" }, { status: 500 });
  }

  // //creating token data object
  // const tokenData = {
  //   id: user._id,
  //   email: user.email,
  // };

  return Response.json(
    {
      msg: "Login successful",
      success: true,
    },
    { status: 200 }
  );
}
