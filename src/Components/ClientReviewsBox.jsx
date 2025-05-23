import Link from 'next/link'
import React from 'react'
import { HeaderTextBoxBlack } from './Elements/HeaderTextBox'
import ReviewsSlider from './Elements/ReviewsSlider'
import { Button } from './ui/button'

function ClientReviewsBox({reviews}) {
  return (
    <div className='py-5'>
      <div id='clientReview' className='flex justify-between'>
        <HeaderTextBoxBlack text={"Client Reviews"} />
        <div className='flex gap-2'>
          <Button variant={"link"}>
            <Link href={"/client_reviews"}>See More</Link>
          </Button>
          <Button variant={"link"}>
            <Link href={"client_reviews/new"}>Give Review</Link>
          </Button>
        </div>
      </div>

      <ReviewsSlider reviews={reviews} />
      
    </div>
  )
}

export default ClientReviewsBox
