const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

const socketIO = require('socket.io');
const http = require('http');

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const passport = require("passport");

require('dotenv').config("./.env");

var options = {
	host: process.env.HOST,
	port: 3306,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
    DBPORT: process.env.PORT
};

const sessionStore = new MySQLStore(options);

const socketFn = require("./routes/socket");

const appointment_router = require("./routes/appointments");
const owner_router = require("./routes/owners");
const pet_router = require("./routes/pet");
const checkup_router = require("./routes/checkup");
const vet_router = require("./routes/veterinarian");
const router_email = require("./routes/auth_email");
const router_profile = require("./routes/profile");

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.use(session({
    key: "session",
    secret: "secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 8
    }
}));

require("./passport/local_strategy");
app.use(passport.initialize());
app.use(passport.session());

app.use( router_email, appointment_router, owner_router, pet_router, checkup_router, vet_router, router_profile );

var server = http.createServer(app);

const io = socketIO(server, {cors: {origin: "*", methods: ["GET", "POST"]}} );

socketFn.socket(io);

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});

