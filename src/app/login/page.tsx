"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function Login() {
  let [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  let router = useRouter();

  async function loginHandler(e: any) {
    e.preventDefault();
    try {
      let res = await axios.post("/api/login", loginInfo);
      console.log(res);
      if (res.data.success) {
        toast.success("Login successfully");
        router.push("/");
      }
    } catch (error: any) {
      console.log("Something went wrong! Please try again..");
      toast.error("Login Failed");
    }
  }

  return (
    <div
      className="flex  justify-center flex items-center
     bg-blue-300  h-screen"
    >
      <form onSubmit={loginHandler} className="flex flex-col gap-4 ">
        <h2 className="text-center text-6xl m-10  ">Login </h2>
        <input
          type="email"
          name="email"
          value={loginInfo.email}
          placeholder="Enter the email or mobile"
          onChange={(e: any) =>
            setLoginInfo({ ...loginInfo, email: e.target.value })
          }
          className="h-8 p-2  w-96 rounded cursor pointer h-2xl"
        />
        <input
          type="password"
          name="password"
          value={loginInfo.password}
          placeholder="Password"
          onChange={(e: any) => {
            setLoginInfo({ ...loginInfo, password: e.target.value });
          }}
          className="h-8 p-2 w-96 rounded cursor pointer h-8"
        />
        <input
          type="submit"
          value="Login"
          className="text-centre rounded cursor pointer w-24 p-2 bg-green-200 text-xl"
        />
      </form>
      <Toaster />
    </div>
  );
}
