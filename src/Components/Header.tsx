import Image from 'next/image'
import React from 'react'

interface Props {
    
}

export const Header = (props: Props) => {
    return (
        <header className='w-full p-4 border-b border-gray-200 sticky top-0 bg-white z-10'>
            <div className='flex gap-4 w-fit items-center justify-center'>
                <Image src="/logo.svg" alt="logo" width={20} height={20} />
                <p className='text-black text-lg font-bold leading-tight'>Plate Decoder</p>
            </div>
        </header>
    )
}
