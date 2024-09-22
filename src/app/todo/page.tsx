"use client";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

type TodoType = {
  _id: string;
  task: string;
  isCompleted: boolean;
  createdAt: string;
};
export default function Todo() {
  const [todo, setTodo] = useState<TodoType>({
    _id: "",
    task: "",
    isCompleted: false,
    createdAt: "",
  });

  const [todos, setTodos] = useState<Array<TodoType>>([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const res = await axios.get("/api/todo");
      if (res.data.success) {
        setTodos(res.data.todos);
      }
    } catch (error) {
      toast.error("Failed to fetch tasks");
    }
  }

  async function createTodo(e: any) {
    e.preventDefault();

    try {
      const res = await axios.post("/api/todo", todo);

      if (res.data.success) {
        setTodo({ task: "", _id: "", isCompleted: false, createdAt: "" });
        await fetchTodos();
        toast.success("Task added successfully");
      }
    } catch (error: any) {
      toast.error("Failed to add task");
    }
  }

  async function editTodo(todo: TodoType) {
    setTodo(todo);
    setEditing(true);
  }

  async function updateTodo(e: any) {
    e.preventDefault();

    try {
      const res = await axios.put("/api/todo", todo);
      if (res.data.success) {
        setTodo({ _id: "", task: "", isCompleted: false, createdAt: "" });
        setEditing(false);
        await fetchTodos();
        toast.success(res.data.msg);
        console.log(res);
      }
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  }

  async function deleteTodo(_id: string) {
    try {
      const res = await axios.delete("/api/todo", { data: { _id } });
      if (res.data.success) {
        await fetchTodos();

        toast.success(res.data.msg);
      }
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  }

  async function completeTask(id: string) {
    try {
      const res = await axios.patch(`/api/todo/${id}`);
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.msg);
        await fetchTodos();
      }
    } catch (error: any) {
      toast.error("Not completed task");
    }
  }

  return (
    <>
      {!editing ? (
        <form onSubmit={createTodo} className="flex flex-col gap-2 p-4  ">
          <input
            type="text"
            placeholder="Enter a Task"
            name="task"
            value={todo.task}
            onChange={(e: any) => {
              setTodo({ ...todo, task: e.target.value });
            }}
            className="p-2 border  "
          />
          <input
            type="submit"
            value="Create"
            className=" p-2 bg-blue-500 text-white rounded cursor-pointer"
          />
        </form>
      ) : (
        <form onSubmit={updateTodo} className="flex flex-col">
          <input
            type="text"
            placeholder="Enter a Task"
            name="task"
            value={todo.task}
            onChange={(e: any) => {
              setTodo({ ...todo, task: e.target.value });
            }}
            className="p-2 "
          />
          <input
            type="submit"
            value="Update"
            className="p-2 bg-green-500 text-white rounded cursor-pointer m-2"
          />
        </form>
      )}
      <Toaster />
      <table className="border m-8 h-1/2 w-full">
        <thead>
          <tr>
            <th className=" p-2 border bg-gray-100">Task</th>
            <th className="p-2 border bg-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo._id}>
              <td className=" p-2 border">{todo.task}</td>
              <td>{todo.createdAt}</td>
              <td className=" p-2 border ">
                <button
                  onClick={() => completeTask(todo._id)}
                  disabled={todo.isCompleted || false}
                  className="p-2 bg-pink-400"
                >
                  {todo.isCompleted ? "Completed" : "Incompleted "}
                </button>
                <button
                  className="bg-green-400 p-3 m-4 border"
                  onClick={() => editTodo(todo)}
                >
                  Edit
                </button>

                <button
                  className="bg-green-400 p-3 border"
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
