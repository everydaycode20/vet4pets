const appointment_router = require("express").Router();

const nanoid = require("nanoid");

const addZeroToString = require("../utils/addZerosToString");
const checkHours = require("../utils/checkHours").checkHours;

const connection = require("../utils/database_connection");

appointment_router.post("/appointments/day/hours", (req, res, next) => {

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


appointment_router.post("/appointments/day", (req, res, next) => {

    const {date} = req.body;
    
    connection.query(`call getAppointmentsByDay(?)`, [date],(err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});
        
        res.json(rows[0]);
    });

});

appointment_router.get("/appointments/type", (req, res, next) => {

    connection.query("select id, appointmentName from appointmentType", (err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});
        
        res.json(rows);

    });

});

appointment_router.post("/appointments/day-week", (req, res, next) => {

    const arr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const hours = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

    let data = [{"Monday": []}, {"Tuesday": []}, {"Wednesday": []}, {"Thursday": []}, {"Friday": []}];

    const months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    const {date1, date2} = req.body;
    
    data.forEach((elm, i) => {
        
        hours.forEach(hour => {
            elm[arr[i]].push({"id" : "", "time": hour, "day": arr[i], "dateDay": 0, "fullDate": "", "month": "", "monthIndex": "", "year": "", "appointmentName": "", "nameOwner": "", "namePet": ""});
        })
    });

    connection.query(`call getAppointmentsByWeek(?, ?)`, [date1, date2], (err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});
        
        if (rows[0].length === 0) {
            let currentWeek = new Date(date1);

            if(currentWeek.getDay() === 0) currentWeek.setDate(currentWeek.getDate() + 1);

            data.forEach((a, i) => {
                
                a[arr[i]].find(prop => {
                    prop.dateDay = currentWeek.getDate();
                    prop.month = months[currentWeek.getMonth()];
                    prop.year = currentWeek.getFullYear();
                    prop.monthIndex = currentWeek.getMonth() + 1;
                    prop.id = nanoid.nanoid(8);
                    // return true;
                });

                currentWeek.setDate(currentWeek.getDate() + 1);
            });
        }
        else{
            let currentWeek = new Date(date1);

            if(currentWeek.getDay() === 0) currentWeek.setDate(currentWeek.getDate() + 1);

            data.forEach((a, i) => {
                
                rows[0].forEach(elm => {
                    
                    a[arr[i]].find((prop, i) => {
                        
                        const t = addZeroToString.addZeroToLeft(elm.time.split(":")[0]) + ":" + elm.time.split(":")[1];
                        
                        if (prop.day === elm.day && prop.time === t) {
                            
                            prop.namePet = elm.namePet;
                            prop.nameOwner = elm.nameOwner;
                            prop.appointmentName = elm.appointmentName;
                            prop.dateDay = currentWeek.getDate();
                            prop.fullDate = elm.fullDate;
                            prop.id = nanoid.nanoid(8);
                            prop.idDB = elm.id;
                            prop.month = months[currentWeek.getMonth()];
                            prop.monthIndex = currentWeek.getMonth() + 1;
                            prop.year = currentWeek.getFullYear();
                            // return true;
                        }
                        else{
                            prop.dateDay = currentWeek.getDate();
                            prop.month = months[currentWeek.getMonth()];
                            prop.year = currentWeek.getFullYear();
                            prop.monthIndex = currentWeek.getMonth() + 1;
                            prop.id = nanoid.nanoid(8);
                        }
                    });
                    
                });
                currentWeek.setDate(currentWeek.getDate() + 1);
            });
        }
        res.json({"appointmentsWeek": data});
    });
    
});

appointment_router.post("/appointments/week", (req, res, next) => {

    const { date1, date2, date3, date4, date5 } = req.body;
    
    connection.query(`call getNumberAppointmentsByWeek(?, ?, ?, ? , ?)`, [date1, date2, date3, date4, date5],(err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});
        
        res.json([{"monday": rows[0][0].monday}, {"tuesday": rows[0][0].tuesday}, {"wednesday": rows[0][0].wednesday}, {"thursday": rows[0][0].thursday}, {"friday": rows[0][0].friday}]);
        
    });

});

appointment_router.post("/appointments/months", (req, res, next) => {

    const { year } = req.body;
    
    const months = [ {name: "January", appointments: 0}, {name: "February", appointments: 0}, {name: "March", appointments: 0}, {name: "April", appointments: 0}, 
    {name: "May", appointments: 0}, {name: "June", appointments: 0}, {name: "July", appointments: 0}, {name: "August", appointments: 0},
    {name: "September", appointments: 0}, {name: "October", appointments: 0}, {name: "November", appointments: 0}, {name: "December", appointments: 0} ];

    connection.query(`call getAppointmentsByMonth(?)`, [year],(err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});

        let i = 0;
        let j = 0;

        while (j < rows[0].length) {
            
            while (i < months.length) {

                if (rows[0][j].month === months[i].name) {
                    months[i].appointments = rows[0][j].appointments;
                    if (j < rows[0].length-1) {
                        j++;
                        i++; 
                    }
                    else{
                        i = months.length + 1;
                        j = rows[0].length + 1;
                    }
                }
                else{
                    i++;
                }
            }
        }

        res.json(months);
        
    });

});

appointment_router.get("/appointments/years", (req, res, next) => {
    
    connection.query(`call getAppointmentsByYear()`, (err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});

        res.json(rows[0]);
        
    });

});

appointment_router.post("/appointments/owner/total", (req, res, next) => {

    const { id_owner, date } = req.body;
    
    connection.query(`call getTotalAppointmentsByOwner(?, ?)`, [id_owner, date],(err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});

        res.json(rows[0][0]);
        
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


appointment_router.post("/appointments/owner/upcoming", (req, res, next) => {

    const { id_owner } = req.body;
    
    connection.query(`call getUpcomingAppointmentsByOwner(?)`, [id_owner],(err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});
        
        res.json(rows[0]);
    });

});

appointment_router.post("/appointments/owner/past", (req, res, next) => {

    const { id_owner } = req.body;
    
    connection.query(`call getPastAppointmentsByOwner(?)`, [id_owner],(err, rows, fields) => {
        
        if(err) res.json({"status": false, "message": "there was an error with the database"});
        
        res.json(rows[0]);
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

appointment_router.post("/appointment", (req, res, next) => {
    
    const {date_appointment, id_pet, id_owner, appointment_type} = req.body;
    
    connection.query("insert into appointments (dateAppointment, idPet, idOwner, appointmentType) values (?, ?, ?, ?)", [date_appointment, id_pet, id_owner, appointment_type], (err, results, fields) => {
        
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

appointment_router.delete("/appointment", (req, res, next) => {

    const {id} = req.body;

    connection.query("delete from appointments where id = ?", [id], (err, results, fields) => {
        
        if(err) res.status(404).json({"status": false, "message": "there was an error with the database"});

        res.status(202).json({"status": true, "message": "appointment deleted"});

    });

});


module.exports = appointment_router;