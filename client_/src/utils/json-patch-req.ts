import dayjs from "dayjs";
import IFormAppointment from "../models/form-appointment.interface";

export default function MakeJsonPatchRequest(data: IFormAppointment) {
  const arr = [];

  for (const key in data) {
    if (key === "type" || key === "owner" || key === "pet") {
      let obj = { op: "replace", path: `/${key}Id`, value: data[key].id };

      arr.push(obj);
    } else if (key === "date") {
      for (const k in data[key]) {
        if (k !== "selectedDate") {
          let obj = {
            op: "replace",
            path: `/${k === "start" ? "Date" : "EndDate"}`,
            value:
              k === "start"
                ? dayjs(data[key].start).format("YYYY-MM-DD HH:mm")
                : dayjs(data[key].end).format("YYYY-MM-DD HH:mm"),
          };

          console.log(dayjs(data[key].start).format("YYYY-MM-DD HH:mm"));

          arr.push(obj);
        }
      }
    }
  }

  console.log(arr);

  return arr;
}
