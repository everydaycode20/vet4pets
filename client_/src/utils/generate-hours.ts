import dayjs from "dayjs";

export default function GenerateHours(
  is12h: boolean,
  intervalMinutes: number = 30
) {
  const hours = [];

  const intervalHours = (24 * 60) / intervalMinutes;

  for (let i = 0; i < intervalHours; i++) {
    const time = dayjs()
      .startOf("day")
      .add(i * intervalMinutes, "minute");

    hours.push(time.format(is12h ? "hh:mm a" : "HH:mm"));
  }

  return hours;
}
