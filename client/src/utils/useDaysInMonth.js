import { useState, useEffect } from "react";

const useDaysInMonth = ( newMonth ) => {

    const [daysInMonth, setDaysInMonth] = useState([]);

    useEffect(() => {
        
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    
        let objDaysOfMonth = [];
    
        const tempYear = new Date().getFullYear();
        
        const month = newMonth;
        
        const tempMonth = new Date(tempYear, month, 1);

        getAppointments( tempMonth.getMonth() + 1, tempMonth.getFullYear() ).then(data => {

            const date = new Date(tempYear, month , 1);
    
            const tempDate = new Date(tempYear, month , 1);
        
            const firstDayOfYear = new Date(tempYear, month , 1).getDay();
            
            for (let i = 0; i < firstDayOfYear; i++) {
                
                tempDate.setDate(tempDate.getDate() - 1);
                
                objDaysOfMonth.unshift({"day": daysOfWeek[new Date(tempDate).getDay()], "date": new Date(tempDate).getDate(), "month": months[new Date(tempDate).getMonth()], "year": tempDate.getFullYear(), "currentMonth": false});
            }
        
            while (date.getMonth() === tempMonth.getMonth() ) {

                if (data[date.getDate()]) {
                    
                    objDaysOfMonth.push( { "day": daysOfWeek[new Date(date).getDay()], "date": new Date(date).getDate(), "month": months[new Date(date).getMonth()], "year": date.getFullYear(), "currentMonth": true, "count": data[date.getDate()].count } );
                }
                else{
                    objDaysOfMonth.push({"day": daysOfWeek[new Date(date).getDay()], "date": new Date(date).getDate(), "month": months[new Date(date).getMonth()], "year": date.getFullYear(), "currentMonth": true});
                }
                
                
                date.setDate(date.getDate() + 1);
                
            }
            
            while (objDaysOfMonth.length % 7 !== 0) {
                
                objDaysOfMonth.push({"day": daysOfWeek[new Date(date).getDay()], "date": new Date(date).getDate(), "month": months[new Date(date).getMonth()], "year": date.getFullYear(), "currentMonth": false});
        
                date.setDate(date.getDate() + 1);
            }

            setDaysInMonth(objDaysOfMonth);

        });

    }, [newMonth]);

    return daysInMonth;
};

const getAppointments = async(month, year) => {

    let response = await fetch("/appointments/month", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({month: month, year: year})
        });

    return await response.json();
}

export default useDaysInMonth;