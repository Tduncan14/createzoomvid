import React, { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import { StreamVideoProvider } from '@/providers/StreamClientProvider'

const RootLayout = ({ children }: { children: ReactNode }) => {

    return (
        <main>
            <Navbar />
            <StreamVideoProvider>
                {children}
            </StreamVideoProvider>
            Footer
        </main>
    )
}


export default RootLayout