import { useEffect, useState } from "react";
import dayjs from "dayjs";

import JoinClasses from "../../utils/join-classes";
import AreaChart from "../area-chart/area-chart";

import styles from "./chart-card.module.scss";
import { IAppointments } from "../../models/appointments.interface";
import { useTranslation } from "react-i18next";

interface IChartCard {
  title: string;
  quantity?: string | number;
  data?: Record<string, any>[];
  fill: string;
  stroke: string;
}

export function ChartCard({ title, quantity, data, fill, stroke }: IChartCard) {
  return (
    <article
      className={JoinClasses(
        "chart-card flex flex-col sm:flex-row dark:bg-dark-3",
        styles.card
      )}
    >
      <div className="flex flex-col-reverse flex-1">
        <h2 className="font-medium dark:text-dark-text">{title}</h2>

        <p className="font-semibold dark:text-dark-text">{quantity}</p>

        {data === undefined && (
          <div className="skeleton h-[36px] w-11/12"></div>
        )}
      </div>

      <div className="flex flex-1">
        {data === undefined && (
          <div className="skeleton h-[56px] w-11/12"></div>
        )}

        {data && (
          <AreaChart data={data} fill={fill} stroke={stroke} dataKey="total" />
        )}
      </div>
    </article>
  );
}

export function SimpleCart({ data }: { data?: IAppointments[] }) {
  const currentDateTime = dayjs();

  const { t } = useTranslation(["sidebar", "dashboard"]);

  const completedAppointments = data?.filter((a) => {
    const appointmentDate = dayjs(a.date, "YYYY-MM-DD HH:mm");

    if (appointmentDate.isAfter(currentDateTime)) {
      return a;
    }
  });

  const total = data?.length;

  const [count, setCount] = useState({
    completed: data ? completedAppointments?.length : 0,
    upcoming:
      data && total && completedAppointments
        ? total - completedAppointments.length
        : 0,
  });

  useEffect(() => {
    if (data) {
      const total = data?.length;

      const completedAppointments = data?.filter((a) => {
        const appointmentDate = dayjs(a.date, "YYYY-MM-DD HH:mm");

        if (appointmentDate.isAfter(currentDateTime)) {
          return a;
        }
      });

      setCount({
        completed:
          total && completedAppointments
            ? total - completedAppointments.length
            : 0,
        upcoming: completedAppointments ? completedAppointments?.length : 0,
      });
    }
  }, [data]);

  return (
    <article
      className={JoinClasses(
        "chart-card flex flex-col sm:flex-row dark:bg-dark-3",
        styles.card
      )}
    >
      <div className="w-full">
        <h2 className="font-medium dark:text-dark-text">{t("appointments")}</h2>

        <div className="flex justify-between">
          <div className="flex flex-col">
            {!data && <div className="skeleton h-[36px]"></div>}

            {data && (
              <span
                className={JoinClasses(
                  "font-semibold dark:text-dark-text",
                  styles.number
                )}
              >
                {count.completed}
              </span>
            )}

            <span
              className={JoinClasses("dark:text-dark-text", styles.finished)}
            >
              {t("appFinished", { ns: "dashboard" })}
            </span>
          </div>

          <div className="flex flex-col">
            {!data && <div className="skeleton h-[36px]"></div>}

            {data && (
              <span
                className={JoinClasses(
                  "font-semibold dark:text-dark-text",
                  styles.number
                )}
              >
                {count.upcoming}
              </span>
            )}

            <span
              className={JoinClasses("dark:text-dark-text", styles.finished)}
            >
              {t("appUpcoming", { ns: "dashboard" })}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
