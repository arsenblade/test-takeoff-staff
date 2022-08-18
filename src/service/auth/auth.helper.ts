import { IUser } from "../../types/user.types"

export const saveUserStorage = (user: IUser) => {
  localStorage.setItem('user', JSON.stringify({
    email: user.email,
    id: user.id,
  }))
}