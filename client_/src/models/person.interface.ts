export interface Person {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  registerDate: string;
}

export interface ITelephones {
  id: number;
  number: string;
  telephoneType: {
    id: number;
    type: string;
  };
}

export interface IOwner {
  id: number;
  name: string;
  email: string;
  address: string;
  telephones: ITelephones[];
  createdAt: string;
}
