import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useSearchParams, useNavigate } from "react-router-dom"
import styled from "styled-components"

function VerifyAccount() {
    const [status, setStatus] = useState('Please wait...')
    const [searchParams] = useSearchParams()
    const [, setCookie] = useCookies(['token'])
    const navigate = useNavigate()

    useEffect(() => {
        const token = searchParams.get('token')
        
        if(!token) {
            setStatus('No token provided')
            return
        }

        const data = new URLSearchParams()
        data.append('verifyToken', token)

        axios.post(import.meta.env.VITE_API_HOST + '/auth/verifyAccount', data)
        .then(res => {
            console.log(res.data)
            if(res.data.success) {
                const now = new Date()
                setCookie('token', res.data.token, { expires: new Date(now.setMonth(now.getMonth() + 1)) })
                
                navigate('/')
            } else {
                setStatus('Failed to activate')
            }
        })
        .catch(err => {
            console.log(err)
            setStatus('Unexpected error, please try again')
        })
    }, [navigate, searchParams])

    return (
        <>
            <Text>{status}</Text>
        </>
    )
}

const Text = styled.div`
    color: white;
    margin: 10px;
`

export default VerifyAccount