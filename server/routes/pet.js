const pet_router = require("express").Router();

const connection = require("../utils/database_connection");

pet_router.get("/pets/owners", (req, res, next) => {

    connection.query("select id, nameOwner from petOwner", (err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error in the database"});

        res.json(rows);
        
    });
});

pet_router.get("/pets/breed", (req, res, next) => {

    connection.query("call getPetType()", (err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error in the database"});
        
        res.json(rows[0]);
        
    });
});

pet_router.get("/pets", (req, res, next) => {

    connection.query("call getPets()", (err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error in the database"});

        const arr = [];

        rows[0].forEach(elm => {
            
            arr.push({"id": elm.id, "namePet": elm.namePet, "nameOwner": elm.nameOwner, "age": elm.age, "type": elm.typeDescription, "registerDate": elm.registerDate});

        });

        res.json(arr);
        
    });
});

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

pet_router.get("/pets/month", (req, res, next) => {

    connection.query("call getNumberPatients()", (err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error in the database"});
        
        res.json(rows[0][0]);
    });
});

module.exports = pet_router;