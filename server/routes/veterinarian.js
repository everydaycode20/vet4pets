const vet_router = require("express").Router();

const connection = require("../utils/database_connection");

vet_router.post("/veterinarian", (req, res, next) => {

    const { name, telephone} = req.body;

    connection.query("insert into veterinarian ( nameVet, telVet ) values (?, ?)", [ name, telephone ], (err, results, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});
        console.log(err);
        res.json({"status": true, "message": "veterinarian added"});
    });

});

// vet_router.post()



module.exports = vet_router;