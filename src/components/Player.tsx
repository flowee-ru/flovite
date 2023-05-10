import flvjs from "flv.js"
import { useEffect } from "react"
import styled from "styled-components"

type Props = {
    url: string
}

function Player({ url }: Props) {
    useEffect(() => {
        if(flvjs.isSupported()) {
            const video = document.getElementById('video') as HTMLVideoElement
            const player = flvjs.createPlayer({
                type: 'flv',
                isLive: true,
                url
            }, {
                enableStashBuffer: true
            })
            player.attachMediaElement(video)
            player.load()
        }
    }, [url])

    return <Video id="video" controls />
}

const Video = styled.video`
    max-width: 1200px;
    width: 100%;
`

export default Player