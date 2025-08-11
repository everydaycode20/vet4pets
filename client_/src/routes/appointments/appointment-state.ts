import { atom } from "jotai";

export const addAppointmentState = atom(false);

interface IOptions {
  mode?: "calendar" | "button";
  timeStart?: Date;
  timeEnd?: Date;
  day?: Date;
}

export const options = atom<IOptions>({
  day: undefined,
  timeEnd: undefined,
  timeStart: undefined,
});
