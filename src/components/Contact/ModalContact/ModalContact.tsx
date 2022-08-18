import { Dispatch, FC, SetStateAction, useState } from 'react'
import { IContact } from '../../../types/contacts.types'
import Button from '../../../ui/Button/Button'
import { useContacts } from '../ContactList/useContact'
import styles from './ModalContact.module.scss'

const uuid = require('uuid')

interface ModalContactProps {
  title: 'Редактирование контакта' | 'Создание контакта',
  setVisibleModal: Dispatch<SetStateAction<boolean>>,
  contact? : IContact
}

const ModalContact:FC<ModalContactProps> = ({setVisibleModal, title, contact}) => {
  const [nameValue, setNameValue] = useState(contact?.name || '')
  const {createAsync, mutateAsync} = useContacts()
  const [phoneValue, setPhoneValue] = useState(contact?.phone || '')

  const handleSave = () => {
    if(title === 'Создание контакта') {
      const defaultContact: IContact = {
        id: uuid.v4(),
        name: nameValue,
        phone: phoneValue
      }

      createAsync(defaultContact)
      setVisibleModal(false)
    }
    else if (title === 'Редактирование контакта') {
      const updatingContact: IContact = {
        id: contact?.id || uuid.v4(),
        name: nameValue,
        phone: phoneValue
      }

      mutateAsync(updatingContact)
      setVisibleModal(false)
    }
  }

  return (
    <div className={styles.modalContainer} onClick={() => setVisibleModal(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.header}>{title}</h2>
        <div className={styles.containerInput}>
          <label htmlFor='nameContact'>Имя</label>
          <input id='nameContact' value={nameValue} onChange={(e) => setNameValue(e.target.value)}/>
        </div>
        <div className={styles.containerInput}>
          <label htmlFor='phone'>Телефон</label>
          <input id='phone' maxLength={11} value={phoneValue} onChange={(e) => setPhoneValue(e.target.value)}/>
        </div>
        <div className={styles.containerBtn}>
          <Button onClick={() => handleSave()}>Сохранить</Button>
          <Button onClick={() => setVisibleModal(false)}>Отменить</Button>
        </div>
      </div>
    </div>
  )
}

export default ModalContact