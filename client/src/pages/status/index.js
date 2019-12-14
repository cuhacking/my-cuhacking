import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useHistory } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import { Input, Button, Navbar, Password } from 'components'
import useAuth from 'hooks/useAuth'
import styles from './index.module.css'

const content = {
  unstarted: () => (
    <>
      <p>Your application is</p>
      <h1>Unstarted</h1>
      <p>Apply now! Applications close December 27 at 11:59pm EST.</p>
      <Button link to='/application' label='Apply' />
    </>
  ),
  unsubmitted: () => (
    <>
      <p>Your application is</p>
      <h1>Unsubmitted</h1>
      <p>Applications close December 27 at 11:59pm EST.</p>
      <Button link to='/application' label='Continue' />
    </>
  ),
  submitted: () => (
    <>
      <p>Your application has been</p>
      <h1>Submitted</h1>
      <p>Made a mistake? Edit your application below.</p>
      <Button link to='/application' label='Edit Application' />
    </>
  ),
  inReview: () => (
    <>
      <p>Your application is</p>
      <h1>In Review</h1>
      <p>Pay attention to your email, we’ll let you know of our decision in the coming days.</p>
    </>
  ),
  accepted: () => (
    <>
      <p>Your application has been</p>
      <h1>Accepted!</h1>
      <p>If you’re sure you can come, fill out the form below! If not, please let us know.</p>
      <Button link to='/application' label='RSVP' />
      <p>
        <Link to='/register'>I can't make it :(</Link>
      </p>
    </>
  ),
  waitlisted: () => (
    <>
      <p>You are on the</p>
      <h1>Waitlist</h1>
      <p>We were not able to extend an invitation right away, but stick around and a spot may open up.</p>
      <p>Don't want to wait? Volunteer instead!</p>
      <Button link to='/application' label='Volunteer' />
    </>
  ),
  rejected: () => (
    <>
      <p>Unfortunately, we are not moving forward with your application this year.</p>
      <p>
        We encourage you to keep an eye on our website and social media,as there will be many other events to
        participate in during the year!
      </p>
    </>
  )
}

const Status = () => {
  const auth = useAuth()
  const [appStatus, setStatus] = useState(null)

  useEffect(() => {
    const getStatus = async () => {
      const idToken = await auth.getToken()
      const response = await fetch(`${window.location.origin}/api/applications/${idToken}`)
      const { application, status } = await response.json()
      console.log('AH', status, application)
      setStatus(status)
    }
    getStatus()
  }, [])

  return (
    <div className={styles.statusPage}>
      <Helmet>
        <title>Application Status | My cuHacking</title>
      </Helmet>
      <Navbar />
      <div className={styles.container}>
        {!appStatus ? (
          // <Loader type='Triangle' color='#7c39bf' height={100} width={100} timeout={10000} />
          <p>Loading...</p>
        ) : (
          content[appStatus]()
        )}
      </div>
    </div>
  )
}

export default Status
