import { IUser } from "../../types/user.types";
import axios from 'axios'
import { loginPath, registerPath, usersPath } from "../../constant/serverPath";
import { saveUserStorage } from "./auth.helper";


const uuid = require("uuid");


export const AuthService = {
  async register(email: string, password: string) {
    const {data} = await axios.get<IUser[]>(usersPath(), {
      params: {
        email_like: email
      }
    })

    if(data.length > 0) {
      throw new Error('There is already a user registered');
    }
 
    const defaultUSer = {
      id: uuid.v4(),
      email: email,
      password: password,
      contacts: []
    }

    const response = await axios.post<IUser>(registerPath(), defaultUSer)

    if(response.data) saveUserStorage(response.data)

    return response
  },

  async login(email: string, password: string) {
    const response = await axios.post<IUser>(loginPath(), {email, password})

    if(!response.data) {
      throw new Error('Incorrect login or password');
    }

    if(response.data) saveUserStorage(response.data)

    return response
  },

  logout() {
    localStorage.removeItem('user')
  }
}