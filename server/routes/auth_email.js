const routerEmail = require("express").Router();

const isAuth = require("../utils/isAuth").isAuth;

const passport = require("passport");

const connection = require("../utils/database_connection");

const bcrypt = require('bcryptjs');

const readFileType = require("../utils/file_type").readFileType; 

const csrfToken = require("../utils/csrfToken").csrfToken;

require('dotenv').config("./.env");

const cloudinary = require("cloudinary");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage: storage}).single("file");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


routerEmail.post("/login", passport.authenticate("local", {failureRedirect: "/failed"}), (req, res, next) => {

    const { user, name, lastName, email, id, image } = req.user;
    
    res.json({ user: { user, name, lastName, email, id, image }, status: true });
});

routerEmail.get("/failed", (req, res, next) => {
    
    res.status(401).json({ status: false });
});

routerEmail.post("/register", (req, res, next) => {
    
    const { user, name, lastName, email, password } = req.body;

    const hash = bcrypt.hashSync(password, 8);
    
    connection.query("call createUser(?, ?, ?, ?, ?)", [user, name, lastName, email, hash], (err, results, fields) => {

        if(err) console.log(err);

        res.json({status: true, message: "user registered"});
    });

});

routerEmail.get("/check", isAuth, (req, res, next) => {

    const { user, name, lastName, email, id, image } = req.user;

    res.json({ user: { user, name, lastName, email, id, image }, status: true });
});

routerEmail.get("/logout", isAuth, (req, res, next) => {

    res.clearCookie("csrfToken");

    res.clearCookie("session");

    req.logOut();

    res.json({ status: false });
});

routerEmail.post("/image", isAuth, (req, res, next) => {

    const { id } = req.user;

    upload(req, res, err => {
        let buffer = req.file.buffer;

        if (err instanceof multer.MulterError) {
            res.status(400).json({status: false, message: "server error"});
        }
        else{
            readFileType(buffer).then(img => {
                if (!img.mime.match(/.(jpg|jpeg|png)$/i)) {
                    res.status(406).json({"status": false, "message": "wrong file type"});
                }
                else{
                    const image = buffer.toString("base64");
                    const image64 = `data:image/png;base64,${image}`;

                    cloudinary.v2.uploader.upload(image64, function(error, result){
                        if(error) throw error;
                
                        connection.query("update adminUser set image = ? where id = ?", [result.secure_url, id], (err) => {

                            if(err) res.json({"status": false, "message": "there was an error with the database"});

                            res.json({status: true, message: "image uploaded successfully", image: result.secure_url});
                        });
                    });
                }
            });
        }
    });

});


module.exports = routerEmail;