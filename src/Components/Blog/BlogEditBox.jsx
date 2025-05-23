"use client";

import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Textarea } from "@/Components/ui/textarea";
import { Switch } from "@/Components/ui/switch";
import Image from "next/image";

function BlogEditBox({ item }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: item.title || "",
    description: `${item.content}` || ``,
    preview: null,
    publish: !!item.published,
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/blog", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: item.id,
          title: formData.title,
          content: formData.description,
          publish: formData.publish,
          preview: formData.preview,
        }),
      });

      const data = await response.json();

      if (!response.ok || response.status !== 201) {
        toast.error(data.message || "Something went wrong");
      } else {
        toast.success(data.message || "Blog updated successfully");
        setFormData({
          title: item.title || "",
          description: item.content || "",
          preview: null,
          publish: !!item.published,
        });
      }
    } catch (error) {
      toast.error(error?.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
    redirect("/deshboard/blog");
  };

  return (
    <div className="w-full px-2 flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="lg:w-[60%] md:w-[70%] w-full flex flex-col border px-4 py-10 rounded-xl border-gray-300 shadow-md gap-6 bg-white"
        noValidate
      >
        <h2 className="text-xl font-semibold text-center mb-4">Edit Blog</h2>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="title" className="text-base text-gray-700">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter your blog title..."
            required
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="description" className="text-base text-gray-700">
            Content
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="<p>You can write html in this text box</p>..."
            className="min-h-[100px] max-h-[200px]"
            required
          />
        </div>

        {/* Image Upload and Preview */}
        <div className="flex flex-col gap-2">
          <Label className="text-base text-gray-700">Blog Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="cursor-pointer bg-white"
            aria-label="Upload blog image"
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

          {/* Publish Toggle */}
          <div className="flex items-center space-x-2 mt-4">
            <Switch
              checked={formData.publish}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, publish: checked }))
              }
              id="publish"
              aria-checked={formData.publish}
            />
            <Label htmlFor="publish">Publish</Label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-between">          
          <Button
            disabled={loading}
            type="button"
            className="w-fit py-3 px-6 self-end"
            aria-busy={loading}
          >
            Delete
            {/* {loading ? "Saving..." : "Edit"} */}
          </Button>
          <Button
            disabled={loading}
            type="submit"
            className="w-fit py-3 px-6 self-end"
            aria-busy={loading}
          >
            Edit
            {/* {loading ? "Saving..." : "Edit"} */}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BlogEditBox;
