import { FC, useState } from 'react'
import { IContact } from '../../../types/contacts.types'
import Button from '../../../ui/Button/Button'
import { useContacts } from './useContact'
import styles from './ContactList.module.scss'
import ModalContact from '../ModalContact/ModalContact'

interface ContactProps {
  contact: IContact
}

const ContactItem:FC<ContactProps> = ({contact}) => {
  const {deleteAsync} = useContacts()
  const [visibleModal, setVisibleModal] = useState<boolean>(false)

  return (
    <div className={styles.contact}>
      <h2>
        <span>Имя: </span>
        {contact.name}
      </h2>
      <h2>
        <span>Телефон: </span>
        {contact.phone}
      </h2>
      <div className={styles.containerBtn}>
        <Button onClick={() => setVisibleModal(true)}>Редактировать</Button>
        <Button onClick={() => deleteAsync(contact)}>Удалить</Button>
      </div>

      {visibleModal && <ModalContact setVisibleModal={setVisibleModal}  title='Редактирование контакта' contact={contact}/>}
    </div>
  )
}

export default ContactItem