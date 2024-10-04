export interface IFormPet {
  name: string;
  owner: { id: number; name: string };
  age: number | undefined;
  type: { id: number; name: string };
  registerDate: Date;
}
