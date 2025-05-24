"use client";
import {Button} from "./ui/button"

function ReadMoreButton({handleFun}) {
  return (
    <Button onClick={handleFun} className="px-2 py-2 rounded-md bg-yellow-300 ">
      Read More
    </Button>
  )
}

export default ReadMoreButton
