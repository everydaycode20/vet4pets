import { apiUrl } from "../../constants/apiUrl";

export default async function GetAppointments(start: string, end: string) {
  const res = await fetch(
    `${apiUrl}/appointments/date-range?start=${start}&end=${end}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  return res.json();
}
