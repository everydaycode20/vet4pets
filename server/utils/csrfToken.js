const { nanoid } = require("nanoid");

module.exports.csrfToken = (req, res, next) => {

    const options = { maxAge: 60 * 60 * 1000};

    
    res.cookie("csrfToken", nanoid(), options);
    
    next();

};

module.exports.getCsrfToken = (req, res, next) => {

    const headers = JSON.stringify(req.headers);
    const header = JSON.parse(headers);

    const { csrfToken } = req.cookies;

    if (header["csrf-token"] === csrfToken) {
        
        next();
    }
    else{

        res.clearCookie("csrfToken");

        res.clearCookie("session");

        res.status(401).json();
    }
    
};