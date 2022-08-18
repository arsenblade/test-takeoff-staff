import axios from 'axios'
import { contactPath } from "../../constant/serverPath";
import { IContact } from "../../types/contacts.types";
import { IUser } from '../../types/user.types';

export const ContactService = {
  async getAll(userId: string, searchItem?: string){
    const response = await axios.get<IUser>(contactPath(userId))

    const filteredContacts = response.data.contacts?.filter(contact => contact.name.includes(searchItem || '') || contact.phone.includes(searchItem || ''))

    return filteredContacts
  },

  async create(contact: IContact, userId: string) {
    const {data} = await axios.get<IUser>(contactPath(userId))
    data.contacts.push(contact)
    const response = await axios.put<IUser>(contactPath(userId), data)
    return response
  },

  async update(contact: IContact, userId: string) {
    const {data} = await axios.get<IUser>(contactPath(userId))
    data.contacts = data.contacts?.map(c => {
      if(c.id === contact.id) {
        c.name = contact.name
        c.phone = contact.phone
        return c
      }
      else {
        return c
      }
    })

    const response = await axios.put<IUser>(contactPath(userId), data)

    return response
  },

  async delete(contact: IContact, userId: string) {
    const {data} = await axios.get<IUser>(contactPath(userId))
    data.contacts = data.contacts?.filter(c => c.id !== contact.id)
    const response = await axios.put<IUser>(contactPath(userId), data)

    return response
  }
}