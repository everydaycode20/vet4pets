// returns the days of a specific month



const daysInMonth = ( newMonth, year ) => {
    
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    let objDaysOfMonth = [];

    const tempYear = year;
    
    const month = newMonth;

    const date = new Date(tempYear, month , 1);

    const tempDate = new Date(tempYear, month , 1);

    const firstDayOfYear = new Date(tempYear, month , 1).getDay();

    for (let i = 0; i < firstDayOfYear; i++) {
        
        tempDate.setDate(tempDate.getDate() - 1);
        
        objDaysOfMonth.unshift({"day": daysOfWeek[new Date(tempDate).getDay()], "date": new Date(tempDate).getDate(), "month": months[new Date(tempDate).getMonth()], "year": tempDate.getFullYear(), "currentMonth": false});
    }

    while (date.getMonth() === month ) {
        
        objDaysOfMonth.push({"day": daysOfWeek[new Date(date).getDay()], "date": new Date(date).getDate(), "month": months[new Date(date).getMonth()], "year": date.getFullYear(), "currentMonth": true});
        
        date.setDate(date.getDate() + 1);
        
    }
    
    while (objDaysOfMonth.length % 7 !== 0) {
        
        objDaysOfMonth.push({"day": daysOfWeek[new Date(date).getDay()], "date": new Date(date).getDate(), "month": months[new Date(date).getMonth()], "year": date.getFullYear(), "currentMonth": false});

        date.setDate(date.getDate() + 1);
    }
    
    return objDaysOfMonth;
};

export default daysInMonth;