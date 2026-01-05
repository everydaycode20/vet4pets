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
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t, ready } = useTranslation(
    ["dashboard", "appointments", "sidebar"],
    { useSuspense: false }
  );

  const { data } = useQuery({
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
    refetchInterval: 30 * 60 * 1000,
  });

  if (!ready) {
    return null;
  }

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
            title={t("patientsMonth")}
            quantity={data?.month}
            data={data?.stats.monthly}
            fill="rgba(77,124,254,0.06)"
            stroke="#4D7CFE"
          />

          <ChartCard
            title={t("patientsYear")}
            quantity={data?.year}
            data={data?.stats.yearly}
            fill="rgba(109,210,48,0.06)"
            stroke="#6DD230"
          />

          <SimpleCart data={data?.appointments} />
        </section>

        <section>
          <DashboardBarChart stats={data?.stats} />
        </section>

        <section className="flex flex-col lg2:flex-row gap-[24px]">
          <TopAppointments data={data?.top} />

          <LatestPatients data={data?.appointments} />
        </section>
      </div>

      <section>
        <NextAppointments data={data?.appointments} />
      </section>
    </div>
  );
}
