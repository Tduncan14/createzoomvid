'use client'
import { useGetCalls } from '@/hooks/useGetCalls'
import { CallRecording } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {

    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls()

    const [recordings, setRecordings] = useState<CallRecording[]>([])

    const router = useRouter()

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls
            case 'recordings':
                return recordings;
            case 'upcoming':
                return upcomingCalls

        }
    }


    return (
        <div>
            Callist
        </div>
    )
}

export default CallList
