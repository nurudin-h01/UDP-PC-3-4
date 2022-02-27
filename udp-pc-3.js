// import dependencies
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const server = require("http").Server(app);
const io = require("socket.io")(server);
var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://localhost:5000");
var topic = "testtopic";

//
client.subscribe(topic);

client.on("message", function (topic, message, packet) {
	console.log("message is " + message);
	io.emit("data2", JSON.parse(message));
});

const bodyParser = require("body-parser");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
let data = "test";

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
	console.log("a user connected");
});

app.post("/", (req, res) => {
	try {
		data = JSON.parse(req.body.data);
		console.log(data);
		io.emit("data", data);
	} catch (err) {}
});

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.listen(port, () =>
	console.log(`Example app listening on port ${port}!`)
);
