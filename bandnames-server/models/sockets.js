const BandList = require("./band-list");

class Sockets {
	constructor(io) {
		this.io = io;

		this.bandList = new BandList();

		this.socketEvents();
	}

	socketEvents() {
		// On connection
		this.io.on("connection", (socket) => {
			console.log("Client connected");

			// Emit all the current bands to connected client
			socket.emit("current-bands", this.bandList.getBands());

			// Vote for the band
			socket.on("vote-band", (id) => {
				this.bandList.increaseVotes(id);
				this.io.emit("current-bands", this.bandList.getBands());
			});
		});
	}
}

module.exports = Sockets;
