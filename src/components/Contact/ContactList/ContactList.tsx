import { useState } from 'react'
import Button from '../../../ui/Button/Button'
import ModalContact from '../ModalContact/ModalContact'
import ContactItem from './ContactItem'
import { useContacts } from './useContact'
import styles from './ContactList.module.scss'
import Search from '../Search/Search'

const ContactList = () => {
  const {data, searchTerm, handleSearch} = useContacts()
  const [visibleModal, setVisibleModal] = useState<boolean>(false)

  return (
    <div className={styles.containerContactList}>
      <div className={styles.containerBtn}>
        <Button className={styles.btn} onClick={() => setVisibleModal(true)}>Создать контакт</Button>
        <Search handleSearch={handleSearch} searchTerm={searchTerm}/>
      </div>
      <div className={styles.contactList}>
        {data 
          ? 
            data.length > 0
              ? 
                data.map(contact => <ContactItem key={contact.id} contact={contact} />) 
              : 
                <div className={styles.notContacts}>Контактов нет</div>
          :
            null
        }
      </div>

      {visibleModal && <ModalContact setVisibleModal={setVisibleModal}  title='Создание контакта'/>}
        
    </div>
  )
}

export default ContactList