'use client'

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useState, useEffect } from 'react'
import { Button } from './button'



const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) => {
    const [isMicCamToggledOn, setIsMicCamToggledon] = useState(false)




    const call = useCall()

    if (!call) {
        throw new Error('use call must be used within streamcall component')
    }


    useEffect(() => {

        if (isMicCamToggledOn) {
            call?.microphone.disable()
            call?.camera.disable()
        }

        else {
            call?.camera.enable()
            call?.microphone.enable()
        }

    }, [isMicCamToggledOn, call?.camera, call?.microphone])


    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">

            <h1 className="text-2xl font-bold">Setup</h1>

            <VideoPreview className="my-call-preview-class" />
            <div className="flex h-16 items-center  justify-center gap-3">
                <label className="flex items-center justify-center gap-2 font-medium">
                    <input
                        type="checkbox"
                        checked={isMicCamToggledOn}
                        onChange={(e) => setIsMicCamToggledon(e.target.checked)} />


                    Join with mic and camera off

                </label>

                <DeviceSettings />

            </div>


            <Button onClick={() => {
                call.join()
                setIsSetupComplete(true)
            }} className="rounded-md bg-green-500 px-4 py-2.5">
                Join Meeting
            </Button>
        </div>
    )
}

export default MeetingSetup
