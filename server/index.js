const express = require("express");
const mysql = require('mysql');

const app = express();

const routes = require("./routes/routes");

app.use(express.json());
app.use(express.urlencoded({extended: true}))

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database: "prueba"
});

connection.connect();

app.use(routes);

app.get("/appointments", (req, res, next) =>{
    // console.log(req.body);
    const {date} = req.body;
    let hours = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

    connection.query(`call getDa("${date}")`, (err, rows, fields) => {
        // console.log(rows[0]);
        let arr = [];
        rows[0].forEach(elm => {
            const time = new Date(elm.fecha);
            // console.log(time.getHours(), time.getMinutes());
            let hour = `${zero(time.getHours())}:${time.getMinutes()}`;
            console.log(hour);
            arr.push(hour);
        });
        console.log(arr[0], hours[2]);
        let newArr = hours.filter(elm => !arr.includes(elm));
        console.log(newArr);
        res.json({"hours": newArr});
    });

});

function zero(hour) {
    
    if (hour.toString().length === 1) {
        console.log("si");
        return "0" + hour;
    }
    return `${hour}`;
}

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});