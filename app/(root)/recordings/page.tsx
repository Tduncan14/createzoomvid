import React from 'react'
import CallList from '@/components/ui/CallList'

const Recording = () => {
    return (
        <section className="flex size-full flex-col gap-10 px-8 text-white">
            <h1 className="text-3xl font-bold">
                Recording
            </h1>


            <CallList type='recordings' />
        </section>
    )
}

export default Recording
