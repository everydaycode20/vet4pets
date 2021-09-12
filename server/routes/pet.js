const pet_router = require("express").Router();

const connection = require("../utils/database_connection");

pet_router.post("/pet", (req, res, next) => {

    const { id_owner, name, age, id_type } = req.body;

    connection.query("insert into pet (idPetOwner, namePet, age, idType) values (?, ?, ?, ?)", [id_owner, name, age, id_type], (err, results, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error in the database"});
        
        res.json({"status": true, "message": "pet added"});
    });
});

pet_router.post("/pet/type", (req, res, next) => {

    const { type_description, id_breed } = req.body;

    connection.query("insert into petType (typeDescription, idBreed) values (?, ?)", [type_description, id_breed], (err, results, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error in the database"});
        
        res.json({"status": true, "message": "pet type added"});
    });
});

pet_router.post("/pet/type/breed", (req, res, next) => {

    const {breed_description} = req.body;

    connection.query("insert into breed ( breedDescription ) values (?)", [breed_description], (err, results, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error in the database"});
        
        res.json({"status": true, "message": "pet breed added"});
    });
});

module.exports = pet_router;