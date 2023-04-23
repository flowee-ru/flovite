import { Helmet } from "react-helmet"
import { ReactFlvPlayer } from "@asurraa/react-ts-flv-player"

import Header from "../components/Header"

function Profile() {
	return (
		<>
			<Helmet>
				<title>Flowee</title>
			</Helmet>
            <Header />
			<ReactFlvPlayer
                url="http://127.0.0.1:8089/6442905abb05652e3a75cc7f"
                isMuted={false}
                showControls
                isLive
            />
		</>
	)
}

export default Profile