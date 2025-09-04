import { atom } from "jotai";

export const addAppointmentState = atom(false);

interface IOptions {
  mode?: "calendar" | "button";
  start?: Date;
  end?: Date;
  color?: string;
  day?: any;
}

export const options = atom<IOptions>({
  end: undefined,
  start: undefined,
  color: undefined,
});
