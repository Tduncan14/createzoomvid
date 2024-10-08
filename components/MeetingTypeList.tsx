'use client'
import { useState } from 'react'
import Image from 'next/image'
import Homecard from './Homecard'
import { useRouter } from 'next/navigation';
import Meetingmodal from './Meetingmodal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from './ui/use-toast';
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker'
import { Input } from './ui/input';

const MeetingTypeList = () => {

    const router = useRouter()
    const [meetingState, setmeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    })
    const { toast } = useToast()
    const [callDetails, setCallDetails] = useState<Call>()
    const { user } = useUser()
    const client = useStreamVideoClient()


    const createMeeting = async () => {

        if (!client || !user) return

        try {

            if (!values.dateTime) {
                toast({ title: 'Please select a date and time' })
                return
            }
            const id = crypto.randomUUID();

            const call = client.call('default', id)

            if (!call) throw new Error('failed to create call')


            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
            const description = values.description || 'Instant meeting';

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }

            })


            setCallDetails(call)

            if (!values.description) {
                router.push(`/meeting/${call.id}`)

            }

            toast({ title: "Meeting created" })

        }

        catch (error) {
            console.log(error)
            toast({
                title: 'Failed to create Meeting'
            })
        }

    }


    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <Homecard
                img="/icons/add-meeting.svg"
                title="New Meeting"
                description="Start an instant meeting"
                handleClick={() => setmeetingState('isInstantMeeting')}
                className='bg-orange-1' />

            <Homecard
                img="/icons/schedule.svg"
                title="Schedule Meeting"
                description="Plan your meeting"
                handleClick={() => setmeetingState('isScheduleMeeting')}
                className='bg-blue-1' />

            <Homecard
                img="/icons/recordings.svg"
                title="View Recordings"
                description="Check out your recordings"
                handleClick={() => router.push('/recordings')}
                className='bg-purple-1 ' />


            <Homecard
                img="/icons/join-meeting.svg"
                title="Join Meeting"
                description="via invitation link"
                handleClick={() => setmeetingState('isJoiningMeeting')}
                className="bg-yellow-1" />


            {
                !callDetails ? (
                    <Meetingmodal isOpen={meetingState === 'isScheduleMeeting'}
                        onClose={() => setmeetingState(undefined)}
                        title='Create Meeting'
                        className="text-center"
                        handleClick={createMeeting}>
                        <div className="flex flex-col gap-2.5">
                            <label className="test-base text-normal leading-[22px] text-sky-2">Add a description</label>
                            <Textarea className="border-none  bg-dark-2 focus-visible:ring-0  focus-visible-ring-offset-0"
                                onChange={(e) => {
                                    setValues({ ...values, description: e.target.value })
                                }}
                            />

                        </div>

                        <div className="flex w-full flex-col gap-2.5">
                            <label className="text-base text-normal leading-[22px] text-sky-2">
                                Select Date and Time
                            </label>

                            <ReactDatePicker
                                selected={values.dateTime}
                                onChange={(date) => setValues({ ...values, dateTime: date! })}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption='="time'
                                className="w-full rounded bg-dark-2 p-2 focus:outline-none" />

                        </div>
                    </Meetingmodal>

                ) : (
                    <Meetingmodal isOpen={meetingState === 'isScheduleMeeting'}
                        onClose={() => setmeetingState(undefined)}
                        title='Meeting Created'
                        className="text-center"
                        handleClick={() => {
                            navigator.clipboard.writeText(meetingLink);
                            toast({ title: `Linked copied` })
                        }}
                        image="/icons/checked.svg"
                        buttonIcon="/icons/copy.svg"
                        buttonText="Copy Meeting Link" >

                    </Meetingmodal>
                )
            }

            <Meetingmodal isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setmeetingState(undefined)}
                title='Start an instant meeting'
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting} />


            <Meetingmodal isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setmeetingState(undefined)}
                title='Start an instant meeting'
                className="text-center"
                buttonText="Join Meeting"
                handleClick={() => router.push(values.link)}>


                <Input
                    placeholder="MeetingLink"
                    className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                    onChange={(e) => setValues({ ...values, link: e.target.value })} />


            </Meetingmodal>


        </section>
    )
}

export default MeetingTypeList
