const appointment_router = require("express").Router();

const addZeroToString = require("../utils/addZerosToString");
const checkHours = require("../utils/checkHours").checkHours;

const connection = require("../utils/database_connection");

appointment_router.get("/appointments/day", (req, res, next) => {

    const {date} = req.body;

    connection.query(`call getAppointmentsByDate(?)`, [date],(err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});

        let arr = [];

        rows[0].forEach(elm => {
            const time = new Date(elm.dateAppointment);

            let hour = `${addZeroToString.addZeroToLeft(time.getHours())}:${addZeroToString.addZeroToRight(time.getMinutes())}`;

            arr.push(hour);
        });

        let newArr = checkHours(arr);
        
        res.json({"hours": newArr});
    });

});

appointment_router.get("/appointments/week", (req, res, next) => {

    const { date1, date2, date3, date4, date5} = req.body;

    connection.query(`call getNumberAppointmentsByWeek(?, ?, ?, ? , ?)`, [date1, date2, date3, date4, date5],(err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});
        
        res.json({"hours": rows[0]});
    });

});

appointment_router.get("/appointments/owner", (req, res, next) => {

    const {id_owner} = req.body;

    connection.query(`call getAppointmentsByOwner(?)`, [id_owner],(err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});

        if(rows[0].length === 0) res.json({"status": false, "message": "no owner data with that identification"});
        else{
            res.json({"appointments": rows[0]});
        }
        
    });
});

appointment_router.get("/appointments/pet", (req, res, next) => {

    const {id_pet} = req.body;

    connection.query(`call getAppointmentsByOwner(?)`, [id_pet],(err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});

        if(rows[0].length === 0) res.json({"status": false, "message": "no pet data with that identification"});
        else{
            res.json({"appointments": rows[0]});
        }
        
    });
});

appointment_router.post("/appointments", (req, res, next) => {
    
    const {date_appointment, id_pet, id_owner, appointment_type} = req.body;

    connection.query("insert into appointments (dateAppointment, idPet, idOwner, appointmentType) values (?, ?, ?, ?)", [date_appointment, id_pet, id_owner, appointment_type], (err, results, fields) => {
        console.trace(err);
        if(err) res.json({"status": false, "message": "there was an error with the database"});

        res.json({"status": true, "message": "appointment added"});
    });

});

appointment_router.post("/appointments/type", (req, res, next) => {
    const {appointment_type} = req.body;

    connection.query("insert into appointmentType (appointmentName) values (?)", [appointment_type], (err, results, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});

        res.json({"status": true, "message": "appointment type added"});

    });

});

module.exports = appointment_router;