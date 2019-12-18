import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Dropbox, Navbar } from 'components'
import useAuth from 'hooks/useAuth'
import styles from './index.module.css'

const Consent = ({ setStatus }) => {
  const auth = useAuth()
  const [consentForm, setForm] = useState()

  const submitForm = async event => {
    event.preventDefault()

    if (!consentForm) {
      const payload = new FormData()
      payload.append('email', auth.user.email)
      payload.append('consentForm', consentForm, consentForm.path)

      try {
        const idToken = await auth.getToken()
        const response = await fetch(`${window.location.origin}/api/applications/${idToken}`, {
          // TODO: do backend
          method: 'POST',
          body: payload
        })

        if (response.status === 200) {
          window.location.href = `${window.location.origin}/application`
        } else if (response.status === 413) {
          alert('File is too large. Maximum of 4mb.')
        } else {
          console.error(`Unexpected status code: ${response.status}`)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className={styles.formPage}>
      <Navbar />
      <div className={styles.container}>
        <h2>cuHacking 2020</h2>
        <h1>Parental Consent Form</h1>
        <p>
          Since you have indicated your are under the age of 18 on your application form, you must fill out and upload a{' '}
          <a download href='/resources/cuhacking_permission_form.pdf'>
            Parental Consent Form
          </a>
          .
        </p>
        <form className={styles.formContainer} onSubmit={submitForm}>
          <Dropbox
            file={consentForm}
            name='consentForm'
            storeFile={pdf => {
              if (pdf) {
                setForm(pdf)
                setStatus(true)
              } else {
                setForm(undefined)
                setStatus(false)
              }
            }}
          >
            <p>Drop your signed consent form here, or click to select it. (PDF only)</p>
          </Dropbox>
          <div className={styles.buttons}>
            <Button label='Submit' type='submit' />
          </div>
        </form>
        <p className={styles.appealText}>
          If you’ve made a mistake, and you’re 18 years old or older. Send an email to{' '}
          <a href='mailto:development@cuhacking.com?cc=operations@cuhacking.com&subject=Age of Majority Appeal'>
            development@cuhacking.com
          </a>{' '}
          with the subject “Age of Majority Appeal”. Include a valid piece of ID that matches your application and
          indicates that you are indeed 18 years old or over.
        </p>
      </div>
    </div>
  )
}

export default Consent
