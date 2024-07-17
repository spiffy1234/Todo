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
    <div>
      <form onSubmit={loginHandler}>
        <h2>Login here</h2>
        <input
          type="email"
          name="email"
          value={loginInfo.email}
          placeholder="Enter the email or mobile"
          onChange={(e: any) =>
            setLoginInfo({ ...loginInfo, email: e.target.value })
          }
        />
        <input
          type="password"
          name="password"
          value={loginInfo.password}
          placeholder="Password"
          onChange={(e: any) => {
            setLoginInfo({ ...loginInfo, password: e.target.value });
          }}
        />
        <input type="submit" value="Login" />
      </form>
      <Toaster />
    </div>
  );
}
