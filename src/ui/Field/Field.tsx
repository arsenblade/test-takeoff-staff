import { forwardRef } from 'react'
import styles from './Field.module.scss'
import cn from 'classnames'
import { IField } from './Field.interface'
const uuid = require('uuid')

const Field = forwardRef<HTMLInputElement, IField>(({placeholder, error, type = 'text', style, ...rest}, ref) => {
  const id = uuid.v4()
  return (
    <div className={cn(styles.field)} style={style}>
      <label htmlFor={id}>
        <span>
          {placeholder}
        </span>
      </label>
      <input id={id} ref={ref} type={type} {...rest} />
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  )
})

Field.displayName = 'Field'

export default Field