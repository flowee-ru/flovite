import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import styled from "styled-components"

import Header from "../components/Header"
import Chat from "../components/streams/Chat"
import Player from "../components/streams/Player"

function Profile() {
	const { username } = useParams()

	return (
		<>
			<Helmet>
				<title>{`${username} - Flowee`}</title>
			</Helmet>
            <Header />
			<Wrapper>
				<StreamWrapper>
					<Player url="http://127.0.0.1:8089/6442905abb05652e3a75cc7f" />
					<InfoWrapper>
						<Name>myst's stream</Name>
						<UserWrapper>
							<Avatar src="https://github.com/mdo.png" alt="mdo" className="unselectable" />
							<UserInfo>
								<Username>myst</Username>
								<Followers>15,4K followers</Followers>
							</UserInfo>
						</UserWrapper>
					</InfoWrapper>
				</StreamWrapper>
				<Chat />
			</Wrapper>
		</>
	)
}

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: start;
	gap: 10px;
	@media screen and (max-width: 950px) {
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
const Followers = styled.span`
    color: #aeaeae;
    font-size: 16px;
`

export default Profile