import React, { ReactNode } from 'react'
import Navbar from '@/components/Navbar'


const RootLayout = ({ children }: { children: ReactNode }) => {

    return (
        <main>
            <Navbar />
            {children}
            Footer
        </main>
    )
}


export default RootLayout