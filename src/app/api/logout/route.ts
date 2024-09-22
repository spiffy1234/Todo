import { cookies } from "next/headers";

export async function GET() {
  try {
    cookies().delete("token");
    return Response.json({
      msg: "logout successfully",
      success: true,
      headers: { "Set-Cookie": `token=""` },
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
