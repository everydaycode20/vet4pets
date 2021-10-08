import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import styles from "../../styles/home/home_chart.module.scss";

const Chart = ({ btnBackground, data, monthlyData, yearlyData}) => {
  
  if (btnBackground === "weekly") {
    return (
      <ResponsiveContainer width="99%" height={320}>
          <BarChart width={1000} height={400} data={data}  >
              <CartesianGrid strokeDasharray="5 5" vertical={false}/>
              <XAxis dataKey="name" axisLine={false} tickLine={false}/>
              <YAxis axisLine={false} tickLine={false}/>
              <Tooltip cursor={{fill: "transparent"}}/>
              <Bar dataKey="appointments" fill="#F38BA0" barSize={20} radius={[8, 8, 0, 0]}/>
          </BarChart>
      </ResponsiveContainer>
    );
  }

  if (btnBackground === "monthly") {

    return (
      <ResponsiveContainer width="99%" height={320}>
        <BarChart width={1000} height={300} data={monthlyData.data} >
            <CartesianGrid strokeDasharray="5 5" vertical={false}/>
            <XAxis dataKey="name" fontSize={16} axisLine={false} tickLine={false}/>
            <YAxis axisLine={false} tickLine={false}/>
            <Tooltip cursor={{fill: "transparent"}}/>
            <Bar dataKey="appointments" fill="#F38BA0" barSize={20} radius={[8, 8, 0, 0]}/>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (btnBackground === "yearly") {
    
    return (
      <ResponsiveContainer width="99%" height={320}>
          <BarChart width={1000} height={300} data={yearlyData} >
              <CartesianGrid strokeDasharray="10 10" vertical={false}/>
              <XAxis dataKey="year" fontSize={16} axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false}/>
              <Tooltip cursor={{fill: "transparent"}} />
              <Bar dataKey="appointments" fill="#F38BA0" barSize={20} radius={[8, 8, 0, 0]}/>
          </BarChart>
      </ResponsiveContainer>
    );
  }

};

const HomeChart = () => {

  const [data, setData] = useState( [ {name: 'monday', appointments: 0,}, {name: 'tuesday', appointments: 0},{name: "wednesday", appointments: 0}, {name: "thursday", appointments: 0}, {name: "friday", appointments: 0}]);

  const [monthlyData, setMonthlyData] = useState({ data: [ {name: "January", appointments: 0}, {name: "February", appointments: 0}, {name: "March", appointments: 0}, {name: "April", appointments: 0}, {name: "May", appointments: 0}, {name: "June", appointments: 0}, {name: "July", appointments: 0}, {name: "August", appointments: 0},
  {name: "September", appointments: 0}, {name: "October", appointments: 0}, {name: "November", appointments: 0}, {name: "December", appointments: 0} ], status: false});

  const [yearlyData, setYearlyData] = useState([]);

  const [btnBackground, setBtnBackground] = useState("weekly");

  const getWeeklyData = () => {

    setBtnBackground("weekly");
    
  };

  const getMonthlyData = () => {

    const year = new Date().getFullYear();

    if (monthlyData.status) {
      setBtnBackground("monthly");
    }
    else{

      setBtnBackground("monthly");

      fetch("/appointments/months", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
      },
        body: JSON.stringify({"year": year})
      }).then(res => res.json()).then(d => {
              
        let state = JSON.parse(JSON.stringify(monthlyData.data));

        state.forEach((elm, index) => {
          elm.appointments = d[index].appointments;
          
        });

        setMonthlyData(prev => ({...prev, data: state}));

      }).catch(err => console.log(err));
      
      setMonthlyData(prev => ({...prev, status: true}))
    }

    

  };

  const getYearlyData = () => {
    setBtnBackground("yearly");
    
    fetch("/appointments/years", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
    }
    }).then(res => res.json()).then(d => {
      
      setYearlyData(d);

    }).catch(err => console.log(err));

  };

  useEffect(() => {
    
    let datesWeek = {date1: "", date2: "", date3: "", date4: "", date5: ""};

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    
    const month = currentDate.getMonth();

    let tempDay = currentDate.getDate() - currentDate.getDay() + 1;
    
    let date = new Date(year, month, tempDay);

    for (const key in datesWeek) {
      
      datesWeek[key] = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      date.setDate(date.getDate() + 1);

    }

    fetch("/appointments/week", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
    },
      body: JSON.stringify({"date1": datesWeek.date1, "date2": datesWeek.date2, "date3": datesWeek.date3, "date4": datesWeek.date4, "date5": datesWeek.date5})
    }).then(res => res.json()).then(d => {
      
      let state = JSON.parse(JSON.stringify(data));

      state.forEach((elm, index) => {
        elm.appointments = d[index][elm.name];
      });
      
      setData(state);

    }).catch(err => console.log(err));

  }, []);

    return (
        <section className={styles.home_chart}>
            <div className={styles.header_chart}>
                <h2>Appointments this week</h2>
                <div className={styles.control_chart}>
                    <button style={{backgroundColor: btnBackground === "weekly" ? "#135A5A" : "#CDF0EA", color: btnBackground === "weekly" ? "white" : "#3A6351"}} onClick={() => getWeeklyData()}>weekly</button>
                    <button style={{backgroundColor: btnBackground === "monthly" ? "#135A5A" : "#CDF0EA", color: btnBackground === "monthly" ? "white" : "#3A6351"}} onClick={() => getMonthlyData()}>monthly</button>
                    <button style={{backgroundColor: btnBackground === "yearly" ? "#135A5A" : "#CDF0EA", color: btnBackground === "yearly" ? "white" : "#3A6351"}} onClick={() => getYearlyData()}>yearly</button>
                </div>
            </div>
          <Chart btnBackground={btnBackground} data={data} monthlyData={monthlyData} yearlyData={yearlyData}/>
        </section>
    );
};

export default HomeChart;