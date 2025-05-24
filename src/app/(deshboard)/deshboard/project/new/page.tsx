"use client"
import React, { useState } from 'react'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'
import Image from 'next/image'

function ProjectNewpage() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<{
        title: string,
        description: string,
        preview: string | null
    }>({
        title: "",
        description: "",
        preview: null
    })


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, preview: reader.result as string }))
            }
            reader.readAsDataURL(file)
        } else {
            setFormData((prev) => ({ ...prev, preview: null }))

        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("/api/project", {
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
            if(response.status!==201){
                toast.error(data.message || "Something went wrong")
            }else{
                toast.success(data.message || "Something went wrong")
                setFormData({description:"",title:"",preview:null})
            }
            
        } catch (error) {
            if(error instanceof Error)
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
        redirect("/deshboard/project");
    };

    return (
        <div className='w-full px-2 flex justify-center mt-10'>
            <form onSubmit={handleSubmit} className='lg:w-[60%] flex flex-col border px-4 py-10 rounded-xl border-gray-300 shadow-md gap-6 md:w-[70%] w-full bg-white'>
                <h2 className='text-xl font-semibold text-center mb-4'>Create New Project</h2>

                {/* Title */}
                <div className='flex flex-col gap-2'>
                    <Label className='text-base text-gray-700'>Title</Label>
                    <Input name='title' value={formData.title} onChange={handleChange} placeholder='Enter your project title...' />
                </div>

                {/* Description */}
                <div className='flex flex-col gap-2'>
                    <Label className='text-base text-gray-700'>Description</Label>
                    <Input name='description' onChange={handleChange} value={formData.description} placeholder='Enter your project description...' />
                </div>

                {/* Image Upload with Preview */}
                <div className='flex flex-col gap-2'>
                    <Label className='text-base text-gray-700'>Project Image</Label>

                    <Input
                        type='file'
                        accept='image/*'
                        onChange={handleImageChange}
                        className='cursor-pointer bg-white'
                    />

                    {formData.preview && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-2">Preview:</p>

                            <div className="w-full max-h-64 overflow-hidden rounded-md border group">
                                <img
                                    src={formData.preview}
                                    alt="Project Preview"
                                    className="w-full h-auto max-h-64 object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Submit */}
                <Button disabled={loading as boolean} type='submit' className='w-fit py-3 px-6 self-end'>
                    Create
                </Button>
            </form>
        </div>
    )
}

export default ProjectNewpage
