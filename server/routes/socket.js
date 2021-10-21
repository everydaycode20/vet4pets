const schedule = require('node-schedule');

const connection = require("../utils/database_connection");

const addZeroToString = require("../utils/addZerosToString");

module.exports.socket = io => {
    
    io.on("connection", (socket) => {
        
        socket.on("new appointment", a => {
            
            connection.query("call getCurrentAppointments()",(err, rows, fields) => {
                
                if(err) console.log(err);
                
                const timeArr = [ new Date().getFullYear(), new Date().getMonth(), new Date().getDate()];

                removeJobs(schedule);
                
                rows[0].forEach(elm => {

                    const obj = {"hour": addZeroToString.addZeroToLeft(elm.hour), "minute": addZeroToString.addZeroToRight(elm.minute), "nameOwner": elm.nameowner, "namePet": elm.namepet, "appointmentName": elm.appointmentName};

                    schedule.scheduleJob( new Date( timeArr[0], timeArr[1], timeArr[2], elm.hour, elm.minute), () => {
                        socket.emit("appointments", JSON.stringify(obj)) });
                    
                });

            });
        });

        connection.query("call getCurrentAppointments()",(err, rows, fields) => {
        
            if(err) console.log(err);
            
            removeJobs(schedule);
            
            const timeArr = [ new Date().getFullYear(), new Date().getMonth(), new Date().getDate()];
            
            rows[0].forEach(elm => {
                
                const obj = {"hour": addZeroToString.addZeroToLeft(elm.hour), "minute": addZeroToString.addZeroToRight(elm.minute), "nameOwner": elm.nameowner, "namePet": elm.namepet, "appointmentName": elm.appointmentName};

                schedule.scheduleJob( new Date( timeArr[0], timeArr[1], timeArr[2], elm.hour, elm.minute), () => {
                    socket.emit("appointments", JSON.stringify(obj))
                });
                
            });

        });

    });

};

const removeJobs = (schedule) => {

    let scheduler = schedule.scheduledJobs;

    const sJ = Object.keys(scheduler);

    for (const name of sJ) {
        schedule.cancelJob(name);
    }

};