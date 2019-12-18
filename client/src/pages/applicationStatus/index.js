import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Navbar } from 'components'
import styles from './index.module.css'

const rsvp = () => {}

const declineInivitation = () => {}

const Content = ({ appStatus, isMinor }) => {
  switch (appStatus) {
    case 'unstarted':
      return (
        <>
          <p>Your application is</p>
          <h1>Unstarted</h1>
          <p>Apply now! Applications close December 27 at 11:59pm EST.</p>
          <Button link to='/application/form' label='Apply' />
        </>
      )
    case 'unsubmitted':
      return (
        <>
          <p>Your application is</p>
          <h1>Incomplete</h1>
          <p>Don't worry, you'll still be considered with the first wave of applications.</p>
          <Button link to='/application/form' label='Continue' />
        </>
      )
    case 'submitted':
      return (
        <>
          <p>Your application has been</p>
          <h1>Submitted</h1>
          <p>Made a mistake? Edit your application below.</p>
          <Button link to='/application/form' label='Edit Application' />
        </>
      )
    case 'inReview':
      return (
        <>
          <p>Your application is</p>
          <h1>In Review</h1>
          <p>Pay attention to your email, we’ll let you know of our decision in the coming days.</p>
        </>
      )
    case 'accepted':
      if (isMinor) {
        return (
          <>
            <p>Your application has been</p>
            <h1>Accepted!</h1>
            <p>Only one more step to save your spot.</p>
            <Button link to='/application/consent' label='Consent Form' />
            <p className={styles.declineButton} onClick={declineInivitation}>
              I can't make it :(
            </p>
          </>
        )
      } else {
        return (
          <>
            <p>Your application has been</p>
            <h1>Accepted!</h1>
            <p>
              By attending cuHacking, you agree to be photographed, videotaped, and/or interviewed for cuHacking
              promotional material. You also are giving cuHacking the right to use and distribute any and all media with
              you in it.
            </p>
            <Button onClick={rsvp} label='RSVP' />
            <p className={styles.declineButton} onClick={declineInivitation}>
              I can't make it :(
            </p>
          </>
        )
      }
    case 'attending':
      return (
        <>
          <p>Save the date!</p>
          <h1>January 11-12</h1>
          <p>Registration begins January 11 at 9am at Richcraft Hall.</p>
          <p>More event details are to come through social media and your email, so keep an eye out!</p>
          <p className={styles.declineButton} onClick={declineInivitation}>
            I can't make it anymore :(
          </p>
        </>
      )
    case 'waitlisted':
      return (
        <>
          <p>You are on the</p>
          <h1>Waitlist</h1>
          <p>We were not able to extend an invitation right away, but stick around and a spot may open up.</p>
          <p>Don't want to wait? Volunteer instead!</p>
          <Button
            external
            link
            to='https://docs.google.com/forms/d/e/1FAIpQLSeQjgCEb6PNZBK1PEm3rFA9EHkO7LmyxSSBNGLu16XzIY_B7Q/viewform'
            label='Volunteer'
          />
        </>
      )
    case 'rejected':
      return (
        <>
          <p>Unfortunately, we are not moving forward with your application this year.</p>
          <p>
            We encourage you to keep an eye on our website and social media,as there will be many other events to
            participate in during the year!
          </p>
        </>
      )
    case 'withdrawn':
      return (
        <>
          <p>We’re sad to see you couldn’t make it.</p>
          <p>
            We encourage you to keep an eye on our website and social media,as there will be many other events to
            participate in during the year!
          </p>
          <p>If you change your mind, we can’t offer you another spot, but we ask you to volunteer instead!</p>
          <Button
            external
            link
            to='https://docs.google.com/forms/d/e/1FAIpQLSeQjgCEb6PNZBK1PEm3rFA9EHkO7LmyxSSBNGLu16XzIY_B7Q/viewform'
            label='Volunteer'
          />
        </>
      )
    default:
      return (
        <>
          <p>An error as occured with your account. Please contact development@cuhacking.com.</p>
        </>
      )
  }
}

const Status = ({ appStatus, isMinor }) => (
  <div className={styles.statusPage}>
    <Navbar />
    <div className={styles.container}>
      <Content appStatus={appStatus} isMinor={isMinor} />
    </div>
  </div>
)

export default Status
