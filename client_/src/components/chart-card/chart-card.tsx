import JoinClasses from "../../utils/join-classes";
import AreaChart from "../area-chart/area-chart";

import styles from "./chart-card.module.scss";

interface IChartCard {
  title: string;
  quantity: string | number;
  data: Record<string, any>[];
  fill: string;
  stroke: string;
}

export default function ChartCard({
  title,
  quantity,
  data,
  fill,
  stroke,
}: IChartCard) {
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
      </div>

      <AreaChart data={data} fill={fill} stroke={stroke} dataKey="uv" />
    </article>
  );
}
