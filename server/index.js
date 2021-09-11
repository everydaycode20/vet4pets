const express = require("express");

const app = express();

const routes = require("./routes/routes");

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(routes);

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