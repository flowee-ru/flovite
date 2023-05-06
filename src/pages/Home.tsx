import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"

import Header from "../components/Header"
import Button from "../components/ui/Button"
import UserCard from "../components/UserCard"
import Loader from "../components/Loader"

type UserData = {
	username: string,
	avatar: string,
	streamName: string
}

function Home() {
	const [liveLoading, setLiveLoading] = useState(true)
	const [liveMessage, setLiveMessage] = useState<string | null>('No one is streaming right now')
	const [liveData, setLiveData] = useState<UserData[]>()

	useEffect(() => {
		document.title = `Home - Flowee`

		setLiveLoading(true)

		axios.get(`${import.meta.env.VITE_API_HOST}/users`)
		.then(res => {
			console.log(res.data)
			setLiveLoading(false)

			if(res.data.success) {
				if(res.data.users.length > 0) {
					setLiveMessage(null)
					setLiveData(res.data.users)
				}
			} else {
				setLiveMessage('Failed to fetch data, please try again')
			}
		})
		.catch(err => {
			console.log(err)
			setLiveLoading(false)
			setLiveMessage('Failed to fetch data, please try again')
		})
	}, [])

	return (
		<>
			<Header />
			<Wrapper>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<span style={{ fontSize: '40px', fontWeight: '800' }}>Welcome!</span>
					<span style={{ fontSize: '25px', fontWeight: '700' }}>Flowee is a streaming platform built for people</span>
					<div style={{ display: 'flex', marginTop: '10px', gap: '5px' }}>
						<a href="https://github.com/flowee-ru"><Button text="GitHub" color="#333" /></a>
					</div>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
					<span style={{ fontSize: '20px', fontWeight: '700' }}><i className="bi bi-broadcast" /> LIVE</span>
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
						{liveLoading ? <Loader /> : (
							<>
								{liveMessage ? <span>{liveMessage}</span> : (
									liveData?.map((user: UserData, i) => {
										return <UserCard key={i} streamName={user.streamName} avatar={user.avatar} username={user.username} />
									})
								)}
							</>
						)}
					</div>
				</div>
			</Wrapper>
		</>
	)
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	color: white;
	margin-left: 200px;
	margin-top: 30px;
	padding-left: 20px;
	padding-right: 20px;
	gap: 50px;
	@media screen and (max-width: 850px) {
		margin-left: 0px;
	}
`

export default Home