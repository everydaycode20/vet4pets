import React, { useState, useEffect } from "react";

// import RecordsList from "./recordList";
import Header from "./header";
import MedicalRecordsOptions from "./medical_records_options";
import RecordList from "./records_list";

import "../../styles/medical_records/medical_records.scss";

const MedicalRecords = () => {

    return (
        <div className="main-medical-record-container">
            <Header/>
            <MedicalRecordsOptions/>
            <RecordList />
        </div>
    );

};

export default MedicalRecords;