// from a set of hours and minutes find the ones that coincide from a base array

/**
 * 
 * @param {Array} dbArray 
 * 
 * @returns {Array} newArr
 * 
 */

module.exports.checkHours = (dbArray) => {

    let hours = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

    let newArr = hours.filter(elm => !dbArray.includes(elm));
    
    return newArr;
}

