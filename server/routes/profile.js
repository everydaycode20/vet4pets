const routerEmail = require("./auth_email");
const router_email = require("./auth_email");

const connection = require("../utils/database_connection");

routerEmail.put("/profile", (req, res, next) => {

    const { id, name, lastName} = req.body;

    connection.query("update adminUser set name = ?, lastName = ? where id = ?", [ name, lastName, id], (err, results) => {

        if(err) res.json({"status": false, "message": "there was an error in the database"});

        res.json({status: true});

    });

});

module.exports = router_email;