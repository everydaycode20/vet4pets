import { useEffect, useState } from "react";
import dayjs from "dayjs";

import JoinClasses from "../../utils/join-classes";
import AreaChart from "../area-chart/area-chart";

import styles from "./chart-card.module.scss";
import { IAppointments } from "../../models/appointments.interface";

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
        "chart-card flex flex-col sm:flex-row",
        styles.card
      )}
    >
      <div className="flex flex-col-reverse flex-1">
        <h2 className="font-medium">{title}</h2>

        <p className="font-semibold">{quantity}</p>

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

  const completedAppointments = data?.filter((a) => {
    const appointmentDate = dayjs(a.date, "YYYY-MM-DD HH:mm");

    console.log(currentDateTime, dayjs(a.date));

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
        console.log(a.date);

        const appointmentDate = dayjs(a.date, "YYYY-MM-DD HH:mm");

        console.log(currentDateTime, a.date);

        if (appointmentDate.isAfter(currentDateTime)) {
          return a;
        }
      });

      setCount({
        completed: completedAppointments ? completedAppointments?.length : 0,
        upcoming:
          total && completedAppointments
            ? total - completedAppointments.length
            : 0,
      });
    }
  }, [data]);

  return (
    <article
      className={JoinClasses(
        "chart-card flex flex-col sm:flex-row",
        styles.card
      )}
    >
      <div className="w-full">
        <h2 className="font-medium">Appointments</h2>

        <div className="flex justify-between">
          <div className="flex flex-col">
            {!data && <div className="skeleton h-[36px]"></div>}

            {data && (
              <span className={JoinClasses("font-semibold", styles.number)}>
                {count.completed}
              </span>
            )}

            <span className={JoinClasses("", styles.finished)}>Finished</span>
          </div>

          <div className="flex flex-col">
            {!data && <div className="skeleton h-[36px]"></div>}

            {data && (
              <span className={JoinClasses("font-semibold", styles.number)}>
                {count.upcoming}
              </span>
            )}

            <span className={JoinClasses("", styles.finished)}>Upcoming</span>
          </div>
        </div>
      </div>
    </article>
  );
}
