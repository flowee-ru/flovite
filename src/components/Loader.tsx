import styled from "styled-components"

function Loader() {
    return <Wrapper />
}

const Wrapper = styled.div`
    border: 4px solid #424242;
    border-top: 4px solid white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 2s linear infinite;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`

export default Loader