import styled from "styled-components"

import Button from "./Button"

const Header = styled.header`
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 200px;
    padding-right: 200px;
    display: flex;
    justify-content: space-between;
`

const ProfileWrapper = styled.div`
    display: flex;
    gap: 5px;
`

function Home() {
	return (
		<Header>
            <img src="/content/flowee.svg" alt="Flowee" width="55" />
            <ProfileWrapper>
                <Button text="Register" />
                <Button text="Login" />
            </ProfileWrapper>
        </Header>
	)
}

export default Home