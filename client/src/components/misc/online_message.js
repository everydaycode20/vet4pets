import React from "react";

import styles from "../../styles/online_message.module.scss";

const OnlineMessage = () => {


    return (
        <div className={styles.container}>
            <span>There is not internet, check your connection</span>
        </div>
    );


};

export default OnlineMessage;