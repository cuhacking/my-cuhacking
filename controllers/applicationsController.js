const got = require('got')

const { logger, stringify } = require('../helpers/logger')
const Firestore = require('../model/firestore.js')
const Authentication = require('../model/authentication')

const ApplicationsController = module.exports

ApplicationsController.getApplication = async (req, res, next) => {
  try {
    logger.verbose('Getting application...')

    let code = 200
    let user = await Firestore.getUser(req.locals.uuid)

    if (!user) {
      code = 201
      logger.verbose('New applicant! Creating application...')
      const { email } = await Authentication.getUser(req.locals.uuid)
      user = await Firestore.createApplication(req.locals.uuid, email)
      logger.verbose('Application created!')
    }

    logger.debug(stringify(user))
    logger.verbose('Application retrieved')
    return res
      .status(code)
      .send({ application: user.application, appStatus: user.appStatus, consentForm: user.consentForm })
  } catch (error) {
    logger.error(`Error retrieving application: ${error}`)
    next(error)
  }
}

ApplicationsController.submitApplication = async (req, res, next) => {
  try {
    logger.verbose('Submitting application...')
    await Firestore.submitApplication(req.locals.uuid, JSON.parse(req.body.form))

    logger.verbose('Application submitted! Sending email...')
    await got(`https://cuhacking.com/mail/users/${req.body.email}`, {
      method: 'POST',
      json: {
        tags: ['applied-3', '2020']
      }
    })

    logger.verbose('Email sent!')
    return res.sendStatus(200)
  } catch (error) {
    logger.error(`Error submitting application: ${error}`)
    next(error)
  }
}

ApplicationsController.submitConsentForm = (req, res, next) => {
  try {
    const { uuid } = req.locals
    const { consentForm } = req.body

    logger.verbose(`Consent form received for ${uuid}. Marking as attending...`)

    Firestore.submitConsentForm(uuid, consentForm)
    Firestore.setStatus(uuid, 'attending')

    logger.verbose(`Application status for ${uuid} set to 'attending'`)
    return res.sendStatus(200)
  } catch (error) {
    logger.error(`Error setting status during consent form submission: ${error}`)
    next(error)
  }
}

// TODO: This is a dangerous endpoint. If a user find out they can post while authed, they could change their status to whatever they want
ApplicationsController.setStatus = (req, res, next) => {
  try {
    const { uuid } = req.locals
    logger.debug(stringify(req.body))
    const { status } = req.body

    logger.debug(stringify(req.body))
    logger.verbose(`Setting status for ${uuid} to '${status}'`)

    Firestore.setStatus(uuid, status)

    logger.verbose(`Application status for ${uuid} set to '${status}`)
    return res.sendStatus(200)
  } catch (error) {
    logger.error(`Error setting status: ${error}`)
    next(error)
  }
}
