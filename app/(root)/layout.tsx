import React, { ReactNode } from 'react'
import { Metadata } from 'next';
import Navbar from '@/components/Navbar'
import { StreamVideoProvider } from '@/providers/StreamClientProvider'

export const metadata: Metadata = {
    title: "LanguageCall",
    description: "Learn a new langauage",
    icons: {
        icon: '/icons/logo.svg'
    }
};

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