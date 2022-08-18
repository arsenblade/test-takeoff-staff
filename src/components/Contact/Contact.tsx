import { useNavigate } from 'react-router'
import { useActions } from '../../hooks/useActions'
import Button from '../../ui/Button/Button'
import styles from './Contact.module.scss'
import ContactList from './ContactList/ContactList'

const Contact = () => {
  const {logout} = useActions()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className={styles.contactContainer}>
      <nav className={styles.nav}>
        <Button onClick={handleLogout}>Выйти</Button>
      </nav>
      <ContactList />
    </div>
  )
}

export default Contact