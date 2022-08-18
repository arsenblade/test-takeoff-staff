export interface IUser {
  id: string,
  email: string,
  password: string
  contacts: IContact[]
}

export interface IContact {
  id: string;
  name: string,
  phone: string,
}