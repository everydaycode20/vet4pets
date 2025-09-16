export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  registerDate: string;
}

export interface ITelephoneType {
  id: number;
  type: string;
}

export interface ITelephones {
  id: number;
  number: string;
  telephoneType: ITelephoneType;
}

export interface IOwner {
  id: number;
  name: string;
  email?: string;
  address?: string;
  telephones?: ITelephones[];
  createdAt?: string;
}
