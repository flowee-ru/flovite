import { useEffect } from "react"

function Home() {
	useEffect(() => {
		document.title = `Flowee`
	}, [])

	return (
		<>
			<span>hello vite</span>
		</>
	)
}

export default Home