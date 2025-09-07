import { atom } from "jotai";
import { IAppointments } from "../../models/appointments.interface";

export const addAppointmentState = atom(false);

interface IOptions {
  mode?: "calendar" | "button";
  start?: Date;
  end?: Date;
  color?: string;
  day?: any;
  edit?: boolean;
  appointment?: IAppointments;
}

export const options = atom<IOptions>({
  end: undefined,
  start: undefined,
  color: undefined,
});
