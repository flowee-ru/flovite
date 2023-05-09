import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"

import Button from "../components/ui/Button"
import Header from "../components/Header"
import Input from "../components/ui/Input"
import Loader from "../components/Loader"

type Settings = {
    streamToken?: string,
    streamName?: string
}

function Settings() {
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState<string>()
    const [settings, setSettings] = useState<Settings>()
    const [newSettings, setNewSettings] = useState<Settings>()

    const [streamNameMessage, setStreamNameMessage] = useState<string>()

    const navigate = useNavigate()
    const [cookie,, removeCookie] = useCookies(['token'])

    useEffect(() => {
        document.title = 'User Settings - Flowee'

        if(cookie.token) {
            axios.get(`${import.meta.env.VITE_API_HOST}/settings?token=${cookie.token}`)
            .then(res => {
                if(res.data.success) {
                    setLoading(false)
                    setSettings(res.data.settings)
                } else {
                    setMessage('Failed to fetch data, please try again')
                }
            })
            .catch(err => {
                console.log(err)
                setMessage('Failed to fetch data, please try again')
            })
        } else {
            navigate('/')
        }
    }, [])

    const logOut = () => {
        removeCookie('token')
        navigate('/')
    }

    const copyToken = () => {
        if(settings?.streamToken) navigator.clipboard.writeText(settings.streamToken)
    }

    const updateStreamName = () => {
        if(!newSettings?.streamName) return

        const data = new URLSearchParams()
        data.append('token', cookie.token)
        data.append('streamName', newSettings.streamName)

        axios.post(`${import.meta.env.VITE_API_HOST}/settings`, data)
        .then(res => {
            console.log(res.data)
            if(res.data.success) {
                setStreamNameMessage('Success!')
            } else {
                switch(res.data.errorCode) {
                    case 1:
                        setStreamNameMessage('Invalid stream name')
                        break
                    
                    default:
                        setStreamNameMessage('Failed to change stream name, please try again')
                }
            }
        })
        .catch(err => {
            console.log(err)
            setStreamNameMessage('Failed to change stream name, please try again')
        })
    }

    return (
        <>
            <Header />
            {loading ? (
                <LoaderWrapper>
                    <Loader />
                    <span>{message}</span>
                </LoaderWrapper>
            ) : (
                <Wrapper>
                    <SectionWrapper>
                        <span style={{ fontSize: '30px', fontWeight: '600' }}>Stream</span>
                        <span>Set this stream token and RTMP server in your streaming software settings</span>
                        <b>RTMP server:</b>
                        <div style={{ display: 'flex' }}>
                            <DataField>rtmp://rtmp.flowee.ru</DataField>
                            <Button text="Copy" onClick={() => { navigator.clipboard.writeText('rtmp://rtmp.flowee.ru') }} />
                        </div>
                        <b>Stream Token:</b>
                        <div style={{ display: 'flex' }}>
                            <DataField>{settings?.streamToken}</DataField>
                            <Button text="Copy" onClick={copyToken} />
                        </div>
                        <b>Don't share this token to anyone! Anyone with this token can do streams as you!</b>
                    </SectionWrapper>
                    <SectionWrapper>
                        <span style={{ fontSize: '30px', fontWeight: '600' }}>Stream Settings</span>
                        <span>Stream Name:</span>
                        <div>
                            <Input defaultValue={settings?.streamName} onChange={(e) => { setNewSettings({ ...newSettings, streamName: e.target.value }) }} />
                            <Button text="Update" onClick={updateStreamName} />
                        </div>
                        <span>{streamNameMessage}</span>
                    </SectionWrapper>
                    <SectionWrapper>
                        <span style={{ fontSize: '30px', fontWeight: '600', color: '#ff4545' }}>Danger zone</span>
                        <div>
                            <Button text="Log out" color="#ff4545" onClick={logOut} />
                        </div>
                    </SectionWrapper>
                </Wrapper>
            )}
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 400px;
    margin-top: 30px;
    color: white;
    gap: 50px;
    padding-right: 30px;
    @media screen and (max-width: 1200px) {
        margin-left: 100px;
        margin-top: 10px;
    }
    @media screen and (max-width: 700px) {
        margin-left: 30px;
    }
`
const SectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const LoaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    margin-top: 20px;
    color: white;
`

const DataField = styled.div`
    padding: 5px;
    background-color: #333333;
    width: fit-content;
    word-break: break-all;
    user-select: all;
`

export default Settings