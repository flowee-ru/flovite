import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"

import ChatMessage from "../../components/ChatMessage"
import Loader from "../../components/Loader"

type Message = {
	timestamp: number,
	author: string,
	content: string,
	avatar: string
}

type AccountInfo = {
	success: boolean,
	accountID: string,
	username: string,
	avatar: string,
	followers: number,
	isLive: boolean,
	streamName: string,
	streamURL: string,
	isFollowing: boolean
}

function decodeUnicode(str: string) {
	return decodeURIComponent(atob(str).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
	}).join(''))
}

function ChatWidget() {
	const { username } = useParams()
	const [messageHistory, setMessageHistory] = useState<Message[]>([])

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string>()

	const [info, setInfo] = useState<AccountInfo>()

	useEffect(() => {
		document.title = `Chat Widget`

		axios.get(`${import.meta.env.VITE_API_HOST}/users/username/${username}`)
		.then(res => {
			console.log(res.data)
			if(res.data.success) {
				setLoading(false)
				document.title = `${username} - Flowee`
				setInfo(res.data)
			} else {
				setError('Failed to fetch info, please try again')
			}
		})
		.catch(err => {
			console.log(err)
			setError('Failed to fetch info, please try again')
		})
	}, [username])

	useEffect(() => {
		if(info?.accountID) {
			const ws = new WebSocket(`${import.meta.env.VITE_EVENTS_HOST}/users/${info?.accountID}/ws`)
			let i: number

			ws.onopen = (e) => {
				console.log('Websocket connection established')
				console.log(e)

				// ping websocket every 30 seconds
				i = setInterval(() => {
					ws.send('ping')
				}, 30000)
			}
			ws.onclose = (e) => {
				console.log('Websocket connection closed')
				console.log(e)
			}
			ws.onerror = (err) => {
				console.log(err)
			}

			ws.onmessage = (msg) => {
				if(msg.data == 'pong') {
					console.log('Websocket pinged')
					return
				}

				console.log(msg)

				setMessageHistory(old => {
					const parts = (msg.data as string).split('|')
					return old.concat({
						timestamp: Number(parts[0]),
						author: decodeUnicode(parts[1]),
						avatar: parts[2],
						content: decodeUnicode(parts[3])
					})
				})

				const messagesBox = document.getElementById('messages-box') as HTMLDivElement

				if(Math.abs(messagesBox.scrollHeight - messagesBox.scrollTop - messagesBox.clientHeight) < 1) {
					setTimeout(() => { messagesBox.scrollTo(0, messagesBox.scrollHeight) }, 100)
				}
			}

			return () => {
				ws.close()
				if(i) clearInterval(i)
			}
		}
	}, [info?.accountID])

	return (
		<>
			{loading ? (
				<LoaderWrapper>
					<Loader />
					<Error>{error}</Error>
				</LoaderWrapper>
			) : (
                <ChatWrapper>
                    <MessagesBox className="no-scrollbar" id="messages-box">
                        {messageHistory.map((msg, i) => {
                            return <ChatMessage username={msg.author} content={msg.content} timestamp={msg.timestamp} key={i} avatar={msg.avatar} />
                        })}
                    </MessagesBox>
                </ChatWrapper>
			)}
		</>
	)
}

const LoaderWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;
	gap: 10px;
`
const Error = styled.span`
	color: white;
	font-size: 20px;
`

const ChatWrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    max-width: 300px;
    min-width: 300px;
    height: 400px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: transparent;
    @media screen and (max-width: 950px) {
        min-width: 100%;
    }
`

const MessagesBox = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    height: 100%;
    padding-left: 10px;
    padding-right: 10px;
    overflow-y: auto;
	padding-bottom: 10px;
`

export default ChatWidget