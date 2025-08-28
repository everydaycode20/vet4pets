import { IOwner } from "./person.interface";

export interface IAppointments {
  id: number;
  date: string;
  owner: IOwner;
}
