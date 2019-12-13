import React from 'react'
import { Link } from 'react-router-dom'
import styles from './button.module.css'

const Button = ({ type, label, disabled, external, link, to, ...props }) => {
  if (disabled) {
    return <div className={styles.disabled}>{label.toUpperCase()}</div>
  } else if (link) {
    if (external) {
      return (
        <a href={to} disabled={disabled} className={styles.button} {...props}>
          {label.toUpperCase()}
        </a>
      )
    } else {
      return (
        <Link to={to} disabled={disabled} className={styles.button} {...props}>
          {label.toUpperCase()}
        </Link>
      )
    }
  } else {
    return (
      <button disabled={disabled} type={type || 'button'} className={styles.button} {...props}>
        {label.toUpperCase()}
      </button>
    )
  }
}

export default Button
