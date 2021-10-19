const { nanoid } = require("nanoid");

module.exports.csrfToken = (req, res, next) => {

    const options = { maxAge: 60 * 60 * 1000};

    
    res.cookie("csrfToken", nanoid(), options);
    
    next();

};