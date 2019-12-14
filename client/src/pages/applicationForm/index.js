import React, { useEffect, useState } from 'react'
import useAuth from 'hooks/useAuth'
import { Helmet } from 'react-helmet'
import { Navbar, Input, Button } from 'components'
import Dropbox from './dropbox'
import { schools } from './schools'
import styles from './index.module.css'
import { useHistory } from 'react-router-dom'

const fakeUser = {
  email: null,
  role: 'user',
  uid: null,
  rsvp: {},
  review: {
    wave: 2
  },
  appStatus: 'unstarted',
  application: {
    basicInfo: {
      firstName: null,
      lastName: null,
      gender: null,
      ethnicity: null,
      emergencyPhone: null,
      otherEthnicity: null,
      otherGender: null
    },
    personalInfo: {
      school: null,
      major: null,
      minor: null,
      degree: null,
      expectedGraduation: null,
      cityOfOrigin: null,
      tShirtSize: null,
      dietaryRestrictions: {
        halal: false,
        vegetarian: false,
        lactoseFree: false,
        nutFree: false,
        glutenFree: false,
        other: null
      },
      wantsShuttle: null
    },
    skills: {
      numHackathons: null,
      selfTitle: null,
      accomplishmentStatement: null,
      challengeStatement: null
    },
    profile: {
      github: null,
      linkedin: null,
      website: null,
      soughtPosition: null,
      resume: false
    },
    terms: {
      codeOfConduct: false,
      privacyPolicy: false,
      under18: false
    }
  }
}

const genderOptions = ['Prefer not to answer', 'Female', 'Male', 'Other (please specify)']

const ethnicityOptions = [
  'Prefer not to answer',
  'Indigenous',
  'Asian',
  'Black / African American',
  'Hispanic',
  'White / Caucasian',
  'Mixed / Other (please specify)'
]

const degreeOptions = ['Bachelor', 'High School Diploma', 'College Diploma', 'Master', 'Doctorate']

const graduationOptions = [2019, 2020, 2021, 2022, 2023, 2024, 2025]

const tShirtSizes = ['Small', 'Medium', 'Large', 'Extra Large']

const employmentTypes = ['Internship (Co-op)', 'Full time', 'Part time']

const Link = ({ href, children }) => (
  <a
    style={{ color: 'var(--secondaryColour)', textDecoration: 'underline' }}
    href={href}
    target='_blank'
    rel='noopener noreferrer external'
  >
    {children}
  </a>
)

// const Submitted = () => (
//   <div className={styles.page} id={styles.start}>
//     <h1 id={styles.superTitle}>Application</h1>
//     <h2 id={styles.title}>Submitted</h2>
//     <p>We have received your application! Keep an eye on your email for updates.</p>
//   </div>
// )

const fakeFetch = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(fakeUser), 2000)
  })
}

const Application = ({ applicationForm, setApplication }) => {
  const { basicInfo, personalInfo, profile, skills, terms } = applicationForm

  const [resume, setResume] = useState()

  // const submitApplication = formData => {
  //   const finalForm = { ...applicationForm, ...formData, status: 'submitted' }
  //   const payload = new FormData()

  //   console.log(resume)
  //   payload.append('form', JSON.stringify(finalForm))
  //   payload.append('email', email)
  //   if (resume) {
  //     payload.append('resume', resume, resume.path)
  //   }

  //   const options = {
  //     method: 'POST',
  //     body: payload,
  //     headers: {
  //       'Access-Control-Request-Headers': 'POST',
  //       Authorization: `Bearer ${token}`
  //     }
  //   }

  //   console.log('next!', options)
  //   fetch(`${API_URL}/users/application/submit`, options)
  //     .then(res => {
  //       console.log('Submit status:', res.status)

  //       setApplication(finalForm)

  //       // Move to the next page
  //       changeStage(6)
  //       changePage(6)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }

  const submitApplication = event => {
    event.preventDefault()
  }

  const onChange = event => {
    const { name, value } = event.target

    let a = {}
    a[event.target.name] = event.target.value
    console.log(a)

    // if (target.name in personalInfo.dietaryRestrictions) {
    //   personalInfo.dietaryRestrictions[target.name] = target.type === 'checkbox' ? target.checked : target.value
    //   console.log(personalInfo.dietaryRestrictions)
    // } else {
    //   setInfo({
    //     ...personalInfo,
    //     [target.name]:
    //       (target.type === 'checkbox' ? target.checked : target.value) || APPLICATION_SCHEMA.personalInfo[target.name]
    //   })
    // }
  }

  return (
    <div className={styles.formPage}>
      <Navbar />
      <div className={styles.application}>
        <h2>cuHacking 2020</h2>
        <h1>Application</h1>
        <form onSubmit={submitApplication} onChange={onChange} className={styles.formContainer}>
          <div className={styles.section}>
            <Input
              defaultValue={basicInfo.firstName}
              name='firstName'
              type='text'
              label='First Name *'
              placeholder='John'
              required={true}
            />
            <Input
              defaultValue={basicInfo.lastName}
              name='lastName'
              type='text'
              label='Last Name *'
              placeholder='Smith'
              required={true}
            />
          </div>
          <div className={styles.section}>
            <Input
              defaultValue={basicInfo.gender}
              name='gender'
              type='text'
              label='What do you identify as?'
              inputStyle='select'
              options={genderOptions}
            />
            <Input
              defaultValue={basicInfo.otherGender}
              name='otherGender'
              type='text'
              label='If other, please specify.'
            />
          </div>
          <div className={styles.section}>
            <Input
              defaultValue={basicInfo.ethnicity}
              name='ethnicity'
              type='text'
              label='What is your race/ethnicity?'
              inputStyle='select'
              options={ethnicityOptions}
            />
            <Input
              defaultValue={basicInfo.otherEthnicity}
              name='otherEthnicity'
              type='text'
              label='If other, please specify.'
            />
          </div>
          <div className={styles.section}>
            <Input
              defaultValue={basicInfo.emergencyPhone}
              name='emergencyPhone'
              type='tel'
              label='What is your phone number (for emergencies)? *'
              placeholder='(123) 456-7890'
              required={true}
            />
          </div>
          <div className={styles.section}>
            <Input
              defaultValue={personalInfo.school}
              name='school'
              type='text'
              label='What school do you attend? *'
              required={true}
              inputStyle='select'
              options={['', ...schools]}
            />
            <Input
              defaultValue={personalInfo.otherSchool}
              name='school'
              type='text'
              label='If other, please specify.'
            />
          </div>
          <div className={styles.section}>
            <Input
              placeholder='Computer Science'
              defaultValue={personalInfo.major}
              name='major'
              type='text'
              label='What is your major?*'
              required={true}
            />
            <Input
              placeholder='Psychology'
              defaultValue={personalInfo.minor}
              name='minor'
              type='text'
              label='What is your minor (if applicable)?'
            />
          </div>
          <div className={styles.section}>
            <Input
              defaultValue={personalInfo.degree}
              name='degree'
              label='What degree are you pursuing?'
              inputStyle='select'
              options={degreeOptions}
              required
            />
            <Input
              defaultValue={personalInfo.expectedGraduation}
              name='expectedGraduation'
              label='When do you expect to graduate?'
              inputStyle='select'
              options={graduationOptions}
              required
            />
          </div>
          <div className={styles.section}>
            <Input
              defaultValue={personalInfo.tShirtSize}
              name='tShirtSize'
              label='What is your T-Shirt size (unisex)? *'
              required
              inputStyle='select'
              options={tShirtSizes}
            />
          </div>
          <div className={styles.section}>
            <p>Please select any dietary restrictions you have. </p>
          </div>
          <div className={styles.checkBoxSection}>
            <Input
              defaultChecked={personalInfo.dietaryRestrictions.halal}
              inputStyle='checkbox'
              name='halal'
              label='Halal'
            />
            <Input
              defaultChecked={personalInfo.dietaryRestrictions.vegetarian}
              inputStyle='checkbox'
              name='vegetarian'
              label='Vegetarian'
            />
            <Input
              defaultChecked={personalInfo.dietaryRestrictions.lactoseFree}
              inputStyle='checkbox'
              name='lactoseFree'
              label='Lactose Free'
            />
            <Input
              defaultChecked={personalInfo.dietaryRestrictions.treeNutFree}
              inputStyle='checkbox'
              name='nutFree'
              label='Nut Free'
            />
            <Input
              defaultChecked={personalInfo.dietaryRestrictions.glutenFree}
              inputStyle='checkbox'
              name='glutenFree'
              label='Gluten Free'
            />
          </div>
          <div className={styles.section}>
            <Input
              defaultValue={personalInfo.dietaryRestrictions.other}
              name='other'
              type='text'
              label='Have an allergy or dietary restriction not on this list? Let us know.'
            />
          </div>
          <div className={styles.section}>
            <Input
              placeholder='Ottawa, Ontario'
              defaultValue={personalInfo.cityOfOrigin}
              name='cityOfOrigin'
              label='Where will you be travelling from? * '
              required
            />
          </div>
          <div className={styles.section} style={{ paddingTop: 30 }}>
            We're looking at getting shuttles to transport hackers from other cities to cuHacking and back, however they
            will be organized based on demand.
          </div>
          <div className={styles.checkBoxSection}>
            <Input
              defaultChecked={personalInfo.wantsShuttle}
              inputStyle='checkbox'
              name='wantsShuttle'
              label="&nbsp; I'm interested in using a shuttle service from my city."
            />
          </div>
          <div className={styles.section}>
            <Input
              defaultValue={skills.numHackathons}
              name='numHackathons'
              type='number'
              min={0}
              label='How many hackathons have you been to?'
            />
            <Input
              defaultValue={skills.selfTitle}
              placeholder='Front-end Developer (React)'
              name='selfTitle'
              type='text'
              label='How would you describe yourself?'
            />
          </div>
          <div className={styles.section}>
            <Input
              defaultValue={skills.accomplishmentStatement}
              name='accomplishmentStatement'
              inputStyle='long'
              label='What are you looking to learn or accomplish at cuHacking 2020?'
            />
          </div>
          <div className={styles.section}>
            <Input
              defaultValue={skills.challengeStatement}
              name='challengeStatement'
              inputStyle='long'
              label='Tell us about a time you faced a challenge, and how you overcame it.'
            />
          </div>
          <div className={styles.section}>
            <Input defaultValue={profile.github} name='github' type='text' label='GitHub' />
            <Input defaultValue={profile.linkedin} name='linkedin' type='text' label='LinkedIn' />
          </div>
          <div className={styles.section}>
            <Input defaultValue={profile.website} name='website' type='text' label='Website' />
            <Input
              defaultValue={profile.soughtPosition}
              name='soughtPosition'
              label='What type of positions are you looking for?'
              inputStyle='select'
              options={employmentTypes}
            />
          </div>
          <div className={styles.section}>
            <Dropbox resume={resume} setResume={setResume} />
          </div>
          <div className={styles.section}>
            <p>
              <i>By uploading your resume, you agree to having it distributed to our sponsors attending the event.</i>
            </p>
          </div>
          <div className={styles.checkBoxSection}>
            <Input
              defaultChecked={terms.codeOfConduct}
              inputStyle='checkbox'
              name='codeOfConduct'
              required
              label={
                <div>
                  I have read, understand, and agree to the{' '}
                  <Link href='https://static.mlh.io/docs/mlh-code-of-conduct.pdf'>MLH Code of Conduct</Link>.
                </div>
              }
            />
            <Input
              defaultChecked={terms.privacyPolicy}
              inputStyle='checkbox'
              name='privacyPolicy'
              required
              label={
                <div>
                  I authorize cuHacking to share certain application/registration information for event administration,
                  ranking, MLH administration, pre and post-event informational e-mails, and occasional messages about
                  hackathons in-line with the{' '}
                  <Link href='https://github.com/MLH/mlh-policies/blob/master/prize-terms-and-conditions/contest-terms.md'>
                    MLH Privacy Policy
                  </Link>
                  . Furthermore, agree to the terms of both the{' '}
                  <Link href='https://mlh.io/privacy'>MLH Contest Terms and Conditions</Link> and the{' '}
                  <Link href='https://mlh.io/privacy'>MLH Privacy Policy</Link>.
                </div>
              }
            />
          </div>
          <div className={styles.section} style={{ marginTop: 25 }}>
            At cuHacking, we encourage new and young hackers to participate. The more hackers, the merrier!
          </div>
          <div className={styles.checkBoxSection}>
            <Input
              defaultChecked={terms.under18}
              inputStyle='checkbox'
              name='under18'
              label={
                <div>
                  I will be under the age of 18 by January 11, 2020, and I agree to sign a Parental Consent form should
                  I be accepted to the event.
                </div>
              }
            />
          </div>
          <div className={styles.buttons}>
            <Button label='Save' type='button' />
            <Button label='Submit' type='submit' />
          </div>
        </form>
      </div>
    </div>
  )
}
export default Application
