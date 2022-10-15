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

			// Vote for a band
			socket.on("vote-band", (id) => {
				this.bandList.increaseVotes(id);
				this.io.emit("current-bands", this.bandList.getBands());
			});

			// Remove a band
			socket.on("remove-band", (id) => {
				this.bandList.removeBand(id);
				this.io.emit("current-bands", this.bandList.getBands());
			});

			// Change band name
			socket.on("change-band-name", (data) => {
				this.bandList.changeName(data.id, data.name);
				this.io.emit("current-bands", this.bandList.getBands());
			});
		});
	}
}

module.exports = Sockets;
