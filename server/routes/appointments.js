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

appointment_router.get("/appointments/day-week", (req, res, next) => {

    const arr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const hours = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30"];

    let data = [{"Monday": []}, {"Tuesday": []}, {"Wednesday": []}, {"Thursday": []}, {"Friday": []}];

    const {date1, date2} = req.body;

    data.forEach((elm, i) => {
        
        hours.forEach(hour => {
            elm[arr[i]].push({"time": hour, "day": arr[i], "dateDay": 0, "fullDate": "","appointmentName": "", "nameOwner": "", "namePet": ""});
        })
    });

    connection.query(`call getAppointmentsByWeek(?, ?)`, [date1, date2], (err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});

        data.forEach((a, i) => {

            rows[0].forEach(elm => {
                
                a[arr[i]].find((prop, i) => {
                    
                    const t = addZeroToString.addZeroToLeft(elm.time.split(":")[0]) + ":" + elm.time.split(":")[1];

                    if (prop.day === elm.day && prop.time === t) {
                        prop.namePet = elm.namePet;
                        prop.nameOwner = elm.nameOwner;
                        prop.appointmentName = elm.appointmentName;
                        prop.dateDay = elm.dateDay;
                        prop.fullDate = elm.fullDate;
                        return true;
                    }
                })
            });
        });
        
        res.json({"appointmentsWeek": data});
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