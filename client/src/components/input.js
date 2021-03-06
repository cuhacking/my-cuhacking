import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import styles from './input.module.css'

const Input = ({ label, inputStyle, options = [], ...props }) => {
  switch (inputStyle) {
    case 'checkbox':
      return (
        <label className={styles.checkInput}>
          <input className={styles.checkbox} type='checkbox' {...props} />
          <i className={styles.checkBoxLabel}>{label}</i>
        </label>
      )
    case 'select':
      return (
        <div className={styles.inputContainer}>
          <p className={styles.label}>{label}</p>
          <div className={styles.selectContainer}>
            <select className={styles.selectInput} label={label} {...props}>
              {options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FontAwesomeIcon className={styles.selectIcon} icon={faChevronDown} size='lg' />
          </div>
        </div>
      )
    case 'long':
      return (
        <div className={styles.inputContainer}>
          <p className={styles.label}>{label}</p>
          <textarea className={styles.longInput} rows={4} label={label} {...props} />
        </div>
      )
    default:
      return (
        <div className={styles.inputContainer}>
          <p className={styles.label}>{label}</p>
          <input className={styles.input} label={label} {...props} />
        </div>
      )
  }
}

export default Input
