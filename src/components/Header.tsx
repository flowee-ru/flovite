import styled from "styled-components"
import { FormEvent, useEffect, useState } from "react"
import { Link, Form } from "react-router-dom"
import HCaptcha from "@hcaptcha/react-hcaptcha"

import Button from "./ui/Button"
import Input from "./ui/Input"
import axios from "axios"
import { useCookies } from "react-cookie"
import Loader from "./Loader"
import Avatar from "./Avatar"

type RegisterForm = {
    username?: string,
    email?: string,
    password?: string,
    captcha?: string,
    errorMessage?: string,
    successMessage?: string,
    loading: boolean
}
type LoginForm = {
    username?: string,
    password?: string,
    errorMessage?: string,
    loading: boolean
}

type AuthData = {
    username: string,
    avatar: string
}

function Header() {
    const [registerOpened, setRegisterOpened] = useState(false)
    const [loginOpened, setLoginOpened] = useState(false)

    const [registerForm, setRegisterForm] = useState<RegisterForm>({ loading: false })
    const [loginForm, setLoginForm] = useState<LoginForm>({ loading: false })

    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const [authData, setAuthData] = useState<AuthData>()

    const [cookie, setCookie] = useCookies(['token'])

    useEffect(() => {
        document.onclick = (e) => {
            const el = e.target as HTMLElement
            if(!el.closest('#register-button') && !el.closest('#register-popup') && !el.closest('#login-button') && !el.closest('#login-popup')) {
                setRegisterOpened(false)
                setLoginOpened(false)
            }
        }

        const token = cookie.token as string

        if(token) {
            const data = new URLSearchParams()
            data.append('token', token)
    
            axios.post(`${import.meta.env.VITE_API_HOST}/users/verifyToken`, data)
            .then(res => {
                console.log(res.data)
                setLoading(false)

                if(res.data.success) {
                    setAuthenticated(true)
                    setAuthData({
                        username: res.data.username,
                        avatar: res.data.avatar
                    })
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
        } else setLoading(false)
    }, [])

    const changeRegister = () => {
        setRegisterOpened(true)
        setLoginOpened(false)
    }
    const changeLogin = () => {
        setLoginOpened(true)
        setRegisterOpened(false)
    }

    const submitRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!registerForm.username || !registerForm.email || !registerForm.password || !registerForm.captcha) return

        setRegisterForm({ ...registerForm, loading: true })

        const data = new URLSearchParams()
        data.append('username', registerForm.username)
        data.append('email', registerForm.email)
        data.append('password', registerForm.password)
        data.append('captcha', registerForm.captcha)

        axios.post(`${import.meta.env.VITE_API_HOST}/users/register`, data)
        .then(res => {
            console.log(res.data)
            setRegisterForm({ ...registerForm, loading: false })

            if(res.data.success) {
                setRegisterForm({ ...registerForm, successMessage: 'Check your email to verify your account', errorMessage: '' })
            } else {
                switch(res.data.errorCode) {
                    case 1:
                        setRegisterForm({ ...registerForm, errorMessage: 'Username must be > 3 and < 15 symbols', successMessage: '' })
                        break
                    case 2:
                        setRegisterForm({ ...registerForm, errorMessage: 'Bad username, please try another one', successMessage: '' })
                        break
                    case 3:
                        setRegisterForm({ ...registerForm, errorMessage: 'Failed to verify captcha, try again', successMessage: '' })
                        break
                    case 4:
                        setRegisterForm({ ...registerForm, errorMessage: 'Username already taken', successMessage: '' })
                        break
                    case 5:
                        setRegisterForm({ ...registerForm, errorMessage: 'Account with this email already exists', successMessage: '' })
                        break
                    case 6:
                        setRegisterForm({ ...registerForm, errorMessage: 'Unexpected error, please try again', successMessage: '' })
                        break

                    default:
                        setRegisterForm({ ...registerForm, errorMessage: 'Unexpected error, please try again', successMessage: '' })
                }
            }
        }).catch(err => {
            console.log(err)
            setLoginForm({ ...loginForm, errorMessage: 'Failed to fetch data, please try again' })
        })
    }

    const submitLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!loginForm.username || !loginForm.password) return

        setLoginForm({ ...loginForm, loading: true })

        const data = new URLSearchParams()
        data.append('username', loginForm.username)
        data.append('password', loginForm.password)

        axios.post(import.meta.env.VITE_API_HOST + '/users/login', data)
        .then(res => {
            console.log(res.data)
            setLoginForm({ ...loginForm, loading: false })

            if(res.data.success) {
                setLoginForm({ ...loginForm, errorMessage: '' })

                const now = new Date()
                setCookie('token', res.data.token, { expires: new Date(now.setMonth(now.getMonth() + 1)) })

                window.location.reload()
            } else {
                switch(res.data.errorCode) {
                    case 1:
                        setLoginForm({ ...loginForm, errorMessage: 'Wrong password or username' })
                        break

                    default:
                        setLoginForm({ ...loginForm, errorMessage: 'Unexpected error, please try again' })
                }
            }
        }).catch(err => {
            console.log(err)
            setLoginForm({ ...loginForm, errorMessage: 'Failed to fetch data, please try again' })
        })
    }

	return (
		<Wrapper>
            <Link to="/"><img src="/content/flowee.svg" alt="Flowee" width="55" className="unselectable" /></Link>
            <Form action="/search" method="GET" style={{ maxWidth: '500px', width: '100%', display: 'flex' }}>
                <Input placeholder="Search users..." name="q" style={{ width: '100%' }} />
            </Form>
            {loading ? <Loader /> : (
                authenticated ? (
                    <ProfileWrapper style={{ alignItems: 'center' }}>
                        <Link to="/settings"><GearIcon className="bi bi-gear-fill" /></Link>
                        <Link to={`/${authData?.username}`}><Avatar avatar={authData?.avatar} username={authData?.username} /></Link>
                    </ProfileWrapper>
                ) : (
                    <ProfileWrapper>
                        <Button id="register-button" text="Register" onClick={changeRegister} />
                        {registerOpened && (
                            <Popup id="register-popup">
                                <PopupCaption><span className="wave">👋</span> Hello!</PopupCaption>
                                <PopupSubCaption>Create an account</PopupSubCaption>
                                {registerForm.errorMessage && <PopupError>{registerForm.errorMessage}</PopupError>}
                                {registerForm.successMessage && <PopupSuccess>{registerForm.successMessage}</PopupSuccess>}
                                <PopupForm onSubmit={submitRegister}>
                                    <Input placeholder="Username" onChange={(e) => { setRegisterForm({ ...registerForm, username: e.target.value }) }} required />
                                    <Input placeholder="E-mail" type="email" onChange={(e) => { setRegisterForm({ ...registerForm, email: e.target.value }) }} required />
                                    <Input placeholder="Password" type="password" onChange={(e) => { setRegisterForm({ ...registerForm, password: e.target.value }) }} required />
                                    <HCaptcha
                                        sitekey={import.meta.env.VITE_HCAPTCHA_SITEKEY ? import.meta.env.VITE_HCAPTCHA_SITEKEY : "10000000-ffff-ffff-ffff-000000000001"}
                                        theme="dark"
                                        onVerify={(r) => { r && setRegisterForm({ ...registerForm, captcha: r }) }}
                                    />
                                    <Button text="Register" />
                                </PopupForm>
                            </Popup>
                        )}
                        <Button id="login-button" text="Login" onClick={changeLogin} />
                        {loginOpened && (
                            <Popup id="login-popup">
                                <PopupCaption><span className="wave">👋</span> Welcome back!</PopupCaption>
                                <PopupSubCaption>Sign into Flowee</PopupSubCaption>
                                {loginForm.errorMessage && <PopupError>{loginForm.errorMessage}</PopupError>}
                                <PopupForm onSubmit={submitLogin}>
                                    <Input placeholder="Username" onChange={(e) => { setLoginForm({ ...loginForm, username: e.target.value }) }} required />
                                    <Input placeholder="Password" type="password" onChange={(e) => { setLoginForm({ ...loginForm, password: e.target.value }) }} required />
                                    <Button text="Login" />
                                </PopupForm>
                            </Popup>
                        )}
                    </ProfileWrapper>
                )
            )}
        </Wrapper>
	)
}

const GearIcon = styled.i`
    color: white;
    font-size: 25px;
    margin-right: 10px;
    @media screen and (max-width: 850px) {
        margin-right: 0px;
    }
`

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
    gap: 10px;
`

const Popup = styled.div`
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
const PopupCaption = styled.span`
    font-size: 20px;
    color: white;
    font-weight: 600;
`
const PopupSubCaption = styled.span`
    color: white;
    font-weight: 600;
`
const PopupError = styled.span`
    color: #ff5c74;
    margin-top: 10px;
`
const PopupSuccess = styled.span`
    color: #28cc80;
    margin-top: 10px;
`

const PopupForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 10px;
`

export default Header