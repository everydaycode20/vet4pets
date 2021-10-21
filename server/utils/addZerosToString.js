// adds number zero to left or right side of string

/**
 * 
 * @param {Number} number 
 * 
 * @returns {String} number
 * 
 */

module.exports.addZeroToLeft = (number) => {
    
    if (number.toString().length === 1) {
        return number.toString().padStart(2, "0");
    }

    return number;
};

/**
 * 
 * @param {Number} number 
 * 
 * @returns {String} number
 * 
 */

module.exports.addZeroToRight = (number) => {

    if (number.toString().length === 1) {
        return number.toString().padEnd( number.toString().length + 1, "0");
    }

    return number;
}