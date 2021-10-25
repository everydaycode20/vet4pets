const owner_router = require("express").Router();

const { getCsrfToken } = require("../utils/csrfToken");
const connection = require("../utils/database_connection");

owner_router.get("/owners", (req, res, next) => {

    connection.query("call getOwners()", (err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error in the database"});

        const arr = [];
        
        rows[0].forEach(elm => {
            
            arr.push({"id": elm.id, "nameOwner": elm.nameOwner, "email": elm.email, "address": elm.address, "telephones": elm.telephones.split(","), "registerDate": elm.registerDate});
        });

        res.json(arr);
        
    });
});

owner_router.post("/owner/pets", (req, res, next) => {

    const {id} = req.body;

    connection.query("select id, namePet from pet where idPetOwner = ?", [id], (err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error in the database"});

        res.json(rows);
    });
});

owner_router.post("/owner", getCsrfToken, (req, res, next) => {

    const {name, email, address, phone, idPhone} = req.body;

    const data = [name, email, address];

    connection.query("insert into petOwner (nameOwner, email, address) values (?)", [data], (err, results, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error in the database"});
        
        connection.query("insert into telOwner (idOwner, idPhoneType, telNumber) values (?, ?, ?)", [results.insertId, idPhone, phone], (err, results, fields) => {
            if(err) res.json({"status": false, "message": "there was an error in the database"});
            
            res.json({"status": true, "message": "pet owner added"});
        });

        
    });
});

owner_router.get("/telephones/type", (req, res, next) => {

    connection.query("select * from telephoneType", (err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error in the database"});

        res.json(rows);
    });
});

module.exports = owner_router;