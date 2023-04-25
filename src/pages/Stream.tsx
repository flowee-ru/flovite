import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import styled from "styled-components"

import Header from "../components/Header"
import Chat from "../components/Chat"
import Player from "../components/Player"

const StreamWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: start;
	gap: 10px;
	@media screen and (max-width: 950px) {
		flex-direction: column;
	}
`

const ProfileWrapper = styled.div`
	display: flex;
	gap: 10px;
	background-color: gray;
	margin-left: 100px;
`
const Avatar = styled.img`
	max-width: 50px;
	max-height: 50px;
	min-width: 50px;
	min-height: 50px;
	border-radius: 100%;
`

function Profile() {
	const { username } = useParams()

	return (
		<>
			<Helmet>
				<title>{`${username} - Flowee`}</title>
			</Helmet>
            <Header />
			<StreamWrapper>
				<Player url="http://127.0.0.1:8089/6442905abb05652e3a75cc7f" />
				<Chat />
			</StreamWrapper>
			<ProfileWrapper>
				<Avatar src="https://github.com/mdo.png" alt="mdo" />
			</ProfileWrapper>
		</>
	)
}

export default Profile