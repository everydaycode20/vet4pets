export default interface IFormAppointment {
  type: {
    id: number;
    name: string;
  };
  owner: {
    id: number;
    name: string;
  };
  pet: {
    id: number;
    name: string;
  };
  date: {
    start: Date;
    end: Date;
    selectedDate: Date;
  };
}
