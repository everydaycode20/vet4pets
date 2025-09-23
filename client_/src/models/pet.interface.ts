import { IOwner } from "./person.interface";

export interface IPetType {
  id: number;
  description: string;
  breed: { id: number; description: string };
}

export interface IPet {
  id: number;
  name: string;
  age: number;
  petType: IPetType;
  owner: IOwner;
}
