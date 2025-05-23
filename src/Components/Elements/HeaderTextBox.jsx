import React from 'react'

export function HeaderTextBoxBlack({text="",hr=false}) {
    return (
        <h1 className={`relative capitalize text-xl lg:text-3xl font-bold before:contents-"" before:absolute ${hr?"before:h-1 before:w-full before:-bottom-1":"before:h-full before:w-2 before:top-0"} before:bg-amber-400`}> <p className={`ml-3 text-black capitalize`}>{text}</p></h1>
    )
}

export function HeaderTextBoxWhite({text="",hr=false}) {
    return (
        <h1 className={`relative text-xl lg:text-3xl capitalize font-bold before:contents-"" before:absolute ${hr?"before:h-1 before:w-full before:-bottom-1":"before:h-full before:w-2 before:top-0"} before:bg-amber-400 capitalize`}> <p className={`ml-3 text-white capitalize`}>{text}</p></h1>
    )
}
