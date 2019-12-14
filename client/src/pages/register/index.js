import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import zxcvbn from 'zxcvbn'
import { Input, Button, Navbar, Password } from 'components'
import useAuth from 'hooks/useAuth'
import styles from './index.module.css'

const PasswordStrengthMeter = ({ password }) => {
  const strength = password.length >= 8 ? zxcvbn(password).score : -1

  const label = strength => {
    switch (strength) {
      case -1:
        return 'Too short'
      case 2:
        return 'Fair'
      case 3:
        return 'Good'
      case 4:
        return 'Strong'
      case 0:
      case 1:
      default:
        return 'Weak'
    }
  }

  return (
    <div className={styles.passwordStrengthMeter}>
      <br />
      Password strength
      <br />
      <strong>{label(strength)}</strong>
    </div>
  )
}

const Register = () => {
  const auth = useAuth()
  const [validForm, setValidity] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Side effect which enables the login button if the condition is met
  useEffect(() => {
    setValidity(email.length > 0 && password.length >= 8 && password === confirmation)
  }, [email, password, confirmation])

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await auth.register(email, password)
      if (auth.user) {
        console.log('YAY')
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          return setErrorMessage('That email is already in use.')
        case 'auth/invalid-email':
          return setErrorMessage('That email is invalid.')
        case 'auth/weak-password':
          return setErrorMessage('Your password is too weak.')
        default:
          return setErrorMessage('Uh oh! Something went wrong.')
      }
    }
  }

  const handleChange = event => {
    setErrorMessage('')
    const { name, value } = event.target

    switch (name) {
      case 'email':
        return setEmail(value)
      case 'pw':
        return setPassword(value)
      case 'pw2':
        return setConfirmation(value)
      default:
        return
    }
  }

  return (
    <div className={styles.registerPage}>
      <Helmet>
        <title>Register | My cuHacking</title>
      </Helmet>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.logo} />
        <form className={styles.registerContainer} onSubmit={handleSubmit}>
          <div className={styles.formPart}>
            <Input
              placeholder='example@domain.com'
              name='email'
              type='email'
              label='Email'
              value={email}
              onChange={handleChange}
              required={true}
            />
            <Password
              placeholder='Password'
              name='pw'
              label='Create a password. (Minimum 8 characters)'
              value={password}
              onChange={handleChange}
              required={true}
            />
            <Password
              placeholder='Confirm'
              name='pw2'
              label='Confirm your password.'
              value={confirmation}
              onChange={handleChange}
              required={true}
            />
            <PasswordStrengthMeter password={password} />
          </div>
          <p className={styles.errorMessage}>{errorMessage}</p>
          <div className={styles.formPart}>
            <Button type='submit' label='Register' disabled={!validForm} />
            <p>
              Already have an account? <Link to='/login'>Log in</Link>.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
