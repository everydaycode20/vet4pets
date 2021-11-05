import React, { useState, useEffect, memo, useContext } from "react";

import HomeChart from "./home_chart";

import NextAppointments from "./next_appoinments";
import { PatientMonth, PatientYear, Finished, TopAppointments } from "./home_cards";
import Skeleton from "../misc/skeleton";

import { AuthContext } from "../../utils/useAuth";

import styles from "../../styles/home/home.module.scss";

const Main = () => {

    const { auth } = useContext(AuthContext);

    const [totalPatients, setTotalPatients] = useState({year: "", month: ""});

    const [appointments, setAppointments] = useState({finished: "", upcoming: ""});

    const [topList, setTopList] = useState([]);

    const [loadingTopList, setLoadingTopList] = useState(true);

    const [latest, setLatest] = useState([]);

    const [loadingLatest, setLoadingLatest] = useState(true);
    
    useEffect(() => {

        let controller = new AbortController();

        auth.checkAuth();

        setLoadingTopList(true);

        fetch("/pet/month", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            
            setTotalPatients(prev => ({...prev, year: data.countYear, month: data.countMonth}));

        }).catch(err => console.log(err));

        fetch("/appointments/day/total", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            
            setAppointments(prev => ({...prev, finished: data.finished, upcoming: data.upcoming}));

        }).catch(err => console.log(err));

        fetch("/appointments/top", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            
            setTopList(data);
            setLoadingTopList(false);

        }).catch(err => console.log(err));

        setLoadingLatest(true);

        fetch("/appointments/latest", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            
            setLatest(data);

            setLoadingLatest(false);

        }).catch(err => console.log(err));

        return () => controller?.abort();

    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h1>Home</h1>
            </div>
            <div className={styles.info}>
                <div className={styles.charts}>
                    <div className={styles.inner}>
                        
                        <section className={styles.appointments_status}>

                            <PatientMonth totalPatients={totalPatients}/>

                            <PatientYear totalPatients={totalPatients}/>
                            
                            <Finished appointments={appointments}/>

                        </section>

                        <div className={styles.main_chart}>
                            <HomeChart />
                                <div className={styles.top_treatments}>
                                    <h2>Top appointments</h2>
                                    {loadingTopList ? <Skeleton height={32} backgroundColor={"#CDF0EA"} width={100} number={3}/> :
                                        <TopAppointments topList={topList} />
                                    }
                                </div>
                        </div>
                        
                        <div className={styles.latest_patients} style={{height: latest.length === 0 && "250px"}}>
                            <h2>Latest patients</h2>
                            {loadingLatest ? <Skeleton height={32} backgroundColor={"#CDF0EA"} width={100} number={3}/> : 
                            <ul>
                                {latest.length === 0 && <span>No patients yet.</span>}
                                {latest.map(item => {

                                    return (
                                        <li key={item.id}>
                                            <span>{item.date}</span>
                                            <span>{item.time}</span>
                                            <span>{item.namePet}</span>
                                            <span>{item.nameOwner}</span>
                                            <span>{item.appointmentName}</span>
                                        </li>
                                    )
                                })}
                            </ul> }
                        </div>
                    </div>
                </div>
                
                <NextAppointments />
            </div>
        </div>
    );

};

export default Main;