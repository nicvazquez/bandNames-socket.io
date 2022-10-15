const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {
	constructor() {
		this.app = express();
		this.port = 8080;

		// HTTP Server
		this.server = http.createServer(this.app);

		// Sockets configurations// Socket server configuration
		this.io = socketIo(this.server);
	}

	middlewares() {
		// Deploy public directory
		this.app.use(express.static(path.resolve(__dirname, "../public")));
	}

	configurateSockets() {
		new Sockets(this.io);
	}

	execute() {
		// Init middlewares
		this.middlewares();

		// Init sockets
		this.configurateSockets();

		// Init server
		this.server.listen(this.port, () => {
			console.log("Server running at", this.port);
		});
	}
}

module.exports = Server;
