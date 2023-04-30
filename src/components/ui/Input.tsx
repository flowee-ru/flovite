import { ChangeEventHandler } from "react"
import styled from "styled-components"

type Props = {
    type?: string,
    placeholder?: string,
    name?: string,
    style?: React.CSSProperties,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    required?: boolean
}

function Input(props: Props) {
    return (
        <Field type={props.type || 'text'} placeholder={props.placeholder} name={props.name} style={props.style} onChange={props.onChange} required={props.required} />
    )
}

const Field = styled.input`
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    color: white;
    background-color: #333333;
    border: none;
    outline: none;
    font-size: 18px;
    transition: outline 0.1s;
    caret-color: #8815ff;
    outline-color: #8815ff;
    &:focus {
        outline: #8815ff solid 3px;
    }
    &:not(:focus) {
        outline: #8815ff solid 0px;
    }
`

export default Input