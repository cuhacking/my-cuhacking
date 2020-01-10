import React from 'react'
import { Link } from 'react-router-dom'
import QRCode from 'qrcode.react'
import { Button, Navbar } from 'components'
import useAuth from 'hooks/useAuth'
import styles from './index.module.css'

const Content = ({ appStatus, isMinor, id }) => {
  const auth = useAuth()

  const rsvp = async event => {
    event.preventDefault()

    try {
      const idToken = await auth.getToken()
      const response = await fetch(`${window.location.origin}/api/applications/${idToken}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'attending'
        })
      })

      if (response.status === 200) {
        window.location.href = `${window.location.origin}/application`
      } else {
        console.error(`Unexpected status code: ${response.status}`)
        console.error(response)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const declineInivitation = async event => {
    event.preventDefault()

    try {
      const idToken = await auth.getToken()
      const response = await fetch(`${window.location.origin}/api/applications/${idToken}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'withdrawn'
        })
      })

      if (response.status === 200) {
        window.location.href = `${window.location.origin}/application`
      } else {
        console.error(`Unexpected status code: ${response.status}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  switch (appStatus) {
    case 'submitted':
    case 'inReview':
    case 'accepted':
    case 'withdrawn':
      if (isMinor) {
        return (
          <>
            <p>Your registration form is</p>
            <h1>Complete!</h1>
            <p>Only one more step to confirm your attendance.</p>
            <Button link to='/application/consent' label='Consent Form' />
          </>
        )
      } else {
        return (
          <>
            <p>Your registration form is</p>
            <h1>Complete!</h1>
            <p>Confirm your attendance by pressing the button below.</p>
            <Button onClick={rsvp} label="I'm attending" />
            <p className={styles.disclaimer}>
              By attending cuHacking, you agree to be photographed, videotaped, and/or interviewed for cuHacking
              promotional material. You also are giving cuHacking the right to use and distribute any and all media from
              the event with you in it.
            </p>
          </>
        )
      }
    case 'attending':
      return (
        <>
          <p>Welcome to cuHacking 2020!</p>
          <h2>{id.name}</h2>
          <a download href={`/api/badges/${id.uuid}`}>
            <QRCode value={id.uuid} includeMargin size={256} />
          </a>
          <p>
            Registration begins at 8:30am in{' '}
            <a href='https://carleton.ca/campus/map/#RB' target='_blank' rel='noopener noreferrer external'>
              Richcraft Hall
            </a>
            .
          </p>
          <p>Use your personal QR code above to check-in at registration and into workshops.</p>
        </>
      )
    case 'unstarted':
    case 'unsubmitted':
    default:
      return (
        <>
          <p>Your profile is</p>
          <h1>Unstarted</h1>
          <p>Register now to attend the hackathon.</p>
          <Button link to='/application/walk-in' label='Register' />
        </>
      )
  }

  // The old applications stuff
  // switch (appStatus) {
  //   case 'unstarted':
  //     return (
  //       <>
  //         <p>Your application is</p>
  //         <h1>Unstarted</h1>
  //         <p>Apply now! The hackathon is this weekend.</p>
  //         <Button link to='/application/form' label='Apply' />
  //       </>
  //     )
  //   case 'unsubmitted':
  //     return (
  //       <>
  //         <p>Your application is</p>
  //         <h1>Incomplete</h1>
  //         <p>Don't worry, you'll still be considered with the first wave of applications.</p>
  //         <Button link to='/application/form' label='Continue' />
  //       </>
  //     )
  //   case 'submitted':
  //     return (
  //       <>
  //         <p>Your application has been</p>
  //         <h1>Submitted</h1>
  //         <p>Made a mistake? Edit your application below.</p>
  //         <Button link to='/application/form' label='Edit Application' />
  //       </>
  //     )
  //   case 'inReview':
  //     return (
  //       <>
  //         <p>Your application is</p>
  //         <h1>In Review</h1>
  //         <p>Pay attention to your email, we’ll let you know of our decision in the coming days.</p>
  //       </>
  //     )
  //   case 'accepted':
  //     if (isMinor) {
  //       return (
  //         <>
  //           <p>Your application has been</p>
  //           <h1>Accepted!</h1>
  //           <p>Only one more step to save your spot.</p>
  //           <Button link to='/application/consent' label='Consent Form' />
  //           <p className={styles.declineButton} onClick={declineInivitation}>
  //             I can't make it :(
  //           </p>
  //         </>
  //       )
  //     } else {
  //       return (
  //         <>
  //           <p>Your application has been</p>
  //           <h1>Accepted!</h1>
  //           <p>Press the button below to save your spot!</p>
  //           <p className={styles.disclaimer}>
  //             By attending cuHacking, you agree to be photographed, videotaped, and/or interviewed for cuHacking
  //             promotional material. You also are giving cuHacking the right to use and distribute any and all media from
  //             the event with you in it.
  //           </p>
  //           <Button onClick={rsvp} label='RSVP' />
  //           <p className={styles.declineButton} onClick={declineInivitation}>
  //             I can't make it :(
  //           </p>
  //         </>
  //       )
  //     }
  //   case 'attending':
  //     return (
  //       <>
  //         <p>Save the date!</p>
  //         <h1>January 11-12</h1>
  //         <p>
  //           Registration begins January 11 at 9am at{' '}
  //           <a href='https://carleton.ca/campus/map/#RB' target='_blank' rel='noopener noreferrer external'>
  //             Richcraft Hall
  //           </a>
  //           .
  //         </p>
  //         <p>Keep an eye on your email and social media for any updates!</p>
  //         <p className={styles.declineButton} onClick={declineInivitation}>
  //           I can't make it anymore :(
  //         </p>
  //       </>
  //     )
  //   case 'waitlisted':
  //     return (
  //       <>
  //         <p>You are on the</p>
  //         <h1>Waitlist</h1>
  //         <p>We were not able to extend an invitation right away, but stick around and a spot may open up.</p>
  //         <p>Don't want to wait? Volunteer instead!</p>
  //         <Button
  //           external
  //           link
  //           to='https://docs.google.com/forms/d/e/1FAIpQLSeQjgCEb6PNZBK1PEm3rFA9EHkO7LmyxSSBNGLu16XzIY_B7Q/viewform'
  //           label='Volunteer'
  //         />
  //       </>
  //     )
  //   case 'rejected':
  //     return (
  //       <>
  //         <p>Unfortunately, we are not moving forward with your application this year.</p>
  //         <p>
  //           We encourage you to keep an eye on our website and social media, as there will be many other events to
  //           participate in during the year!
  //         </p>
  //       </>
  //     )
  //   case 'withdrawn':
  //     return (
  //       <>
  //         <p>We’re sad to see you couldn’t make it.</p>
  //         <p>
  //           We encourage you to keep an eye on our website and social media, as there will be many other events to
  //           participate in during the year!
  //         </p>
  //         <p>If you change your mind, we can’t offer you another spot, but we ask you to volunteer instead!</p>
  //         <Button
  //           external
  //           link
  //           to='https://docs.google.com/forms/d/e/1FAIpQLSeQjgCEb6PNZBK1PEm3rFA9EHkO7LmyxSSBNGLu16XzIY_B7Q/viewform'
  //           label='Volunteer'
  //         />
  //       </>
  //     )
  //   default:
  //     console.error('Invalid App Status: ', appStatus)
  //     return (
  //       <>
  //         <p>An error as occurred with your account. Please contact development@cuhacking.com.</p>
  //       </>
  //     )
  // }
}

const Status = ({ appStatus, isMinor, id }) => (
  <div className={styles.statusPage}>
    <Navbar />
    <div className={styles.container}>
      <Content appStatus={appStatus} isMinor={isMinor} id={id} />
    </div>
  </div>
)

export default Status
