"use client";
import React, { useState } from "react";
import { Label } from "../../../../Components/ui/label";
import { Input } from "../../../../Components/ui/input";
import { Textarea } from "../../../../Components/ui/textarea";
import { Button } from "../../../../Components/ui/button";
import { toast } from "sonner";
import { redirect } from "next/navigation";

function ReviewGivepage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    review: "",
    rate: 0, // <-- make rate a number initially
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert rate to number just in case
    const payload = { ...formData, rate: Number(formData.rate) };

    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (response.ok) {
      toast.success(result.message);
      redirect("/client_reviews")
    } else {
      toast.error(result.message || "Failed to submit review");
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="flex px-2 w-full py-10 items-center justify-center">
      <form
        className="md:w-[70%] py-10 px-3 lg:w-[50%] w-full flex flex-col gap-5 shadow-sm border-[0.5px] border-gray-400 rounded-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center">Review</h1>

        <Label>Rate</Label>
        
        <Input type="range" name="rate" min={0} max={5} step={1} value={formData.rate} onChange={handleChange} />

        <div className="flex flex-col gap-3">
          <Label>Enter Name</Label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your Name..."
            required
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label>Enter Email</Label>
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email..."
            type="email"
            required
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label>Enter Review</Label>
          <Textarea
            maxLength={200}
            name="review"
            value={formData.review}
            onChange={handleChange}
            className="min-h-[100px] max-h-[200px]"
            required
            placeholder="Please provide your review"
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default ReviewGivepage;
