import styled from "styled-components"

type Props = {
    avatar?: string,
    username?: string
}

function Avatar(props: Props) {
    // TODO improve this
    if(props.avatar == 'default') {
        return (
            <DefaultAvatar className="unselectable">{props.username?.slice(0, 1).toUpperCase()}</DefaultAvatar>
        )
    } else {
        return (
            <AvatarWrapper src={props.avatar} alt={props.username} className="unselectable" />
        )
    }
}

const AvatarWrapper = styled.img`
	max-width: 45px;
	max-height: 45px;
	min-width: 45px;
	min-height: 45px;
	border-radius: 100%;
`
const DefaultAvatar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
	max-width: 45px;
	max-height: 45px;
	min-width: 45px;
	min-height: 45px;
	border-radius: 100%;
    font-size: 20px;
    font-weight: 800;
    background-color: orange;
    color: white;
`

export default Avatar