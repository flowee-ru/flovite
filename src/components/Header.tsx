import styled from "styled-components"
import { useState } from "react"
import { Link, Form } from "react-router-dom"
import HCaptcha from "@hcaptcha/react-hcaptcha"

import Button from "./ui/Button"
import Input from "./ui/Input"

function Header() {
    const [registerOpened, setRegisterOpened] = useState(false)
    const [loginOpened, setLoginOpened] = useState(false)

    document.onclick = (e) => {
        const el = e.target as HTMLElement
        if(!el.closest('#register-button') && !el.closest('#register-popup') && !el.closest('#login-button') && !el.closest('#login-popup')) {
            setRegisterOpened(false)
            setLoginOpened(false)
        }
    }

    const changeRegister = () => {
        setRegisterOpened(true)
        setLoginOpened(false)
    }
    const changeLogin = () => {
        setLoginOpened(true)
        setRegisterOpened(false)
    }

	return (
		<Wrapper>
            <Link to="/"><img src="/content/flowee.svg" alt="Flowee" width="55" className="unselectable" /></Link>
            <Form action="/search" method="GET" style={{ maxWidth: '500px', width: '100%', display: 'flex' }}>
                <Input placeholder="Search users..." name="q" style={{ width: '100%' }} />
            </Form>
            <ProfileWrapper>
                <Button id="register-button" text="Register" onClick={changeRegister} />
                {registerOpened && (
                    <RegisterPopup id="register-popup">
                        <RegisterCaption><span className="wave">👋</span> Hello!</RegisterCaption>
                        <RegisterSubCaption>Create an account</RegisterSubCaption>
                        <RegisterForm>
                            <Input placeholder="Username" />
                            <Input placeholder="E-mail" type="email" />
                            <Input placeholder="Password" type="password" />
                            <HCaptcha
                                sitekey={import.meta.env.VITE_HCAPTCHA_SITEKEY ? import.meta.env.VITE_HCAPTCHA_SITEKEY : "10000000-ffff-ffff-ffff-000000000001"}
                                theme="dark"
                            />
                            <Button text="Register" />
                        </RegisterForm>
                    </RegisterPopup>
                )}
                <Button id="login-button" text="Login" onClick={changeLogin} />
                {loginOpened && (
                    <RegisterPopup id="login-popup">
                        <RegisterCaption><span className="wave">👋</span> Welcome back!</RegisterCaption>
                        <RegisterSubCaption>Sign into Flowee</RegisterSubCaption>
                        <RegisterForm>
                            <Input placeholder="Username" />
                            <Input placeholder="Password" type="password" />
                            <Button text="Login" />
                        </RegisterForm>
                    </RegisterPopup>
                )}
            </ProfileWrapper>
        </Wrapper>
	)
}

const Wrapper = styled.header`
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

const RegisterPopup = styled.div`
    position: absolute;
    right: 100px;
    z-index: 20;
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    background-color: #1e1e1f;
    padding-left: 20px;
    padding-right: 20px;
    max-width: 300px;
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    border: 1px solid #464647;
    @media screen and (max-width: 850px) {
        right: 50%;
        transform: translate(50%, 0%);
    }
`
const RegisterCaption = styled.span`
    font-size: 20px;
    color: white;
    font-weight: 600;
`
const RegisterSubCaption = styled.span`
    color: white;
    font-weight: 600;
`

const RegisterForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 15px;
`

export default Header