"use client";
import React, { useActionState } from 'react'
import  {Label} from '../../../../Components/ui/label'
import  {Input} from '../../../../Components/ui/input'
import  {Textarea} from '../../../../Components/ui/textarea'
import  {Button} from '../../../../Components/ui/button'
import  {Slider} from '../../../../Components/ui/slider'
import {addReviews} from "../../../../lib/action"


function ReviewGivepage() {    

    const [state,formAction,pending] = useActionState(addReviews,{message:""})

  return (
    <div className='flex px-2 w-full py-10 items-center justify-center'>
        <form className=' md:w-[70%] py-10 px-3 lg:w-[50%] w-full flex flex-col gap-5 shadow-sm border-[0.5px] border-gray-400 rounded-md' action={formAction}>
            <h1 className='text-2xl font-bold text-center'>Review</h1>
            <Slider name='rate' min={0} max={5} step={1} />
            <div className='flex flex-col gap-3'>
                <Label>Enter Name</Label>
                <Input name='name' placeholder='Enter your Name...' required />
            </div>
            <div className='flex flex-col gap-3'>
                <Label>Enter Email</Label>
                <Input name='email' placeholder='Enter your Email...' type='email' required />
            </div>
            <div className='flex flex-col gap-3'>
                <Label>Enter Review</Label>
                <Textarea maxLength={200}  name='review' className='min-h-[100px] max-h-[200px]' required placeholder='please provide your review' />
            </div>
            {
                state?.message &&
                    <div className='w-full h-5 flex items-center justify-start px-3 rounded-md py-5 text-sm text-black bg-red-300'>
                        {state?.message}
                    </div>
            }
            <Button disabled={pending}>New</Button>
        </form>
    </div>
  )
}

export default ReviewGivepage
