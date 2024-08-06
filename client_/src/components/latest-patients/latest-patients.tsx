import { useLayoutEffect, useRef } from "react";

import { JoinClasses } from "../../utils/utils";

import styles from "./latest-patients.module.scss";

const data = [
  {
    date: "2021-12-02",
    time: "11:00:00",
    petName: "akira",
    ownerName: "new name",
    appointmentType: "general checkup",
  },
  {
    date: "2021-12-02",
    time: "11:00:00",
    petName: "akira",
    ownerName: "new name",
    appointmentType: "general checkup",
  },
  {
    date: "2021-12-02",
    time: "11:00:00",
    petName: "akira",
    ownerName: "new name",
    appointmentType: "dental cleaning",
  },
  {
    date: "2021-12-02",
    time: "11:00:00",
    petName: "akira",
    ownerName: "new name",
    appointmentType: "vaccine",
  },
  {
    date: "2021-12-02",
    time: "11:00:00",
    petName: "akira",
    ownerName: "new name",
    appointmentType: "vaccine",
  },
  {
    date: "2021-12-02",
    time: "11:00:00",
    petName: "akira",
    ownerName: "new name",
    appointmentType: "vaccine",
  },
  {
    date: "2021-12-02",
    time: "11:00:00",
    petName: "akira",
    ownerName: "new name",
    appointmentType: "vaccine",
  },
  {
    date: "2021-12-02",
    time: "11:00:00",
    petName: "akira",
    ownerName: "new name",
    appointmentType: "vaccine",
  },
  {
    date: "2021-12-02",
    time: "11:00:00",
    petName: "akira",
    ownerName: "new name",
    appointmentType: "vaccine",
  },
];

export default function LatestPatients() {
  const titleRef = useRef(null);

  const list = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const titleHeight = (
      titleRef.current as unknown as HTMLDivElement
    ).getBoundingClientRect().height;

    list.current &&
      (list.current.style.height = `calc(100% - ${titleHeight}px)`);
  }, []);

  return (
    <div className={JoinClasses("bg-white", styles.container)}>
      <h2 className="text-light-gray-4" ref={titleRef}>
        Latest patients
      </h2>

      <ul className="flex flex-col overflow-y-auto" ref={list}>
        {data.map((app, i) => {
          return (
            <li className="text-light-gray-4 flex justify-between" key={i}>
              <span className="text-center">{app.date}</span>

              <span className="text-center">{app.time}</span>

              <span className="text-center">{app.petName}</span>

              <span className="text-center">{app.appointmentType}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
