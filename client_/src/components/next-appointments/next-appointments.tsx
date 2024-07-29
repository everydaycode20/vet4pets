import { useState } from "react";

import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";

import JoinClasses from "../../utils/join-classes";
import styles from "./next-appointments.module.scss";

export default function NextAppointments() {
  const [date, setDate] = useState("Tuesday, November 30");

  function Prev() {
    setDate("Monday, November 29");
  }

  function Next() {
    setDate("Wednesday, December 1");
  }

  return (
    <div
      className={styles.container}
      aria-roledescription="next appointments"
      aria-live="polite"
    >
      <h2 className="text-light-gray-4">Next appointments</h2>

      <div
        className={JoinClasses(
          "flex items-center justify-between",
          styles.controls
        )}
      >
        <button type="button" onClick={Prev}>
          <span className="sr-only">previous date</span>

          <NavigateNextOutlinedIcon htmlColor="#778CA2" />
        </button>

        <div
          className={JoinClasses(
            "flex items-center justify-center w-full",
            styles.date
          )}
        >
          <span className="font-medium">{date}</span>
        </div>

        <button type="button" onClick={Next}>
          <span className="sr-only">next date</span>

          <NavigateNextOutlinedIcon htmlColor="#778CA2" />
        </button>
      </div>
    </div>
  );
}
