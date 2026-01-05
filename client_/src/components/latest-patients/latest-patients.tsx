import { useLayoutEffect, useRef } from "react";
import dayjs from "dayjs";

import { JoinClasses } from "../../utils/utils";

import styles from "./latest-patients.module.scss";
import { IAppointments } from "../../models/appointments.interface";
import { useTranslation } from "react-i18next";

export default function LatestPatients({ data }: { data?: IAppointments[] }) {
  const { t } = useTranslation("appointments", { useSuspense: false });

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
        {t("latestPatients")}
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

                <span className="text-center">
                  {t(app.type.name.toLowerCase())}
                </span>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
