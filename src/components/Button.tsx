import styled from "styled-components"

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
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`

type Props = {
    text: string
}

function Button(props: Props) {
    return (
        <Wrapper>
            {props.text}
        </Wrapper>
    )
}

export default Button