import React from 'react'
import CallList from '@/components/ui/CallList'

const Previous = () => {
    return (
        <section className=" px-10 flex size-full flex-col gap-10 text-white">
            <h1 className="text-3xl font-bold">
                Previous
            </h1>


            <CallList type="ended" />

        </section>
    )
}

export default Previous
