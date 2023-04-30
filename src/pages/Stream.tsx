import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import useWebSocket from "react-use-websocket"

import Header from "../components/Header"
import Player from "../components/streams/Player"
import Input from "../components/ui/Input"
import ChatMessage from "../components/streams/ChatMessage"

type Message = {
	timestamp: number,
	author: string,
	content: string
}

function Profile() {
	const { username } = useParams()
	const [messageHistory, setMessageHistory] = useState<Message[]>([])

	const { lastMessage } = useWebSocket('ws://127.0.0.1:8081/ws?stream=6442905abb05652e3a75cc7f', {
		onOpen: () => {
			console.log('Websocket connection established')
		},
		onClose: () => {
			console.log('Websocket connection closed')
		}
	})

	useEffect(() => {
		document.title = `${username} - Flowee`
	})

	useEffect(() => {
		if(lastMessage) {
			setMessageHistory(old => {
				const parts = (lastMessage.data as string).split('|')
				return old.concat({
					timestamp: Number(parts[0]),
					author: atob(parts[1]),
					content: atob(parts[2])
				})
			})
		}
	}, [lastMessage])

	return (
		<>
            <Header />
			<Wrapper>
				<StreamWrapper>
					<Player url="http://127.0.0.1:8082/6442905abb05652e3a75cc7f" />
					<InfoWrapper>
						<Name>myst's stream</Name>
						<UserWrapper>
							<Avatar src="https://github.com/mdo.png" alt="mdo" className="unselectable" />
							<UserInfo>
								<Username>myst</Username>
								{/* <Followers>15,4K followers</Followers> */}
							</UserInfo>
						</UserWrapper>
					</InfoWrapper>
				</StreamWrapper>
				<ChatWrapper>
					<ChatTitle>CHAT</ChatTitle>
					<MessagesBox className="no-scrollbar" id="messages-box">
						{messageHistory.map(msg => {
							return <ChatMessage username={msg.author} content={msg.content} />
						})}
					</MessagesBox>
					<Input placeholder="Type your message" style={{ marginLeft: '10px', marginRight: '10px' }} />
				</ChatWrapper>
			</Wrapper>
		</>
	)
}

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
const Avatar = styled.img`
	max-width: 50px;
	max-height: 50px;
	min-width: 50px;
	min-height: 50px;
	border-radius: 100%;
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
`

export default Profile