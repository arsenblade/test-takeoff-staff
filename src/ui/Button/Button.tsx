import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import cn from 'classnames'
import styles from './Button.module.scss'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement>  {
  children: ReactNode
}

const Button:FC<IButton> = ({children, className, ...rest}) => {
  return (
    <button className={cn(styles.button, className)} {...rest}>
      {children}
    </button>
  )
}

export default Button