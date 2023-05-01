import styled from "styled-components"

import Avatar from "../Avatar"

type Props = {
    username: string,
    timestamp: number,
    avatar: string,
    content: string
}

function ChatMessage(props: Props) {
    return (
        <Wrapper>
            <Avatar avatar={props.avatar} username={props.username} />
            <MessageWrapper>
                <Username>{props.username}</Username>
                <Message>{props.content}</Message>
            </MessageWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    gap: 10px;
`

const MessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const Username = styled.span`
    color: white;
    font-size: 18px;
    font-weight: 600;
`
const Message = styled.span`
    color: white;
    word-break: break-all;
`

export default ChatMessage