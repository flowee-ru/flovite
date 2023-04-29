import styled from "styled-components"
import { Link, Form } from "react-router-dom"

import Button from "./ui/Button"
import Input from "./ui/Input"

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 30px;
    padding-right: 30px;
    align-items: center;
    @media screen and (min-width: 1000px) {
        padding-left: 100px;
        padding-right: 100px;
    }
    @media screen and (max-width: 850px) {
        flex-direction: column;
        gap: 10px;
    }
`

const ProfileWrapper = styled.div`
    display: flex;
    gap: 5px;
`

function Home() {
	return (
		<Header>
            <Link to="/"><img src="/content/flowee.svg" alt="Flowee" width="55" className="unselectable" /></Link>
            <Form action="/search" method="GET" style={{ maxWidth: '500px', width: '100%', display: 'flex' }}>
                <Input placeholder="Search users..." name="q" style={{ width: '100%' }} />
            </Form>
            <ProfileWrapper>
                <Link to="/register"><Button text="Register" /></Link>
                <Link to="/login"><Button text="Login" /></Link>
            </ProfileWrapper>
        </Header>
	)
}

export default Home