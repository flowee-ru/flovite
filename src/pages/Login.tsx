import styled from "styled-components"
import { useEffect } from "react"

import Header from "../components/Header"

function Profile() {
    useEffect(() => {
		document.title = `Login - Flowee`
	})

	return (
		<>
            <Header />
			<Center>
                <Wrapper>
                    <Caption><span className="wave">👋</span> Welcome back!</Caption>
                    <SubCaption>Sign into Flowee</SubCaption>
                    
                </Wrapper>
			</Center>
		</>
	)
}

const Center = styled.div`
	display: flex;
    justify-content: center;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    background-color: #313033;
    padding-left: 20px;
    padding-right: 20px;
    max-width: 300px;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
`
const Caption = styled.span`
    font-size: 20px;
    color: white;
    font-weight: 600;
`
const SubCaption = styled.span`
    color: white;
    font-weight: 600;
`

export default Profile