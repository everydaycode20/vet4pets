const bcrypt = require("bcryptjs");

/**
 * 
 * compared password against stored password in database using bcryptjs
 * 
 * @param {*} password password from client
 * @param {*} dbPassword password from database
 * @returns {Boolean}
 * 
 */

module.exports.comparePassword = (password, dbPassword) => {

    const pass = bcrypt.compareSync(password, dbPassword);

    return pass; 
};