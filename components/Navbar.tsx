import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import Mobilenav from './Mobilenav'
import { SignedIn, UserButton } from '@clerk/nextjs'

function Navbar() {
    return (
        <nav className='  flex-between z-50 w-full bg-dark-1 px-6 py-4    mt-lg:px-10'>
            <Link href='/' className="flex items-center gap-1">
                <Image src="/icons/logo.svg" width={32} height={32} alt="boom logo" className="max-sm:size-10" />
                <p className="text-[26px] font-extrabold max-sm:hidden text-white">Language Call</p>
            </Link>

            <div className="flex  gap-5">
                {/* clerk - user management */}
                <SignedIn>
                    <UserButton />
                </SignedIn>



                <Mobilenav />
            </div>



        </nav>
    )
}

export default Navbar
