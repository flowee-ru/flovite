import styled from "styled-components"

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

type Props = {
    type?: string,
    placeholder?: string,
    name?: string,
    style?: React.CSSProperties
}

function Input({ type = 'text', placeholder, name, style }: Props) {
    return (
        <Field type={type} placeholder={placeholder} name={name} style={style} />
    )
}

export default Input