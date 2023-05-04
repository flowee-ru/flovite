import { useEffect } from "react"
import styled from "styled-components"

import Header from "../components/Header"
import Button from "../components/ui/Button"

function Home() {
	useEffect(() => {
		document.title = `Flowee - Home`
	}, [])

	return (
		<>
			<Header />
			<Wrapper>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<span style={{ fontSize: '40px', fontWeight: '800' }}>Welcome!</span>
					<span style={{ fontSize: '25px', fontWeight: '700' }}>Flowee is a streaming platform built for people</span>
					<div style={{ display: 'flex', marginTop: '10px', gap: '5px' }}>
						<a href="https://github.com/flowee-ru"><Button text="GitHub" color="#333" /></a>
					</div>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
					<span style={{ fontSize: '20px', fontWeight: '700' }}><i className="bi bi-broadcast" /> LIVE</span>
					<div style={{ display: 'flex', flexWrap: 'wrap' }}>
						{/* <UserCard streamName="test" avatar="default" username="myst" /> */}
					</div>
				</div>
			</Wrapper>
		</>
	)
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	color: white;
	margin-left: 200px;
	margin-top: 30px;
	padding-left: 20px;
	padding-right: 20px;
	gap: 50px;
	@media screen and (max-width: 850px) {
		margin-left: 0px;
	}
`

export default Home