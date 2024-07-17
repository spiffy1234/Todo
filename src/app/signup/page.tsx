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
      let res = await axios.post("/api/login", user);
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
    <div>
      <form onSubmit={signupHandler}>
        <input
          type="text"
          name="name"
          value={user.name}
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={user.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmpassword"
          value={user.confirmpassword}
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        <input
          type="text"
          name="mobile"
          value={user.mobile}
          placeholder="Mobile"
          onChange={handleChange}
        />
        <input type="submit" value="Signup" />
      </form>
      <Toaster />
    </div>
  );
}
