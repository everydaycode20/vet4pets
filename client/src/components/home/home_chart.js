import React, {useEffect} from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import "../../styles/home/home_chart.scss";

const HomeChart = () => {

    useEffect(() => {
        console.log("mounted");
        return () => {
            console.log("unmounted");
        }
    }, []);

    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },{ name: 'Page G', uv: 3490, pv: 4300, amt: 2100,},];

    return (
        <section className="home-chart">
            <div className="header-chart">
                <h2>Appointments this week</h2>
                <div className="control-chart">
                    <button>monthly</button>
                    <button>yearly</button>
                    <button>weekly</button>
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
                        <Bar dataKey="pv" fill="#F38BA0" barSize={10}/>
                    </BarChart>
                </ResponsiveContainer>
        </section>
    );
};

export default HomeChart;