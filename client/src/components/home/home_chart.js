import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import "../../styles/home/home_chart.scss";

const HomeChart = () => {

  const [data, setData] = useState([{name: 'monday', pv: 5,},{name: 'tuesday',pv: 10},{name: "wednesday", pv: 10}, {name: "thursday", pv: 8}, {name: "friday", pv: 12}]);

    const [btnBackground, setBtnBackground] = useState("weekly");

    const getWeeklyData = () => {
      setBtnBackground("weekly");
      setData([{name: 'monday', pv: 5,},{name: 'tuesday',pv: 10},{name: "wednesday", pv: 10}, {name: "thursday", pv: 8}, {name: "friday", pv: 12}]);
    };

    const getMonthlyData = () => {
      setBtnBackground("monthly");
      setData([{name: 'january', pv: 25,},{name: 'february',pv: 30},{name: "march", pv: 10}, {name: "thursday", pv: 8}, {name: "friday", pv: 12}]);
    };

    const getYearlyData = () => {
      setBtnBackground("yearly");
      setData([{name: '2021', pv: 155,},{name: '2020',pv: 200},{name: "2019", pv: 150}, {name: "2018", pv: 8}]);
    };

    return (
        <section className="home-chart">
            <div className="header-chart">
                <h2>Appointments this week</h2>
                <div className="control-chart">
                    <button style={{backgroundColor: btnBackground === "weekly" ? "#135A5A" : "#CDF0EA", color: btnBackground === "weekly" ? "white" : "#3A6351"}} onClick={() => getWeeklyData()}>weekly</button>
                    <button style={{backgroundColor: btnBackground === "monthly" ? "#135A5A" : "#CDF0EA", color: btnBackground === "monthly" ? "white" : "#3A6351"}} onClick={() => getMonthlyData()}>monthly</button>
                    <button style={{backgroundColor: btnBackground === "yearly" ? "#135A5A" : "#CDF0EA", color: btnBackground === "yearly" ? "white" : "#3A6351"}} onClick={() => getYearlyData()}>yearly</button>
                </div>
            </div>
            
                <ResponsiveContainer width="99%" height="100%">
                    <BarChart
                        width={1000}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        {/* <CartesianGrid strokeDasharray="5 5" /> */}
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip cursor={{fill: "transparent"}}/>
                        {/* <Legend /> */}
                        <Bar dataKey="pv" fill="#F38BA0" barSize={20}/>
                    </BarChart>
                </ResponsiveContainer>
        </section>
    );
};

export default HomeChart;