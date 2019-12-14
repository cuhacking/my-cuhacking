import React, { useState } from 'react'
import { Navbar, Input, Button } from 'components'
import useAuth from 'hooks/useAuth'
import Dropbox from './dropbox'
import { schools } from './schools'
import styles from './index.module.css'

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
  <a href={href} target='_blank' rel='noopener noreferrer external'>
    {children}
  </a>
)

const Application = ({ applicationForm, setApplication }) => {
  const auth = useAuth()
  const { basicInfo, personalInfo, profile, skills, terms } = applicationForm

  const [resume, setResume] = useState()

  const submitApplication = async event => {
    event.preventDefault()

    const payload = new FormData()
    payload.append('form', JSON.stringify(applicationForm))
    payload.append('email', auth.user.email)
    if (resume) {
      payload.append('resume', resume, resume.path)
    }

    try {
      const idToken = await auth.getToken()
      const response = await fetch(`${window.location.origin}/api/applications/${idToken}`, {
        method: 'POST',
        body: payload
      })

      if (response.status === 200) {
        window.location.href = `${window.location.origin}/application`
      } else if (response.status === 413) {
        alert('Resume is too large. Maximum of 4mb.')
      } else {
        console.error(`Unexpected status code: ${response.status}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onChange = event => {
    const { name, checked, type, value } = event.target

    if (name in basicInfo) {
      setApplication({
        ...applicationForm,
        basicInfo: {
          ...basicInfo,
          [name]: value.trim() || null
        }
      })
    } else if (name in personalInfo) {
      setApplication({
        ...applicationForm,
        personalInfo: {
          ...personalInfo,
          [name]: type === 'checkbox' ? checked : name === 'expectedGraduation' ? Number(value) : value.trim() || null
        }
      })
    } else if (name in personalInfo.dietaryRestrictions) {
      setApplication({
        ...applicationForm,
        personalInfo: {
          ...personalInfo,
          dietaryRestrictions: {
            ...personalInfo.dietaryRestrictions,
            [name]: type === 'checkbox' ? checked : value.trim() || null
          }
        }
      })
    } else if (name in skills) {
      setApplication({
        ...applicationForm,
        skills: {
          ...skills,
          [name]: name === 'numHackathons' ? Number(value) : value.trim() || null
        }
      })
    } else if (name in profile) {
      setApplication({
        ...applicationForm,
        profile: {
          ...profile,
          [name]: value.trim() || null
        }
      })
    } else {
      setApplication({
        ...applicationForm,
        terms: {
          ...terms,
          [name]: checked
        }
      })
    }
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
              options={schools}
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
              defaultChecked={personalInfo.dietaryRestrictions.nutFree}
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
          <div className={styles.section} style={{ paddingTop: 10, flexDirection: 'column' }}>
            <p>
              We're looking at getting shuttles to transport hackers from other cities to cuHacking and back, however
              they will be organized based on demand.
            </p>
            <strong>A shuttle has already been confirmed for Toronto (Union station).</strong>
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
            <Dropbox
              resume={resume}
              setResume={pdf => {
                if (pdf) {
                  setApplication({
                    ...applicationForm,
                    profile: {
                      ...profile,
                      resume: true
                    }
                  })

                  setResume(pdf)
                } else {
                  setApplication({
                    ...applicationForm,
                    profile: {
                      ...profile,
                      resume: false
                    }
                  })

                  setResume(undefined)
                }
              }}
            />
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
            <Button label='Submit' type='submit' />
          </div>
        </form>
      </div>
    </div>
  )
}
export default Application
