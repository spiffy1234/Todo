import { connect } from "@/src/DBConfiguration/dbConfig";
import User from "@/src/models/userModel";
import { NextRequest } from "next/server";
import { getIdFromToken } from "@/src/helpers/getIdFromToken";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getIdFromToken(request);

    const user = await User.findOne({ _id: userId }).select("name");
    return Response.json(
      { user, msg: "User found", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
