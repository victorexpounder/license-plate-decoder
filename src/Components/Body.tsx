'use client'
import Image from 'next/image'
import React, { useState } from 'react'

interface Props {
    
}

export const Body = (props: Props) => {
    const [hue, setHue] = useState(0);
    const [filter, setFilter] = useState("none");

    const changeColor = () => {
        setHue((prev) => (prev + 60) % 360); // Increments by 60° for distinct colors
        setFilter(`hue-rotate(${hue}deg)`);
    };

    return (
        <div className='min-h-screen w-full flex max-lg:flex-col items-center max-lg:justify-center px-9  lg:relative' style={{fontFamily: "Noto Sans, Plus Jakarta Sans"}}>
            <div className='flex flex-col md:w-[600px]  gap-3 justify-self-end text-left'>
                <h1 className='font-bold text-[62px] max-md:text-[35px]'>Decode Plate Numbers Instantly</h1>
                <p className='font-medium text-[22px] max-md:text-[18px]'>Enter Any Plate Number to receive detailed Vehicle Information</p>
                <div className='bg-[#EEEEEE] p-4 w-[80%] max-md:w-full h-16 rounded-xl flex items-center justify-between'>
                     <div className='flex w-full items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                          <path
                            d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                          ></path>
                        </svg>
                        <input className='border-none outline-none bg-transparent w-full' type="text" placeholder='Enter Plate Number Here'/>
                     </div>
                     <button className='bg-[#000] text-base font-bold text-[#fff] px-4 h-12 rounded-lg'>
                            Decode
                     </button>
                </div>
            </div>       
            <Image className='lg:absolute right-0' src="/carRed.png" alt="car" style={{ filter }} width={700} height={700} onClick={changeColor}/>

        </div>
    )
}
