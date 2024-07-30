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

export default function DashboardBarChart() {
  return (
    <div>
      <h2>Appointments this week</h2>

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

          <TabPanel
            className={JoinClasses("w-full", styles["panel-chart"])}
            value={1}
          >
            <BChart />
          </TabPanel>

          <TabPanel value={2}>Second page</TabPanel>

          <TabPanel value={3}>Third page</TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

const data = [
  {
    name: "Monday",
    value: 5,
  },
  {
    name: "Tuesday",
    value: 3,
  },
  {
    name: "Wednesday",
    value: 10,
  },
  {
    name: "Thursday",
    value: 12,
  },
  {
    name: "Friday",
    value: 4,
  },
  {
    name: "Saturday",
    value: 2,
  },
];

function BChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={500} height={300} data={data} margin={{}}>
        <XAxis dataKey="name" axisLine={false} tickLine={false} dy={5} />

        <YAxis axisLine={false} tickLine={false} />

        <Tooltip content={<CustomToolTip />} cursor={{ fill: "transparent" }} />

        <Bar dataKey="value" fill="#4D7CFE" barSize={5} radius={[8, 8, 0, 0]} />
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
