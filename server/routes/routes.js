const router = require("express").Router();
const mysql = require('mysql');

const addZeroToString = require("../utils/addZerosToString");
const checkHours = require("../utils/checkHours").checkHours;

require('dotenv').config("./.env");

var connection = mysql.createConnection({
    host     :  process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect();

router.get("/appointments", (req, res, next) => {
    const {date} = req.body;

    connection.query(`call getDa("${date}")`, (err, rows, fields) => {

        let arr = [];
        rows[0].forEach(elm => {
            const time = new Date(elm.fecha);

            let hour = `${addZeroToString.addZeroToLeft(time.getHours())}:${addZeroToString.addZeroToRight(time.getMinutes())}`;

            arr.push(hour);
        });

        let newArr = checkHours(arr);
        console.log(newArr);
        res.json({"hours": newArr});
    });
});

module.exports = router;