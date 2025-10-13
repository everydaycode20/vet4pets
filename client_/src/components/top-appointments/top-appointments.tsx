import { useLayoutEffect, useRef } from "react";

import { JoinClasses } from "../../utils/utils";

import styles from "./top-appointments.module.scss";
import { useTranslation } from "react-i18next";

export default function TopAppointments({
  data,
}: {
  data?: { id: number; name: string; total: number }[];
}) {
  const titleRef = useRef(null);

  const list = useRef<HTMLUListElement>(null);

  const { t } = useTranslation(["appointments", "sidebar"]);

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
        Top {t("appointments", { ns: "sidebar" })}
      </h2>

      <ul className="flex flex-col overflow-y-auto" ref={list}>
        {data?.map((app, i) => {
          return (
            <li className="text-light-gray-4 dark:text-dark-text" key={i}>
              {t(app.name.toLowerCase())}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
