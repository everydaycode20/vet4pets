import { Tab } from "@mui/base/Tab";
import { TabsList } from "@mui/base/TabsList";
import { TabPanel } from "@mui/base/TabPanel";
import { Tabs } from "@mui/base/Tabs";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import JoinClasses from "../../utils/join-classes";

import styles from "./dashboard-bar-chart.module.scss";
import { IStats } from "../../models/dashboard.interface";

export default function DashboardBarChart({ stats }: { stats?: IStats }) {
  console.log();

  return (
    <div className={JoinClasses("bg-white", styles.container)}>
      <h2 className="text-light-gray-4">Appointments this week</h2>

      <div className={JoinClasses("bg-white", styles["bar-chart-container"])}>
        <Tabs defaultValue={1}>
          <TabsList className={JoinClasses("flex", styles["tab-list"])}>
            <Tab className="dashboard-chart" value={1}>
              Weekly
            </Tab>

            <Tab className="dashboard-chart" value={2}>
              Monthly
            </Tab>

            <Tab className="dashboard-chart" value={3}>
              Yearly
            </Tab>
          </TabsList>

          {stats === undefined && (
            <div className={JoinClasses("w-full", styles["panel-chart"])}></div>
          )}

          <TabPanel
            className={JoinClasses("w-full", styles["panel-chart"])}
            value={1}
          >
            <BChart data={stats?.weekly} datakeyBar="total" datakeyX="day" />
          </TabPanel>

          <TabPanel
            className={JoinClasses("w-full", styles["panel-chart"])}
            value={2}
          >
            <BChart data={stats?.monthly} datakeyBar="total" datakeyX="month" />
          </TabPanel>

          <TabPanel
            className={JoinClasses("w-full", styles["panel-chart"])}
            value={3}
          >
            <BChart data={stats?.yearly} datakeyBar="total" datakeyX="year" />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

function BChart({
  data,
  datakeyBar,
  datakeyX,
}: {
  data?: Record<string, any>[];
  datakeyBar: string;
  datakeyX: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={500} height={300} data={data} margin={{}}>
        <XAxis dataKey={datakeyX} axisLine={false} tickLine={false} dy={5} />

        <YAxis axisLine={false} tickLine={false} />

        <Tooltip content={<CustomToolTip />} cursor={{ fill: "transparent" }} />

        <Bar
          dataKey={datakeyBar}
          fill="#4D7CFE"
          barSize={5}
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

function CustomToolTip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className={JoinClasses("", styles.tooltip)}>
        <span>{payload[0].value} appointments</span>
      </div>
    );
  }

  return null;
}
