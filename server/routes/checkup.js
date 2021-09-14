const checkup_router = require("express").Router();

const connection = require("../utils/database_connection");

checkup_router.post("/checkup", (req, res, next) => {

    const { id_vet, id_pet, id_owner, reason, symptoms, diagnose, id_test, id_medicine } = req.body;

    connection.query("insert into checkup (idVet, idPet, idOwner, reason, symptoms, diagnose, idTest, idMedicine) values (?, ?, ?, ?, ?, ?, ?, ?)", [id_vet, id_pet, id_owner, reason, symptoms, diagnose, id_test, id_medicine], (err, results, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});
        
        res.json({"status": true, "message": "checkup added"});
    });

});

checkup_router.get("/checkup/owner", (req, res, next) => {

    const { id_owner } = req.body;

    connection.query("call getCheckupByOwner(?)", [id_owner], (err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});
        
        res.json({"checkups": rows[0]});
    });

});

checkup_router.post("/test", (req, res, next) => {

    const { id_type, date } = req.body;

    connection.query("insert into test (idType, dateTest) values ( ?, ? )", [id_type, date], (err, results, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});

        res.json({"status": true, "message": "test added"});
    });

});

checkup_router.post("/test/type", (req, res, next) => {

    const { name } = req.body;

    connection.query("insert into testType (nameType) values ( ? )", [name], (err, results, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});

        res.json({"status": true, "message": "test type added"});
    });

});

checkup_router.post("/medicine/type", (req, res, next) => {

    const { name, description } = req.body;

    connection.query("insert into medicineType (medicineName, medicineDescription) values ( ?, ? )", [ name, description ], (err, results, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});

        res.json({"status": true, "message": "medicine type added"});
    });

});

checkup_router.post("/medicine", (req, res, next) => {

    const { id_type, dose } = req.body;

    connection.query("insert into medicine (idType, dose) values ( ?, ? )", [ id_type, dose ], (err, results, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});

        res.json({"status": true, "message": "medicine added"});
    });

});


module.exports = checkup_router;