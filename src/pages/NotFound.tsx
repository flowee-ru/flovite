import { useEffect } from "react"
import styled from "styled-components"

import Header from "../components/Header"

function Home() {
	useEffect(() => {
		document.title = `404 - Flowee`
	}, [])

	return (
		<>
			<Header />
			<Wrapper>
				<span style={{ fontSize: '40px', fontWeight: '800' }}>404</span>
                <span style={{ fontSize: '20px', fontWeight: '600' }}>This page not found</span>
			</Wrapper>
		</>
	)
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
    align-items: center;
    color: white;
`

export default Home