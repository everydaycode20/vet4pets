import { IOwner } from "./person.interface";
import { IPet } from "./pet.interface";

export interface IAppointments {
  id: number;
  date: string;
  owner: IOwner;
  type: {
    id: number;
    name: string;
  };
  completed: boolean;
  pet: IPet;
}
