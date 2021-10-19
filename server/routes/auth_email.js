const routerEmail = require("express").Router();

const isAuth = require("../utils/isAuth").isAuth;

const passport = require("passport");

const connection = require("../utils/database_connection");

const bcrypt = require('bcryptjs');

const csrfToken = require("../utils/csrfToken").csrfToken;

routerEmail.post("/login", passport.authenticate("local", {failureRedirect: "/failed"}), (req, res, next) => {

    const { user, name, lastName, email, id } = req.user;

    res.json({ user: { user, name, lastName, email, id }, status: true });
});

routerEmail.get("/failed", (req, res, next) => {
    
    res.status(401).json({ status: false });
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

    const { user, name, lastName, email, id } = req.user;

    res.json({ user: { user, name, lastName, email, id }, status: true });
});

routerEmail.get("/logout", isAuth, (req, res, next) => {

    res.clearCookie("csrfToken");

    res.clearCookie("session");

    req.logOut();

    res.json({ status: false });
});

module.exports = routerEmail;