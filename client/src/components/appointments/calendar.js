import React, { useState, useEffect, memo } from "react";

const Calendar = ({ week }) => {
    
    const arr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    const hours = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30"];

    const obj = [{"Monday":[{"time":"08:00","day":"Monday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"08:30","day":"Monday","dateDay":13,"fullDate":"2021-09-13 8:30","appointmentName":"general checkup","nameOwner":"name lastname","namePet":"akira"},{"time":"09:00","day":"Monday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"09:30","day":"Monday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"10:00","day":"Monday","dateDay":13,"fullDate":"2021-09-13 10:00","appointmentName":"general checkup","nameOwner":"name lastname","namePet":"akira"},{"time":"10:30","day":"Monday","dateDay":13,"fullDate":"2021-09-13 10:30","appointmentName":"general checkup","nameOwner":"name lastname","namePet":"akira"},{"time":"11:00","day":"Monday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"11:30","day":"Monday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"12:00","day":"Monday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"12:30","day":"Monday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"01:00","day":"Monday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"01:30","day":"Monday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"02:00","day":"Monday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"02:30","day":"Monday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"03:00","day":"Monday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"03:30","day":"Monday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"04:00","day":"Monday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"04:30","day":"Monday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""}]},{"Tuesday":[{"time":"08:00","day":"Tuesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"08:30","day":"Tuesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"09:00","day":"Tuesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"09:30","day":"Tuesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"10:00","day":"Tuesday","dateDay":14,"fullDate":"2021-09-14 10:00","appointmentName":"general checkup","nameOwner":"name lastname","namePet":"akira"},{"time":"10:30","day":"Tuesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"11:00","day":"Tuesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"11:30","day":"Tuesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"12:00","day":"Tuesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"12:30","day":"Tuesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"01:00","day":"Tuesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"01:30","day":"Tuesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"02:00","day":"Tuesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"02:30","day":"Tuesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"03:00","day":"Tuesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"03:30","day":"Tuesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"04:00","day":"Tuesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"04:30","day":"Tuesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""}]},{"Wednesday":[{"time":"08:00","day":"Wednesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"08:30","day":"Wednesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"09:00","day":"Wednesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"09:30","day":"Wednesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"10:00","day":"Wednesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"10:30","day":"Wednesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"11:00","day":"Wednesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"11:30","day":"Wednesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"12:00","day":"Wednesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"12:30","day":"Wednesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"01:00","day":"Wednesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"01:30","day":"Wednesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"02:00","day":"Wednesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"02:30","day":"Wednesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"03:00","day":"Wednesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"03:30","day":"Wednesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"04:00","day":"Wednesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"04:30","day":"Wednesday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""}]},{"Thursday":[{"time":"08:00","day":"Thursday","dateDay":16,"fullDate":"2021-09-16 8:00","appointmentName":"general checkup","nameOwner":"name lastname","namePet":"akira"},{"time":"08:30","day":"Thursday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"09:00","day":"Thursday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"09:30","day":"Thursday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"10:00","day":"Thursday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"10:30","day":"Thursday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"11:00","day":"Thursday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"11:30","day":"Thursday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"12:00","day":"Thursday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"12:30","day":"Thursday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"01:00","day":"Thursday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"01:30","day":"Thursday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"02:00","day":"Thursday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"02:30","day":"Thursday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"03:00","day":"Thursday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"03:30","day":"Thursday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"04:00","day":"Thursday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"04:30","day":"Thursday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""}]},{"Friday":[{"time":"08:00","day":"Friday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"08:30","day":"Friday","dateDay":17,"fullDate":"2021-09-17 8:30","appointmentName":"general checkup","nameOwner":"name lastname","namePet":"akira"},{"time":"09:00","day":"Friday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"09:30","day":"Friday","dateDay":17,"fullDate":"2021-09-17 9:30","appointmentName":"general checkup","nameOwner":"name lastname","namePet":"akira"},{"time":"10:00","day":"Friday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"10:30","day":"Friday","dateDay":17,"fullDate":"2021-09-17 10:30","appointmentName":"general checkup","nameOwner":"name lastname","namePet":"akira"},{"time":"11:00","day":"Friday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"11:30","day":"Friday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"12:00","day":"Friday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"12:30","day":"Friday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"01:00","day":"Friday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"01:30","day":"Friday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"02:00","day":"Friday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"02:30","day":"Friday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"03:00","day":"Friday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"03:30","day":"Friday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"04:00","day":"Friday","dateDay":0,"fullDate":"","appointmentName":"","nameOwner":"","namePet":""},{"time":"04:30","day":"Friday","dateDay":0,"fullDate":"","appointmentName":"vaccine","nameOwner":"name last name","namePet":"akira"}]}];
    
    const getHour = (hour) => {
        console.log(hour);
    };

    // useEffect(() => {
    //     console.log("si");
    //     fetch("/appointments", {method: "GET"}).then(res => res.json()).then(data => {
            
    //         data.forEach(elm => {
    //             const time = new Date(elm.fecha)
    //             console.log(time.getHours(), time.getMinutes(), time.getSeconds());
    //             console.log(new Date(elm.fecha).toLocaleDateString());
    //         });
    //     });
    // }, []);


    return (
        <div className="main-calendar-container">
                <div className="week-days">
                    {week && week.map((day, index) => {

                        const condition = day.year === new Date().getFullYear() && day.date === new Date().getDate() && day.month === months[new Date().getMonth()];

                        return (
                            <div key={index} className="date">
                                {condition && <div className="current-day"></div>}
                                <span >{day.date} </span>
                                <span>{day.day}</span>
                            </div>
                        )
                    })}
                </div>
                <div className="empty"></div>
                {/* <div className="hours-container">
                    {hours.map((hour, index) => {

                        return <span key={index}>{hour}</span>
                    })}
                </div> */}
                <div className="appointment-container">
                <div className="hours-container">
                    {hours.map((hour, index) => {

                        return <span key={index}>{hour}</span>
                    })}
                </div>
                    {obj.map((item, index) => {
                        
                        
                        return (
                            <div key={index} className="day-container">
                                
                                {item[arr[index]].map((item, index) => {
                                    // console.log(item);
                                    let border = null;
                                    
                                    if (item.appointmentName === "general checkup") border = "4px solid red";
                                    if (item.appointmentName === "vaccine") border = "4px solid blue";

                                    return (
                                        <div key={index} className="hour-item" onClick={() => getHour(item.time)} >
                                            {item.appointmentName !== "" && <div style={{backgroundColor: item.appointmentName !== "" && "white", borderTop: border}}>
                                                <span>{item.nameOwner}</span>
                                                <span>{item.namePet}</span>
                                                <span>{item.appointmentName}</span>
                                                <span>{item.time}</span>
                                                <button className="dot-container" >
                                                    <div className="dot"/>
                                                    <div className="dot"/>
                                                    <div className="dot"/>
                                                </button>
                                            </div>}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}

                    {/* {arr.map((elm, index) => {
                        return (
                            <div key={index} className="day-container">
                                {hours.map((hour, index) => {

                                    return <div key={index} className="hour-item" onClick={() => getHour(hour)} ></div>
                                })}
                            </div>
                        )
                    })} */}
                </div>
                
        </div>
    );

};

export default Calendar;