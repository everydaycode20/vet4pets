import React, { useState, useEffect } from "react";

import "../../styles/medical_records/medical_records.scss";

const RecordList = () => {

    const arr = [{"owner": "name lastName", "pet": "pet name"}, {"owner": "name lastName", "pet": "pet name"}, {"owner": "name lastName", "pet": "pet name"}, {"owner": "name lastName", "pet": "pet name"}, {"owner": "name lastName", "pet": "pet name"}, {"owner": "name lastName", "pet": "pet name"}, {"owner": "name lastName", "pet": "pet name"}, {"owner": "name lastName", "pet": "pet name"}];

    return (
        <section className="main-record-list-container">
            {arr.map((record, index) => {

                return (
                    <article key={index} className="record-container">
                        <div className="record-info">
                            <h3>{record.owner}</h3>
                            <span>{record.pet}</span>
                        </div>
                        <button className="dot-container">
                            <div className="dot"/>
                            <div className="dot"/>
                            <div className="dot"/>
                        </button>
                    </article>
                )
            })}
        </section>
    );

};

export default RecordList;