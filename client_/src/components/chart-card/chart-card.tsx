import JoinClasses from "../../utils/join-classes";
import AreaChart from "../area-chart/area-chart";

import styles from "./chart-card.module.scss";

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

export function SimpleCart({
  finished,
  upcoming,
}: {
  finished: string | number;
  upcoming: string | number;
}) {
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
            <span className={JoinClasses("font-semibold", styles.number)}>
              {finished}
            </span>

            <span className={JoinClasses("", styles.finished)}>Finished</span>
          </div>

          <div className="flex flex-col">
            <span className={JoinClasses("font-semibold", styles.number)}>
              {upcoming}
            </span>

            <span className={JoinClasses("", styles.finished)}>Upcoming</span>
          </div>
        </div>
      </div>
    </article>
  );
}
