

import ArrowLeft from "../../assets/arrow_left_.svg";

const NextAppointments = () => {

    const data = [{"appointmentType": "vaccine", "time": "08:00-08:30", "customer": "name last name"}, {"appointmentType": "vaccine", "time": "08:00-08:30", "customer": "name last name"}, {"appointmentType": "vaccine", "time": "08:00-08:30", "customer": "name last name"}, {"appointmentType": "vaccine", "time": "08:00-08:30", "customer": "name last name"}, {"appointmentType": "vaccine", "time": "08:00-08:30", "customer": "name last name"}, {"appointmentType": "vaccine", "time": "08:00-08:30", "customer": "name last name"}, {"appointmentType": "vaccine", "time": "08:00-08:30", "customer": "name last name"}, {"appointmentType": "vaccine", "time": "08:00-08:30", "customer": "name last name"}, {"appointmentType": "vaccine", "time": "08:00-08:30", "customer": "name last name"}];

    return (
        <section className="next-appointment-list">
            <h2>Next appointments</h2>
            <div className="controls-appointment-list">
                <button ><img style={{transform: "rotateY(180deg)"}} src={ArrowLeft} alt="previous" /></button>
                <span>Tuesday 14</span>
                <button ><img src={ArrowLeft} alt="next" /></button>
            </div>
            <ul className="list-appointment">
                {data.map((item, index) => {

                    return (
                        <li>
                            <span key={index}>{item.appointmentType}</span>
                            <div>
                                <span>{item.time}</span>
                                <span>{item.customer}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    );

};

export default NextAppointments;