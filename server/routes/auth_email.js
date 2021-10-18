const routerEmail = require("express").Router();

const isAuth = require("../utils/isAuth").isAuth;

const passport = require("passport");

const connection = require("../utils/database_connection");

const bcrypt = require('bcryptjs');

const csrfToken = require("../utils/csrfToken").csrfToken;

routerEmail.post("/login", csrfToken, passport.authenticate("local", {failureRedirect: "/failed"}), (req, res, next) => {

    const { user, name, lastName, email, id } = req.user;

    res.json({ user: { user, name, lastName, email, id }, status: true });
});

routerEmail.get("/failed", (req, res, next) => {
    
    res.json({ status: false });
});

routerEmail.post("/register", (req, res, next) => {
    
    const { user, name, lastName, email, password } = req.body;

    const hash = bcrypt.hashSync(password, 8);
    
    connection.query("call createUser(?, ?, ?, ?, ?)", [user, name, lastName, email, hash], (err, results, fields) => {

        if(err) console.log(err);

        console.log(results);

        res.json("si");
    });

});

routerEmail.get("/check", isAuth, (req, res, next) => {
    res.json({status: true });
});

module.exports = routerEmail;