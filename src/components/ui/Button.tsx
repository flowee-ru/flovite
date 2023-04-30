import styled from "styled-components"

type Props = {
    text: string,
    style?: React.CSSProperties,
    id?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function Button(props: Props) {
    return (
        <Wrapper style={props.style} onClick={props.onClick} id={props.id}>
            {props.text}
        </Wrapper>
    )
}

const Wrapper = styled.button`
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    color: white;
    background-color: #8815ff;
    border: none;
    font-weight: bold;
    font-size: 16px;
    transition: opacity 0.2s;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`

export default Button