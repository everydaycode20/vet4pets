import { useLayoutEffect, useRef } from "react";
import dayjs from "dayjs";

import { JoinClasses } from "../../utils/utils";

import styles from "./latest-patients.module.scss";
import { IAppointments } from "../../models/appointments.interface";

export default function LatestPatients({ data }: { data?: IAppointments[] }) {
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
        {data?.map((app, i) => {
          return (
            <li className="text-light-gray-4 flex justify-between" key={i}>
              <span className="text-center">{app.date}</span>

              <span className="text-center">
                {dayjs(app.date, "YYYY-MM-DD HH:mm").toString()}
              </span>

              <span className="text-center">{app.pet.name}</span>

              <span className="text-center">{app.type.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
