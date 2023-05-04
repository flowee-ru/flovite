import { ComponentPropsWithoutRef } from "react"
import styled from "styled-components"

interface Props extends ComponentPropsWithoutRef<'button'> {
    text: string,
    color?: string
}

function Button(props: Props) {
    return (
        <Wrapper style={{ backgroundColor: props.color || '#8815ff' }} {...props}>
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