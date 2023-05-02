import { KeyboardEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import useWebSocket from "react-use-websocket"
import axios from "axios"

import Header from "../components/Header"
import Player from "../components/streams/Player"
import Input from "../components/ui/Input"
import ChatMessage from "../components/streams/ChatMessage"
import Loader from "../components/Loader"
import Avatar from "../components/Avatar"
import { useCookies } from "react-cookie"

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

function b64DecodeUnicode(str: string) {
	return decodeURIComponent(atob(str).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
	}).join(''))
}

function Profile() {
	const { username } = useParams()
	const [messageHistory, setMessageHistory] = useState<Message[]>([])

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string>()

	const [info, setInfo] = useState<AccountInfo>()

	const [cookie] = useCookies(['token'])

	useEffect(() => {
		document.title = `Flowee`

		axios.get(import.meta.env.VITE_API_HOST + '/users/getInfo?username=' + username)
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const { lastMessage } = useWebSocket(import.meta.env.VITE_EVENTS_HOST + '?stream=' + info?.accountID, {
		onOpen: (e) => {
			console.log(e)
		},
		onClose: (e) => {
			console.log(e)
		},
		onError: (err) => {
			console.log(err)
		}
	})

	useEffect(() => {
		if(lastMessage) {
			const messagesBox = document.getElementById('messages-box') as HTMLDivElement

			setMessageHistory(old => {
				const parts = (lastMessage.data as string).split('|')
				return old.concat({
					timestamp: Number(parts[0]),
					author: b64DecodeUnicode(parts[1]),
					avatar: parts[2],
					content: b64DecodeUnicode(parts[3])
				})
			})

			if(Math.abs(messagesBox.scrollHeight - messagesBox.scrollTop - messagesBox.clientHeight) < 1) {
				setTimeout(() => { messagesBox.scrollTo(0, messagesBox.scrollHeight) }, 100)
			}
		}
	}, [lastMessage])

	const sendMessage = (e: KeyboardEvent<HTMLInputElement>) => {
		if(e.code != 'Enter') return

		if(!info?.accountID) return

		const content = (document.getElementById('message-input') as HTMLInputElement).value

		const data = new URLSearchParams()
		data.append('stream', info?.accountID)
		data.append('token', cookie.token)
		data.append('content', content)

		axios.post(import.meta.env.VITE_API_HOST + '/chat/sendMessage', data)
		.then(res => {
			console.log(res.data)
		})
		.catch(err => {
			console.log(err)
		})
	}

	return (
		<>
            <Header />
			{loading ? (
				<LoaderWrapper>
					<Loader />
					<Error>{error}</Error>
				</LoaderWrapper>
			) : (
			<Wrapper>
				<StreamWrapper>
					{info?.isLive ? <Player url={info.streamURL} /> : (
						<NoStreamWrapper>
							<NoStream>USER IS OFFLINE</NoStream>
						</NoStreamWrapper>
					)}
					<InfoWrapper>
						<Name>{info?.streamName}</Name>
						<UserWrapper>
							<Avatar avatar={info?.avatar} username={info?.username} />
							<UserInfo>
								<Username>{info?.username}</Username>
								{/* <Followers>15,4K followers</Followers> */}
							</UserInfo>
						</UserWrapper>
					</InfoWrapper>
				</StreamWrapper>
				<ChatWrapper>
					<ChatTitle>CHAT</ChatTitle>
					<MessagesBox className="no-scrollbar" id="messages-box">
						{messageHistory.map((msg, i) => {
							return <ChatMessage username={msg.author} content={msg.content} timestamp={msg.timestamp} key={i} avatar={msg.avatar} />
						})}
					</MessagesBox>
					<Input placeholder="Type your message" style={{ marginLeft: '10px', marginRight: '10px' }} onKeyDown={sendMessage} id="message-input" />
				</ChatWrapper>
			</Wrapper>
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

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: start;
	gap: 10px;
	margin-top: 20px;
	padding-left: 20px;
	padding-right: 20px;
	@media screen and (max-width: 950px) {
		padding-left: 0px;
		padding-right: 0px;
		flex-direction: column;
	}
`

const StreamWrapper = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 1200px;
	width: 100%;
	gap: 10px;
`

const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding-left: 10px;
	padding-right: 10px;
`

const Name = styled.span`
	font-size: 22px;
	font-weight: 600;
	color: white;
`

const UserWrapper = styled.div`
	display: flex;
	gap: 10px;
`
const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`

const Username = styled.span`
    color: white;
    font-size: 18px;
    font-weight: 600;
`
// const Followers = styled.span`
//     color: #aeaeae;
//     font-size: 16px;
// `

const ChatWrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    max-width: 400px;
    min-width: 400px;
    height: 650px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #222222;
    @media screen and (max-width: 950px) {
        min-width: 100%;
    }
`

const ChatTitle = styled.span`
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    color: white;
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

const NoStreamWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
    max-width: 1200px;
	height: 400px;
    width: 100%;
	background-color: #222222;
`
const NoStream = styled.span`
	color: white;
	font-weight: 700;
	font-size: 25px;
`

export default Profile