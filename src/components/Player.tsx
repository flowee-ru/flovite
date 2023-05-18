import mpegjs from "mpegts.js"
import { useEffect } from "react"
import styled from "styled-components"

type Props = {
    url: string
}

function Player({ url }: Props) {
    useEffect(() => {
        if(mpegjs.getFeatureList().mseLivePlayback) {
            const video = document.getElementById('video') as HTMLVideoElement
            const player = mpegjs.createPlayer({
                type: 'flv',
                isLive: true,
                hasAudio: true,
                hasVideo: true,
                url
            }, {
                enableStashBuffer: true
            })
            player.attachMediaElement(video)
            player.load()
        }
    }, [])

    return <Video id="video" controls />
}

const Video = styled.video`
    max-width: 1200px;
    width: 100%;
`

export default Player