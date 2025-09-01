export interface Person {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  registerDate: string;
}

export interface IOwner {
  id: number;
  name: string;
  email: string;
  address: string;
  telephones: {
    id: number;
    telephoneType: {
      id: number;
      type: string;
    };
  }[];
  createdAt: string;
}
