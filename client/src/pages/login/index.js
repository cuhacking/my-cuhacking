import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useHistory } from 'react-router-dom'
import { Input, Button, Navbar, Password } from 'components'
import useAuth from 'hooks/useAuth'
import styles from './index.module.css'

function Login() {
  const auth = useAuth()
  const history = useHistory()
  const [validForm, setValidity] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Side effect which enables the register button if the condition is met
  useEffect(() => {
    setValidity(email.length > 0 && password.length >= 8)
  }, [email, password])

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await auth.login(email, password)

      history.push('/status')
    } catch (error) {
      switch (error.code) {
        case 'auth/user-disabled':
          return setErrorMessage('That email has been disabled. Contact development@cuhacking.com for support.')
        case 'auth/invalid-email':
          return setErrorMessage('That email is invalid.')
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          return setErrorMessage('Incorrect email or password.')
        default:
          return setErrorMessage('Uh oh! Something went wrong.')
      }
    }
  }

  const handleChange = async event => {
    setErrorMessage('')
    const { name, value } = event.target

    switch (name) {
      case 'email':
        return setEmail(value)
      case 'password':
        return setPassword(value)
      default:
        return
    }
  }

  return (
    <div className={styles.loginPage}>
      <Helmet>
        <title>Login | My cuHacking</title>
      </Helmet>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.logo} />
        <form className={styles.loginContainer} onSubmit={handleSubmit}>
          <div className={styles.formPart}>
            <Input type='email' name='email' label='Email' value={email} onChange={handleChange} required={true} />
            <Password
              type='password'
              name='password'
              label='Password'
              value={password}
              onChange={handleChange}
              required={true}
            />
            <p className={styles.resetPassword}>
              <Link to='/forgot'>Forgot your password?</Link>
            </p>
          </div>
          <p className={styles.errorMessage}>{errorMessage}</p>
          <div className={styles.formPart}>
            <Button type='submit' label='Login' disabled={!validForm} />
            <p>
              Don't have an account? <Link to='/register'>Sign up now</Link>.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
