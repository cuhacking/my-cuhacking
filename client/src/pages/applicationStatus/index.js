import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Navbar } from 'components'
import styles from './index.module.css'

const content = {
  unstarted: () => (
    <>
      <p>Your application is</p>
      <h1>Unstarted</h1>
      <p>Apply now! Applications close December 27 at 11:59pm EST.</p>
      <Button link to='/application/form' label='Apply' />
    </>
  ),
  unsubmitted: () => (
    <>
      <p>Your application is</p>
      <h1>Unsubmitted</h1>
      <p>Applications close December 27 at 11:59pm EST.</p>
      <Button link to='/application/form' label='Continue' />
    </>
  ),
  submitted: () => (
    <>
      <p>Your application has been</p>
      <h1>Submitted</h1>
      <p>Made a mistake? Edit your application below.</p>
      <Button link to='/application/form' label='Edit Application' />
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
      <Button link to='/rsvp' label='RSVP' />
      <p>
        <Link to='/'>I can't make it :(</Link>
      </p>
    </>
  ),
  waitlisted: () => (
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

const Status = ({ appStatus }) => (
  <div className={styles.statusPage}>
    <Navbar />
    <div className={styles.container}>{content[appStatus]()}</div>
  </div>
)

export default Status
