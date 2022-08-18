import { IContact } from "../../types/user.types"

export interface IUserState {
  email: string,
  id: string
}

export interface IInitialState {
  user: IUserState | null,
  isLoading: boolean,
  error: string | null
}

export interface IEmailPassword {
  email: string,
  password: string
}