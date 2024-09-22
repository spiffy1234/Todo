import Task from "@/src/models/taskModel";
import { connect } from "@/src/DBConfiguration/dbConfig";
import { NextRequest } from "next/server";
import { getIdFromToken } from "@/src/helpers/getIdFromToken";

connect();

//for status updated
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const userId = await getIdFromToken(request);
    const todo = await Task.findById(id).select("userId");

    console.log(todo, "todo>>");
    console.log(userId, "________________op");
    if (todo.userId == userId) {
      const todo = await Task.findById(id);

      if (!todo) {
        return Response.json({ error: "No task" }, { status: 400 });
      }

      todo.isCompleted = true;
      const completeTask = await todo.save();

      if (!completeTask) {
        return Response.json({ error: "Not completed yet" }, { status: 400 });
      }

      return Response.json(
        { completeTask, msg: "completed", success: true },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
