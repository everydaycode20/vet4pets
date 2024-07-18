import { AreaChart } from "../../components/tremor-charts/area-chart";
import JoinClasses from "../../utils/join-classes";

import styles from "./chart-card.module.scss";

interface IChartCard {
  title: string;
  quantity: string | number;
  data: Record<string, any>[];
}

export default function ChartCard({ title, quantity, data }: IChartCard) {
  return (
    <article className={JoinClasses("chart-card flex", styles.card)}>
      <div className="flex flex-col-reverse flex-1">
        <h2 className="font-medium">{title}</h2>

        <p className="font-semibold">{quantity}</p>
      </div>

      <AreaChart
        className={JoinClasses("flex-1 test-chart", styles["chart"])}
        data={data}
        index="date"
        categories={["SolarPanels"]}
        valueFormatter={(number: number) =>
          `$${Intl.NumberFormat("us").format(number).toString()}`
        }
        onValueChange={(v: any) => console.log(v)}
        xAxisLabel=""
        yAxisLabel=""
        fill="solid"
        showGridLines={false}
        showXAxis={false}
        showYAxis={false}
        showTooltip={false}
        showLegend={false}
        colors={["gray"]}
      />
    </article>
  );
}
