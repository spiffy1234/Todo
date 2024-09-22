import Task from "@/src/models/taskModel";
import { connect } from "@/src/DBConfiguration/dbConfig";
import { NextRequest } from "next/server";
import { getIdFromToken } from "@/src/helpers/getIdFromToken";

connect();

export async function GET(request: NextRequest) {
  try {
    const todos = await Task.find({});
    return Response.json({ success: true, todos }, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const data = await request.json();
    console.log(data);
    await Task.findByIdAndDelete(data._id);

    return Response.json(
      { success: true, msg: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { task, _id } = await request.json();
    const data = await Task.findByIdAndUpdate(_id, { task });
    console.log(data);

    return Response.json(
      { success: true, msg: "Update successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

//create todo
export async function POST(request: NextRequest) {
  try {
    const userId = await getIdFromToken(request);
    const { task } = await request.json();

    if (!task) {
      return Response.json({ error: "Task is required" }, { status: 400 });
    }

    await Task.create({ task, userId });

    return Response.json(
      { success: true, message: "Task added successfully!" },
      { status: 201 }
    );
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// //for status updated
// export async function PATCH(request: NextRequest) {
//   try {
//     const data = await request.json();
//     const userId = await getIdFromToken(request);
//     const todo = await Task.findById(data._id);
//     console.log(data, userId, todo, "check");

//     if (todo.userId == userId) {
//       const todo = await Task.findById(data._id);

//       if (!todo) {
//         return Response.json({ error: "No task" }, { status: 400 });
//       }

//       todo.isCompleted = true;
//       const completeTask = await todo.save();

//       if (!completeTask) {
//         return Response.json({ error: "Not completed yet" }, { status: 400 });
//       }

//       return Response.json(
//         { completeTask, msg: "completed", success: true },
//         { status: 200 }
//       );
//     } else {
//       return Response.json({ error: "unauthorized access" });
//     }
//   } catch (error: any) {
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }

