const owner_router = require("express").Router();

const connection = require("../utils/database_connection");

owner_router.get("/owners", (req, res, next) => {

    connection.query("insert into petOwner (nameOwner, email, address) values (?)", [data], (err, results, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error in the database"});
        
        res.json({"status": true, "message": "pet owner added"});
    });
});

owner_router.post("/owners", (req, res, next) => {

    const {name, email, address} = req.body;

    const data = [name, email, address];

    connection.query("insert into petOwner (nameOwner, email, address) values (?)", [data], (err, results, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error in the database"});
        
        res.json({"status": true, "message": "pet owner added"});
    });
});

module.exports = owner_router;