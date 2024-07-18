import ChartCard from "../../components/chart-card/chart-card";

const chartdata = [
  {
    date: "Jan 23",
    SolarPanels: 2890,
  },
  {
    date: "Feb 23",
    SolarPanels: 2756,
  },
  {
    date: "Mar 23",
    SolarPanels: 3322,
  },
  {
    date: "Apr 23",
    SolarPanels: 3470,
  },
  {
    date: "May 23",
    SolarPanels: 3475,
  },
  {
    date: "Jun 23",
    SolarPanels: 3129,
  },
  {
    date: "Jul 23",
    SolarPanels: 3490,
  },
  {
    date: "Aug 23",
    SolarPanels: 2903,
  },
  {
    date: "Sep 23",
    SolarPanels: 2643,
  },
  {
    date: "Oct 23",
    SolarPanels: 2837,
  },
  {
    date: "Nov 23",
    SolarPanels: 2954,
  },
  {
    date: "Dec 23",
    SolarPanels: 3239,
  },
  {
    date: "Dec 23",
    SolarPanels: 3239,
  },
  {
    date: "Dec 23",
    SolarPanels: 3239,
  },
  {
    date: "Dec 23",
    SolarPanels: 2039,
  },
  {
    date: "Dec 23",
    SolarPanels: 2509,
  },
  {
    date: "Dec 23",
    SolarPanels: 3020,
  },
];

export default function Dashboard() {
  return (
    <div>
      <section>
        <ChartCard title="Patients this month" quantity={25} data={chartdata} />
      </section>
    </div>
  );
}
