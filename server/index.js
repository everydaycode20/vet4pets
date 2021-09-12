const express = require("express");

const app = express();

const appointment_router = require("./routes/appointments");
const owner_router = require("./routes/owners");
const pet_router = require("./routes/pet");

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use( appointment_router, owner_router, pet_router );

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});