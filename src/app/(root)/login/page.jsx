"use client";
import { Label } from "../../../Components/ui/label"
import { Input } from "../../../Components/ui/input"
import { Button } from "../../../Components/ui/button"

import React, { useState } from 'react'
import { toast } from "sonner";
import { redirect } from "next/navigation";

function page() {
  const [loading,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Something went wrong")
      }
      console.log(data)
      if (response.status !== 200) {
        toast.error(data.message || "Something went wrong")
      } else {
        toast.success(data.message || "Something went wrong")
        setFormData({email:"",password:"" })
      }
    } catch (error) {
      if (error instanceof Error)
        toast.error(error.message)
    } finally {
      setLoading(false);
    }
    redirect("/deshboard");
  };

  return (
    <div className='w-full h-[85vh] flex items-center justify-center'>
      <div className='md:w-[70%] w-full border rounded-md h-fit px-2 py-3'>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Email:</Label>
            <Input value={formData.email} onChange={handleChange} name="email" className="w-full" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Password:</Label>
            <Input value={formData.password} onChange={handleChange} name="password" type="password" className="w-full" />
          </div>
          <Button disabled={loading}>Login</Button>
        </form>
      </div>
    </div>
  )
}

export default page
