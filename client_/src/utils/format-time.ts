export default function formatTime(time: string) {
  const str = time.split(":");

  const hour = parseInt(str[0]) >= 13 ? parseInt(str[0]) : parseInt(str[0]);
  const minutes = parseInt(str[1]);
  const timeOfDay = new Date(0, 0, 0, hour, minutes)
    .toLocaleTimeString()
    .split(" ")[1]
    .toLowerCase();

  return `${hour >= 13 ? hour - 12 : hour}:${minutes
    .toString()
    .padEnd(2, "0")} ${timeOfDay}`;
}
