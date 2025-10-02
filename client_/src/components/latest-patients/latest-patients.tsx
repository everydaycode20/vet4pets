import { useLayoutEffect, useRef } from "react";
import dayjs from "dayjs";

import { JoinClasses } from "../../utils/utils";

import styles from "./latest-patients.module.scss";
import { IAppointments } from "../../models/appointments.interface";

export default function LatestPatients({ data }: { data?: IAppointments[] }) {
  const currentDateTime = dayjs();

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
    <div className={JoinClasses("bg-white dark:bg-dark-3", styles.container)}>
      <h2 className="text-light-gray-4 dark:text-dark-text" ref={titleRef}>
        Latest patients
      </h2>

      <ul className="flex flex-col overflow-y-auto" ref={list}>
        {data?.map((app, i) => {
          if (dayjs(app.date).isBefore(currentDateTime)) {
            return (
              <li
                className="text-light-gray-4 dark:text-dark-text flex justify-between"
                key={i}
              >
                <span className="text-center">
                  {dayjs(app.date).format("YYYY-MM-DD HH:mm").toString()}
                </span>

                <span className="text-center">{app.pet.name}</span>

                <span className="text-center">{app.type.name}</span>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
