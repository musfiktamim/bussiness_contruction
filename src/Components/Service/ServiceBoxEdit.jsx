"use client";
import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Textarea } from "@/Components/ui/textarea";
import { Switch } from "../ui/switch";
import Image from "next/image";

function ServiceBoxEdit({ item }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: item.title,
    description: item.description,
    preview: null,
    publish: item.published,
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, preview: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, preview: null }));
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/service", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...{ id: item.id }, ...formData }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Something went wrong");
      }
      if (response.status !== 201) {
        toast.error(data.message || "Something went wrong");
      } else {
        toast.success(data.message || "Something went wrong");
        setFormData({
          description: item.description,
          title: item.title,
          preview: null,
          publish: item.published,
        });
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
    redirect("/deshboard/service");
  };

  const handleDelete = async (e) => {
    setLoading(true);
    try {
      const response = await fetch("/api/service", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...{ id: item.id }}),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Something went wrong");
      }
      if (response.status !== 200) {
        toast.error(data.message || "Something went wrong");
      } else {
        toast.success(data.message || "Something went wrong");
        setFormData({
          description: item.description,
          title: item.title,
          preview: null,
          publish: item.published,
        });
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
    redirect("/deshboard/service");
  }

  return (
    <div className="w-full px-2 flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="lg:w-[60%] flex flex-col border px-4 py-10 rounded-xl border-gray-300 shadow-md gap-6 md:w-[70%] w-full bg-white"
      >
        <h2 className="text-xl font-semibold text-center mb-4">Edit Service</h2>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <Label className="text-base text-gray-700">Title</Label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter your service title..."
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <Label className="text-base text-gray-700">Description</Label>
          <Textarea
            name="description"
            onChange={handleChange}
            value={formData.description}
            placeholder="Enter your service description..."
            className="min-h-[100px] max-h-[200px]"
          />
        </div>

        {/* Image Upload with Preview */}
        <div className="flex flex-col gap-2">
          <Label className="text-base text-gray-700">Service Image</Label>

          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="cursor-pointer bg-white"
          />

          {formData.preview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">After:</p>
              <div className="w-full py-3 max-h-64 border rounded-md">
                <Image
                  src={formData.preview}
                  alt="Project Preview"
                  width={200}
                  height={300}
                  className="object-contain px-2 self-center place-self-center border-gray-500"
                />
              </div>
            </div>
          )}
          {(!formData.preview || item.image) && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Before:</p>
              <div className="w-full py-3 max-h-64 border rounded-md">
                <Image
                  src={item.image}
                  alt="Project Preview"
                  width={200}
                  height={300}
                  className="object-contain px-2 self-center place-self-center border-gray-500"
                />
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.publish}
              onCheckedChange={() =>
                setFormData((prev) => ({ ...prev, publish: !prev.publish }))
              }
              name="publish"
              id="publish"
            />
            <Label htmlFor="publish">Publish</Label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-between">
          <Button onClick={handleDelete} disabled={loading} variant={"destructive"} type="button" className="w-fit py-3 px-6">
            Delete
          </Button>
          <Button disabled={loading} type="submit" className="w-fit py-3 px-6">
            Edit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ServiceBoxEdit;
