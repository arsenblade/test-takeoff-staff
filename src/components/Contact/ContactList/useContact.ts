import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useAuth } from "../../../hooks/useAuth"
import { useDebounce } from "../../../hooks/useDebounce"
import { ContactService } from "../../../service/contacts/contacts.service"
import { IContact } from "../../../types/contacts.types"
import { MyToast } from "../../../ui/MyToast/MyToast"

export const useContacts = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)
  const {user} = useAuth()

  const queryData = useQuery(['contact list', debouncedSearch], () => 
  ContactService.getAll(user?.id || '', debouncedSearch), {
    onError: () => {
      MyToast('Error contact list', false)
    }
  })

  const { mutateAsync: createAsync } = useMutation(
  'create contact',
  ( contact: IContact) => ContactService.create(contact, user?.id || ''),
  {
    onError() {
      MyToast('Error create', false)
    },
    onSuccess() {
      MyToast('Create was successful', true)
      queryData.refetch()
    },
  })

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const { mutateAsync: deleteAsync } = useMutation(
    'delete contact',
    (contact: IContact) => ContactService.delete(contact, user?.id || ''),
    {
      onError() {
        MyToast('Error delete', false)
      },
      onSuccess() {
        MyToast('Delete was successful', true)
        queryData.refetch()
      },
    }
  )

  const { mutateAsync } = useMutation(
    'update contact',
    (contact: IContact) => ContactService.update(contact, user?.id || ''),
    {
      onError() {
        MyToast('Error update', false)
      },
      onSuccess() {
        MyToast('Update was successful', true)
        queryData.refetch()
      },
    }
  )
  
  return useMemo(() => ({
    ...queryData,
    mutateAsync,
    deleteAsync,
    createAsync,
    handleSearch,
    searchTerm
  }), [createAsync, deleteAsync, queryData, mutateAsync, searchTerm])
}