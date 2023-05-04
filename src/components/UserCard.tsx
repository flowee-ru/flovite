import styled from "styled-components"
import Avatar from "./Avatar"

type Props = {
    streamName: string,
    username: string,
    avatar: string
}

function UserCard(props: Props) {
    return (
        <Wrapper>
            <StreamName>{props.streamName.length > 30 ? props.streamName.slice(0, 30) + '...' : props.streamName}</StreamName>
            <UserWrapper>
                <Avatar avatar={props.avatar} username={props.username} />
                <UserInfo>
                    <Username>{props.username}</Username>
                    {/* <Followers>15,4K followers</Followers> */}
                </UserInfo>
            </UserWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: #333;
`

const StreamName = styled.span`
    font-size: 18px;
    font-weight: 700;
    display: flex;
    justify-content: center;
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

export default UserCard