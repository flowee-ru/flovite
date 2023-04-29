import styled from "styled-components"

type Props = {
    username: string,
    content: string
}

function ChatMessage({ username, content }: Props) {
    return (
        <Wrapper>
            <Avatar src="https://github.com/mdo.png" alt="mdo" width="45" className="unselectable" />
            <MessageWrapper>
                <Username>{username}</Username>
                <Message>{content}</Message>
            </MessageWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    gap: 10px;
`

const Avatar = styled.img`
    max-width: 45px;
    max-height: 45px;
    min-width: 45px;
    min-height: 45px;
    border-radius: 100%;
    margin-top: 3px;
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
`

export default ChatMessage