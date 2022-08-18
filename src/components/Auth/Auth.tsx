import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import AuthFields from './AuthFields'
import styles from './Auth.module.scss'
import Button from '../../ui/Button/Button'
import { useAuth } from '../../hooks/useAuth'
import { useActions } from '../../hooks/useActions'
import { useNavigate } from 'react-router'

interface IAuthInput {
  email: string,
  password: string
}

const Auth:FC = () => {
  const {user, isLoading} = useAuth()
  const navigate = useNavigate()
  const {register: registerInput, handleSubmit, formState, reset} = useForm<IAuthInput>({
    mode: 'onChange'
  })
  const [type, setType] = useState<'login' | 'register'>('login')
  const {login, register} = useActions()
  const onSubmit:SubmitHandler<IAuthInput> = (data) => {
    if(type === 'login') login(data)
    else if(type === 'register') register(data)
    reset()
  }

  useEffect(() => {
    if(user) {
      navigate('/contact')
    }
    else {
      navigate('/')
    }
  }, [user])

  return (
    !user ?  
      <div className={styles.authContainer}>
        <form className={styles.auth} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={styles.header}>Authorization</h1>
          <AuthFields formState={formState} register={registerInput} isPasswordRequired/>
          <div className={styles.buttonContainer}>
            <Button type='submit' onClick={() => setType('login')} disabled={isLoading}>Войти</Button>
            <Button type='submit' onClick={() => setType('register')} disabled={isLoading}>Зарегистрироваться</Button>
          </div>
        </form>
      </div>
    : 
      null
  )
}

export default Auth