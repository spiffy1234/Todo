"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function Signup() {
  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    mobile: "",
  });
  let router = useRouter();

  function handleChange(e: any) {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  async function signupHandler(e: any) {
    e.preventDefault();
    try {
      let res = await axios.post("/api/signup", user);
      if (res.data.success) {
        toast.success("Signup Successfully");
        router.push("/login");
      }
    } catch (error: any) {
      console.log("Something went wrong");
      toast.error("Signup failed");
    }
  }

  return (
    <div className="flex bg-orange-300 h-screen ">
      <form className="flex flex-col " onSubmit={signupHandler}>
        <h2 className="text-centre text-4xl m-4 ">Signup</h2>
        <input
          type="text"
          name="name"
          value={user.name}
          placeholder="Name"
          onChange={handleChange}
          className="h-8 p-2 m-4 w-96 rounded cursor pointer h-2xl"
        />
        <input
          type="email"
          name="email"
          value={user.email}
          placeholder="Email"
          onChange={handleChange}
          className="h-8 p-2 m-4 w-96 rounded cursor pointer h-2xl"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="Password"
          onChange={handleChange}
          className="h-8 p-2 m-4  w-96 rounded cursor pointer h-2xl"
        />
        <input
          type="password"
          name="confirmpassword"
          value={user.confirmpassword}
          placeholder="Confirm Password"
          onChange={handleChange}
          className="h-8 p-2 m-4  w-96 rounded cursor pointer h-2xl"
        />
        <input
          type="text"
          name="mobile"
          value={user.mobile}
          placeholder="Mobile"
          onChange={handleChange}
          className="h-8 p-2 m-4  w-96 rounded cursor pointer h-2xl"
        />
        <input
          type="submit"
          value="Signup"
          className="text-centre rounded cursor pointer w-24 m-6 p-2 bg-green-200 text-xl"
        />
      </form>
      <Toaster />
    </div>
  );
}
