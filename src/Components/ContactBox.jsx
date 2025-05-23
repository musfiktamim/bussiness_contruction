import Link from 'next/link'
import { HeaderTextBoxBlack } from './Elements/HeaderTextBox'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

function ContactBox() {
    return (
        <div className='py-5'>

            <div id='contact' className='flex justify-between'>
                <HeaderTextBoxBlack text='contact' />
                <Button variant={"link"}>
                    <Link className='text-black' href={"/contact"}>See More</Link>
                </Button>
            </div>
            <div className='w-full mt-5 h-auto'>
                <form className='w-full h-auto px-5 py-5 flex flex-col gap-3 bg-white shadow-md rounded-md'>
                    <div className='flex flex-col gap-2'>
                        <Label>Name</Label>
                        <Input placeholder='Enter Your Name...' name='name' type='text' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label>Email</Label>
                        <Input placeholder='Enter Your Email...' name='email' type='email' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label>Phone</Label>
                        <Input placeholder='Enter Your Phone Number...' name='phone' type='number' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label>Message</Label>
                        <Textarea placeholder='Message...' name='message' maxLength={1000} required className='min-h-32 max-h-52' />
                    </div>
                    <Button variant={"default"}>Send</Button>
                </form>
            </div>
        </div>
    )
}

export default ContactBox
