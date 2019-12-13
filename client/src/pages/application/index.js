import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Helmet } from 'react-helmet'
import styles from './index.module.css'
import { Input, Button } from 'components'
import PageNav from './pageNav'
import Dropbox from './dropbox'
import { schools } from './schools.json'
import { useHistory } from 'react-router-dom'

const API_URL = 'https://cuhacking.com/api'
// const API_URL = 'http://localhost:3000/api-dev'

const APPLICATION_SCHEMA = {
  status: 'unstarted',
  basicInfo: {
    firstName: '',
    lastName: '',
    gender: 'Prefer not to answer',
    otherGender: '',
    ethnicity: 'Prefer not to answer',
    otherEthnicity: '',
    emergencyPhone: ''
  },
  personalInfo: {
    school: '',
    otherSchool: '', // I JUST ADDED THIS - WE MIGHT NEED TO CHANGE SOMETHING ON THE API SIDE.
    major: '',
    minor: '',
    degree: 'Bachelor',
    expectedGraduation: 2019,
    cityOfOrigin: '',
    tShirtSize: 'Small',
    dietaryRestrictions: {
      halal: false,
      vegetarian: false,
      lactoseFree: false,
      treeNutFree: false,
      glutenFree: false,
      other: ''
    },
    wantsShuttle: false
  },
  skills: {
    numHackathons: 0,
    selfTitle: '',
    accomplishmentStatement: '',
    challengeStatement: ''
  },
  profile: {
    github: '',
    linkedin: '',
    website: '',
    soughtPosition: 'Internship (Co-op)',
    resume: '// Can firebase store .pdf files?'
  },
  terms: {
    codeOfConduct: false,
    privacyPolicy: false,
    under18: false
  }
}

const StartPage = ({ nextPage, isLoading, startLabel }) => (
  <div className={styles.page} id={styles.start}>
    <h1 id={styles.superTitle}>cuHacking 2020</h1>
    <h2 id={styles.title}>Application</h2>
    <Button label={startLabel} action={() => nextPage()} disabled={isLoading} />
  </div>
)

const BasicInfo = ({ initialState, nextPage }) => {
  const [basicInfo, setInfo] = useState(initialState)

  // Updates the state for the part of the form which changed
  const onChange = event =>
    setInfo({
      ...basicInfo,
      [event.target.name]: event.target.value || APPLICATION_SCHEMA.basicInfo[event.target.name]
    })

  const onSubmit = event => {
    event.preventDefault()
    nextPage({ basicInfo })
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

  return (
    <div className={styles.page}>
      <h1 className={styles.formHeading}>Basic Info</h1>
      <form onSubmit={onSubmit} onChange={onChange} className={styles.formContainer}>
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
        <Button label='Next' type='submit' />
      </form>
    </div>
  )
}

const AboutYou = ({ initialState, nextPage }) => {
  const [personalInfo, setInfo] = useState(initialState)

  const onChange = ({ target }) => {
    if (target.name in personalInfo.dietaryRestrictions) {
      personalInfo.dietaryRestrictions[target.name] = target.type === 'checkbox' ? target.checked : target.value
      console.log(personalInfo.dietaryRestrictions)
    } else {
      setInfo({
        ...personalInfo,
        [target.name]:
          (target.type === 'checkbox' ? target.checked : target.value) || APPLICATION_SCHEMA.personalInfo[target.name]
      })
    }
  }

  const onSubmit = event => {
    event.preventDefault()
    nextPage({ personalInfo })
  }

  const degreeOptions = ['Bachelor', 'High School Diploma', 'College Diploma', 'Master', 'Doctorate']

  const graduationOptions = [2019, 2020, 2021, 2022, 2023, 2024, 2025]

  const tShirtSizes = ['Small', 'Medium', 'Large', 'Extra Large']

  return (
    <div className={styles.page}>
      <h1 className={styles.formHeading}>About You</h1>
      <form onSubmit={onSubmit} onChange={onChange} className={styles.formContainer}>
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
          <Input defaultValue={personalInfo.otherSchool} name='school' type='text' label='If other, please specify.' />
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
        <div className={styles.section} id={styles.restrictionsContainer}>
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
            name='treeNutFree'
            label='Tree Nut Free'
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
        <div className={styles.section}>
          <Input
            defaultChecked={personalInfo.wantsShuttle}
            inputStyle='checkbox'
            name='wantsShuttle'
            label="&nbsp; I'm interested in using a shuttle service from my city."
          />
        </div>
        <Button label='Next' type='submit' />
      </form>
    </div>
  )
}

const Skills = ({ initialState, nextPage }) => {
  const [skills, setInfo] = useState(initialState)

  // Updates the state for the part of the form which changed
  const onChange = event =>
    setInfo({
      ...skills,
      [event.target.name]: event.target.value || APPLICATION_SCHEMA.skills[event.target.name]
    })

  const onSubmit = event => {
    event.preventDefault()
    nextPage({ skills })
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.formHeading}>Skills & Feats</h1>
      <form onSubmit={onSubmit} onChange={onChange} className={styles.formContainer}>
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
        <Button label='Next' type='submit' />
      </form>
    </div>
  )
}

const Profile = ({ initialState, nextPage, resume, setResume }) => {
  const [profile, setInfo] = useState(initialState)

  // Updates the state for the part of the form which changed
  const onChange = event =>
    setInfo({
      ...profile,
      [event.target.name]: event.target.value || APPLICATION_SCHEMA.profile[event.target.name]
    })

  const onSubmit = event => {
    event.preventDefault()
    nextPage({ profile })
  }

  const employmentTypes = ['Internship (Co-op)', 'Full time', 'Part time']

  return (
    <div className={styles.page}>
      <h1 className={styles.formHeading}>Profile</h1>
      <form onSubmit={onSubmit} onChange={onChange} className={styles.formContainer}>
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
        <Button label='Next' type='submit' />
      </form>
    </div>
  )
}

const Submit = ({ initialState, submitApplication }) => {
  const [terms, setInfo] = useState(initialState)

  // Updates the state for the part of the form which changed
  const onChange = event =>
    setInfo({
      ...terms,
      [event.target.name]: event.target.checked || APPLICATION_SCHEMA.terms[event.target.name]
    })

  const onSubmit = event => {
    event.preventDefault()
    submitApplication({ terms })
  }

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

  return (
    <div className={styles.page} id={styles.submit}>
      <h1 className={styles.formHeading}> Submit </h1>
      <form onSubmit={onSubmit} onChange={onChange} className={styles.formContainer}>
        <div className={styles.section}>
          <Input
            defaultChecked={terms.codeOfConduct}
            inputStyle='checkbox'
            name='codeOfConduct'
            required
            label={
              <div>
                I have read and agree to the{' '}
                <Link href='https://static.mlh.io/docs/mlh-code-of-conduct.pdf'>MLH Code of Conduct</Link>.
              </div>
            }
          />
        </div>
        <div className={styles.section}>
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
          At cuHacking, we encourage young hackers in high school to participate. The more hackers, the merrier!
        </div>
        <div className={styles.section}>
          <Input
            defaultChecked={terms.under18}
            inputStyle='checkbox'
            name='under18'
            label={
              <div>
                I will be under the age of 18 by January 11, 2020, and I agree to sign a Parental Consent form should I
                be accepted to the event.
              </div>
            }
          />
        </div>
        <div className={styles.formHeading}>
          <Button label='Submit' type='submit' />
        </div>
      </form>
    </div>
  )
}

const Submitted = () => (
  <div className={styles.page} id={styles.start}>
    <h1 id={styles.superTitle}>Application</h1>
    <h2 id={styles.title}>Submitted</h2>
    <p>We have received your application! Keep an eye on your email for updates.</p>
  </div>
)

const Application = props => {
  const token = Cookies.get('token')

  const [isLoading, setLoading] = useState(true)
  const history = useHistory()
  const [startLabel, setLabel] = useState('Loading...')

  const [stage, changeStage] = useState(0)
  const [page, changePage] = useState(0)

  const [applicationForm, setApplication] = useState(APPLICATION_SCHEMA)
  const [resume, setResume] = useState()

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Access-Control-Request-Headers': 'GET',
        Authorization: `Bearer ${token}`
      }
    }

    const fetchApplication = async () => {
      const response = await fetch(`${API_URL}/users/application`, options)
      console.log('Status: ', response.status)
      if (response.status === 200) {
        const body = await response.json()
        const application = body.data

        console.log('Initial application: ', application)
        if (application.status === 'submitted') {
          console.log('Submitted')
          changeStage(6)
          changePage(6)
        } else {
          console.log('Unsubmitted')
          if (application.status === 'unstarted') {
            setLabel('Start')
          } else {
            setLabel('Continue')
          }
        }
        setApplication(application)
        setLoading(false)
      } else {
        console.log('Authentication failed: ', response.status)
        Cookies.remove('email')
        Cookies.remove('token')

        history.push('/login')
      }
    }

    fetchApplication()
  }, [history, token])

  const nextPage = pageNumber => formData => {
    const newApplication = { ...applicationForm, ...formData, stage: stage + 1 }

    const options = {
      method: 'POST',
      body: JSON.stringify(newApplication),
      headers: {
        'Access-Control-Request-Headers': 'POST',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }

    console.log('next!', options)
    fetch(`${API_URL}/users/application/save`, options)
      .then(res => {
        console.log('Save status:', res.status)

        // Save the application
        if (formData) {
          setApplication(newApplication)
        }

        // Move to the next page
        changeStage(pageNumber)
        changePage(pageNumber)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const submitApplication = formData => {
    const finalForm = { ...applicationForm, ...formData, status: 'submitted' }
    const payload = new FormData()
    const email = Cookies.get('email')

    console.log(resume)
    payload.append('form', JSON.stringify(finalForm))
    payload.append('email', email)
    if (resume) {
      payload.append('resume', resume, resume.path)
    }

    const options = {
      method: 'POST',
      body: payload,
      headers: {
        'Access-Control-Request-Headers': 'POST',
        Authorization: `Bearer ${token}`
      }
    }

    console.log('next!', options)
    fetch(`${API_URL}/users/application/submit`, options)
      .then(res => {
        console.log('Submit status:', res.status)

        setApplication(finalForm)

        // Move to the next page
        changeStage(6)
        changePage(6)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const pages = [
    <StartPage
      nextPage={() => {
        const pageNumber = applicationForm.stage || 1
        changeStage(pageNumber)
        changePage(pageNumber > 4 ? 4 : pageNumber)
      }}
      isLoading={isLoading}
      startLabel={startLabel}
    />,
    <BasicInfo initialState={applicationForm.basicInfo} nextPage={nextPage(2)} />,
    <AboutYou initialState={applicationForm.personalInfo} nextPage={nextPage(3)} />,
    <Skills initialState={applicationForm.skills} nextPage={nextPage(4)} />,
    <Profile initialState={applicationForm.profile} nextPage={nextPage(5)} resume={resume} setResume={setResume} />,
    <Submit initialState={applicationForm.terms} submitApplication={submitApplication} />,
    <Submitted />
  ]

  return (
    <div className={styles.application}>
      <Helmet>
        <title>Application | cuHacking 2020</title>
      </Helmet>
      <PageNav
        currentPage={page}
        changePage={changePage}
        stage={stage}
        submitted={applicationForm.status === 'submitted'}
      />
      {pages[page]}
    </div>
  )
}

export default Application
