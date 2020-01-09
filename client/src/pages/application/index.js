import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'
import useAuth from 'hooks/useAuth'
import { ReactComponent as Spinner } from 'assets/spinner.svg'
import ApplicationConsent from '../applicationConsent'
import ApplicationForm from '../applicationForm'
import ApplicationStatus from '../applicationStatus'
import ApplicationWalkIn from '../applicationWalkIn'
import styles from './index.module.css'

// const fakeUser = {
//   email: 'walskerw@gmail.com',
//   role: 'user',
//   uuid: '1l2k3j1lk2j31lkjjjjb1kh2b312jfy12j3hv12h3v',
//   consentForm: false,
//   color: 'red',
//   wave: 4,
//   name: 'Wal Wal',
//   longAnswerScore: null,
//   appStatus: 'attending',
//   application: {
//     basicInfo: {
//       firstName: null,
//       lastName: null,
//       gender: null,
//       ethnicity: null,
//       emergencyPhone: null,
//       otherEthnicity: null,
//       otherGender: null
//     },
//     personalInfo: {
//       school: null,
//       major: null,
//       minor: null,
//       degree: null,
//       expectedGraduation: null,
//       cityOfOrigin: null,
//       tShirtSize: null,
//       dietaryRestrictions: {
//         halal: false,
//         vegetarian: false,
//         lactoseFree: false,
//         nutFree: false,
//         glutenFree: false,
//         other: null
//       },
//       wantsShuttle: null
//     },
//     skills: {
//       numHackathons: null,
//       selfTitle: null,
//       accomplishmentStatement: null,
//       challengeStatement: null
//     },
//     profile: {
//       github: null,
//       linkedin: null,
//       website: null,
//       soughtPosition: null,
//       resume: false
//     },
//     terms: {
//       codeOfConduct: false,
//       privacyPolicy: false,
//       under18: false
//     }
//   }
// }

// const fakeFetch = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve(fakeUser), 500)
//   })
// }

const Application = () => {
  const auth = useAuth()
  const { path } = useRouteMatch()
  const [loading, setLoading] = useState(true)
  const [appStatus, setStatus] = useState(null)
  const [consentFormStatus, setConsentStatus] = useState(false)
  const [applicationForm, setApplication] = useState({})
  const [id, setId] = useState({})

  useEffect(() => {
    const getStatus = async () => {
      const idToken = await auth.getToken()
      const response = await fetch(`${window.location.origin}/api/applications/${idToken}`)
      const { application, appStatus, consentForm, name, uuid } = await response.json()
      // const { application, appStatus, consentForm, name, uuid } = await fakeFetch()

      setStatus(appStatus)
      setConsentStatus(consentForm || false) // OR false because not all applications have this field
      setApplication(application)
      setId({ name, uuid })
      setLoading(false)
    }
    getStatus()
  }, [])

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Application | My cuHacking</title>
      </Helmet>
      {loading ? (
        <div className={styles.loadingScreen}>
          <Spinner className={styles.spinner} />
        </div>
      ) : (
        <Router>
          <Switch>
            <Route
              path={`${path}/status`}
              render={() => <ApplicationStatus appStatus={appStatus} isMinor={applicationForm.terms.under18} id={id} />}
            />
            {/* <Route
              path={`${path}/form`}
              render={() =>
                appStatus === 'unstarted' || appStatus === 'submitted' || appStatus === 'unsubmitted' ? (
                  <ApplicationForm applicationForm={applicationForm} setApplication={setApplication} />
                ) : (
                  <Redirect to={`${path}/status`} />
                )
              }
            /> */}
            <Route
              path={`${path}/walk-in`}
              render={() =>
                appStatus === 'accepted' || appStatus === 'attending' ? (
                  <Redirect to={`${path}/status`} />
                ) : (
                  <ApplicationWalkIn applicationForm={applicationForm} setApplication={setApplication} />
                )
              }
            />
            <Route
              path={`${path}/consent`}
              render={() =>
                appStatus === 'accepted' && applicationForm.terms.under18 ? (
                  <ApplicationConsent setStatus={setConsentStatus} />
                ) : (
                  <Redirect to={`${path}/status`} />
                )
              }
            />
            <Redirect to={`${path}/status`} />
          </Switch>
        </Router>
      )}
    </div>
  )
}

export default Application
