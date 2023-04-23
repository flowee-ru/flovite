import styled from "styled-components"
import { Link } from "react-router-dom"

import Button from "./Button"

const Header = styled.header`
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 30px;
    padding-right: 30px;
    @media screen and (min-width: 1000px) {
        padding-left: 100px;
        padding-right: 100px;
    }
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
            <Link to="/"><img src="/content/flowee.svg" alt="Flowee" width="55" className="unselectable" /></Link>
            <ProfileWrapper>
                <Link to="/register"><Button text="Register" /></Link>
                <Link to="/login"><Button text="Login" /></Link>
            </ProfileWrapper>
        </Header>
	)
}

export default Home