import { useEffect, useState } from "react";
import io from "socket.io-client";
import { AddBand } from "./components/AddBand";
import { BandList } from "./components/BandList";

const connectSockerServer = () => {
	const socket = io.connect("http://localhost:8080", {
		transports: ["websocket"],
	});

	return socket;
};

function App() {
	const [socket] = useState(connectSockerServer());
	const [online, setOnline] = useState(false);

	useEffect(() => {
		setOnline(socket.connected);
	}, [socket]);

	useEffect(() => {
		socket.on("connect", () => {
			setOnline(true);
		});
	}, [socket]);

	useEffect(() => {
		socket.on("disconnect", () => {
			setOnline(false);
		});
	}, [socket]);

	return (
		<div className="container">
			<div className="alert">
				<p>
					Service status:
					{online ? (
						<span className="text-success"> Online</span>
					) : (
						<span className="text-danger"> Offline</span>
					)}
				</p>
			</div>

			<h1>BandNames</h1>
			<hr />

			<div className="row">
				<div className="col-8">
					<BandList />
				</div>

				<div className="col-4">
					<AddBand />
				</div>
			</div>
		</div>
	);
}

export default App;
