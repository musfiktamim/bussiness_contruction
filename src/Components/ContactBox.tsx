"use client";
import Link from 'next/link'
import { HeaderTextBoxBlack } from './Elements/HeaderTextBox'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { redirect } from 'next/dist/server/api-utils';

function ContactBox() {
    const [loading,setLoading] = useState(false);
    const [formData,setFormData] = useState<{
        name:string,
        email:string,
        phone:string,
        message:string
    }>({
        name:"",
        email:"",
        phone:"",
        message:"",
    })

    function handleChange(e:ChangeEvent<HTMLInputElement>){
        setFormData((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

 const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
            phone:"",
            name:"",
            email:"",
            message:""
        });
      }
    } catch (error) {
        if(error instanceof Error)
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
    

    return (
        <div className='py-5'>

            <div id='contact' className='flex justify-between'>
                <HeaderTextBoxBlack text='contact' />
                <Button variant={"link"}>
                    <Link className='text-black' href={"/contact"}>See More</Link>
                </Button>
            </div>
            <div className='w-full mt-5 h-auto'>
                <form onSubmit={handleSubmit} className='w-full h-auto px-5 py-5 flex flex-col gap-3 bg-white shadow-md rounded-md'>
                    <div className='flex flex-col gap-2'>
                        <Label>Name</Label>
                        <Input value={formData.name} onChange={handleChange} placeholder='Enter Your Name...' name='name' type='text' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label>Email</Label>
                        <Input value={formData.email} onChange={handleChange} placeholder='Enter Your Email...' name='email' type='email' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label>Phone</Label>
                        <Input value={formData.phone} onChange={handleChange} placeholder='Enter Your Phone Number...' name='phone' type='number' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label>Message</Label>
                        <Textarea value={formData.message} onChange={e=>setFormData((prev)=>({...prev,message:e.target.value}))} placeholder='Message...' name='message' maxLength={1000} required className='min-h-32 max-h-52' />
                    </div>
                    <Button type='submit' variant={"default"}>Send</Button>
                </form>
            </div>
        </div>
    )
}

export default ContactBox
