export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log(data);
    return Response.json({ error: "Password match" });
  } catch (error) {
    return Response.json({ error: "Password doesnot match" }, { status: 500 });
  }
}
