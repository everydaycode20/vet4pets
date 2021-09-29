const express = require("express");
const app = express();

const socketIO = require('socket.io');
const http = require('http');

const schedule = require('node-schedule');

const socketFn = require("./routes/socket");

const appointment_router = require("./routes/appointments");
const owner_router = require("./routes/owners");
const pet_router = require("./routes/pet");
const checkup_router = require("./routes/checkup");
const vet_router = require("./routes/veterinarian");

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use( appointment_router, owner_router, pet_router, checkup_router, vet_router );

var server = http.createServer(app);

const io = socketIO(server, {cors: {origin: "*", methods: ["GET", "POST"]}} );

socketFn.socket(io);


const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});

// app.listen(port, () => {
//     console.log(`server listening on port ${port}`);
// });