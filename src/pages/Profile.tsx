import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import styled from "styled-components"

import Header from "../components/Header"
import Chat from "../components/Chat"
import Player from "../components/Player"

const StreamWrapper = styled.div`
	display: flex;
	justify-content: center;
	gap: 10px;
	@media screen and (max-width: 1700px) {
		flex-direction: column;
	}
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
		</>
	)
}

export default Profile