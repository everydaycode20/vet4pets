import { useLayoutEffect, useState, useRef } from "react";

import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";

import JoinClasses from "../../utils/join-classes";

import styles from "./next-appointments.module.scss";

const data = [
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
];

const data2 = [
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
  { time: "9:00 am", owner: "Agent Smith", type: "Vaccine" },
];

export default function NextAppointments() {
  const [date, setDate] = useState("Tuesday, November 30");

  const [app, setApp] = useState<any>([]);

  const containerRef = useRef(null);

  const [hidden, setHidden] = useState(false);

  function Prev() {
    setDate("Monday, November 29");

    setApp(data2);
  }

  function Next() {
    setDate("Wednesday, December 1");

    setApp(data);
  }

  useLayoutEffect(() => {
    const containerHeight = (
      containerRef.current as unknown as HTMLDivElement
    ).getBoundingClientRect().height;

    const controlsHeight = (containerRef.current as unknown as HTMLDivElement)
      .querySelector("#controls")
      ?.getBoundingClientRect().height;

    (
      (containerRef.current as unknown as HTMLDivElement).querySelector(
        "#appointments-list"
      ) as HTMLDivElement
    ).style.height =
      containerHeight -
      (controlsHeight !== undefined ? controlsHeight : 0) +
      "px";
  }, []);

  return (
    <div
      className={JoinClasses("h-full", styles.container)}
      aria-roledescription="next appointments"
      ref={containerRef}
    >
      <div id="controls">
        <h2 className="text-light-gray-4">Next appointments</h2>

        <div
          className={JoinClasses(
            "flex items-center justify-between",
            styles.controls
          )}
          aria-live="polite"
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

          <span
            className="sr-only"
            // aria-hidden={hidden}
            // tabIndex={0}
            // onFocus={() => setHidden(true)}
            // aria-hidden="true"
          >{`${app.length} appointments`}</span>
        </div>
      </div>

      <div
        className={JoinClasses(
          "bg-white overflow-y-auto",
          styles["container-appointment-list"]
        )}
        id="appointments-list"
      >
        <ul>
          {app.map((val: any, i: any) => {
            return (
              <li key={i}>
                <div>
                  <span className="font-medium text-black">{val.type}</span>{" "}
                  <span className="text-light-gray-4">{val.time}</span>
                </div>

                <span className="text-light-gray-4">{val.owner}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
