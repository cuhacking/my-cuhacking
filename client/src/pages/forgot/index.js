import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Input, Button, Navbar } from 'components'
import useAuth from 'hooks/useAuth'
import styles from './index.module.css'

const Forgot = () => {
  const auth = useAuth()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('Enter your email address to reset your password.')
  const [validForm, setValidity] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitted, submit] = useState(false)

  useEffect(() => {
    setValidity(email.length > 0)
  }, [email])

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      setValidity(false)

      await auth.resetPassword(email)

      submit(true)
      setMessage(`An email has been sent to ${email}!`)
    } catch (error) {
      setValidity(true)
      console.log(error)
      setErrorMessage('Invalid email.')
    }
  }

  const handleChange = event => {
    setErrorMessage('')
    return setEmail(event.target.value)
  }

  return (
    <div className={styles.forgotPage}>
      <Navbar />
      <div className={styles.container}>
        <h1>Forgot Password</h1>
        <p>{message}</p>
        {isSubmitted ? (
          <Button link to='/login' label='Login' />
        ) : (
          <form className={styles.forgotContainer} onSubmit={handleSubmit}>
            <div className={styles.formPart}>
              <Input type='email' name='email' label='Email' value={email} onChange={handleChange} required={true} />
            </div>
            <p className={styles.errorMessage}>{errorMessage}</p>
            <div className={styles.formPart}>
              <Button type='submit' label='Reset Password' disabled={!validForm} />
              <p>
                <Link to='/register'>Actually, I remembered it.</Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Forgot
