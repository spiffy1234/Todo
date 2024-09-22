"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function Home() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    getName();
  }, []);

  const route = useRouter();

  async function getName() {
    try {
      const res = await axios.get("/api/profile");
      if (res.data.success) {
        setUserName(res.data.user.name);
      }
    } catch (error: any) {
      toast.error("something went wrong");
    }
  }

  async function logout() {
    try {
      let res = await axios.get("api/logout");
      if (res.data.success) {
        toast.success("Logout");
        route.push("/login");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className="text-end p-2 h-screen bg-red-200">
      <button
        className="p-4  m-3 text-xl bg-red-500 text-white rounded cursor-pointer"
        onClick={logout}
      >
        Logout
      </button>

      <h2 className="text-center text-4xl  p-10">
        Welcome {userName} to our Todo app
      </h2>
      <Toaster />
    </div>
  );
}
