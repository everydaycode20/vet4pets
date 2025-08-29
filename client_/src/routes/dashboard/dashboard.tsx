import { useQuery } from "@tanstack/react-query";
import { ChartCard, SimpleCart } from "../../components/chart-card/chart-card";

import JoinClasses from "../../utils/join-classes";

import NextAppointments from "../../components/next-appointments/next-appointments";
import DashboardBarChart from "../../components/dashboard-bar-chart/dashboard-bar-chart";
import TopAppointments from "../../components/top-appointments/top-appointments";
import LatestPatients from "../../components/latest-patients/latest-patients";

import { apiUrl } from "../../constants/apiUrl";

import styles from "./dashboard.module.scss";
import { IDashboard } from "../../models/dashboard.interface";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Dashboard() {
  const { data, ...rest } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async (): Promise<IDashboard> => {
      const res = await fetch(`${apiUrl}/Appointments/dashboard`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      return await res.json();
    },
    // refetchInterval: 30 * 60 * 1000,
  });

  return (
    <div
      className={JoinClasses(
        "grid gap-[24px] h-full",
        styles["dashboard-container"]
      )}
    >
      <div className="w-full">
        <section className="grid grid-cols-1 sm2:grid-cols-2 lg:grid-cols-1 lg2:grid-cols-2 gap-[24px] w-full h-fit">
          <ChartCard
            title="Patients this month"
            quantity={data?.month}
            data={data?.stats.monthly}
            fill="rgba(77,124,254,0.06)"
            stroke="#4D7CFE"
          />

          <ChartCard
            title="Patients this year"
            quantity={data?.year}
            data={data?.stats.yearly}
            fill="rgba(109,210,48,0.06)"
            stroke="#6DD230"
          />

          <SimpleCart finished={1} upcoming={4} />
        </section>

        <section>
          <DashboardBarChart stats={data?.stats} />
        </section>

        <section className="flex flex-col lg2:flex-row gap-[24px]">
          <TopAppointments data={data?.top} />

          <LatestPatients />
        </section>
      </div>

      <section>
        <NextAppointments data={data?.appointments} />
      </section>
    </div>
  );
}
