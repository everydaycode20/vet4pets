import { IAppointments } from "./appointments.interface";
import { IOwner } from "./person.interface";
import { IPet } from "./pet.interface";

export interface IStats {
  weekly: {
    day: string;
    total: 14;
  }[];
  monthly: {
    month: string;
    total: number;
  }[];
  yearly: {
    year: string;
    total: number;
  }[];
}

export interface IDashboard {
  month: number;
  year: number;
  appointments: IAppointments[];
  pet: IPet;
  owner: IOwner;
  top: { id: number; name: string; total: number }[];
  stats: IStats;
}
