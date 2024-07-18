import { CallControls, CallParticipantsList, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList } from 'lucide-react'


const MeetingRoom = () => {


    type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

    const [layout, setLayout] = useState('speaker-left')

    const [showParticipants, setShowParticipants] = useState(false)



    const CallLayout = () => {

        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition="left" />
            case 'speaker-left':
                return <SpeakerLayout participantsBarPosition='right' />
        }
    }


    return (
        <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
            <div className="relative flex size-full items-center justify-center">
                <div className="relative flex size-full items-center max-w-[1000px]">
                    <CallLayout />
                </div>

                <div className={cn('h-[calc(100vh-86px)] hidden ml-2', {
                    'show-block': showParticipants,
                })}>

                    <CallParticipantsList onClose={() => setShowParticipants(false)} />

                </div>

            </div>


            <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
                <CallControls />

                <DropdownMenu>
                    <div className="flex items-center">

                        <DropdownMenuTrigger className=" cursor-pointer text-white round-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]"> <LayoutList size={20} className="text-white" /></DropdownMenuTrigger>
                    </div>

                    <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {
                            ['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
                                <div key={index}>
                                    <DropdownMenuItem className="cursor-pointer" onClick={() => {
                                        setLayout(item.toLowerCase() as CallLayoutType)
                                    }} >
                                        {item}
                                        <DropdownMenuSeparator className="border-dark-1" />
                                    </DropdownMenuItem>
                                </div>
                            ))
                        }
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>



        </section>
    )
}

export default MeetingRoom
