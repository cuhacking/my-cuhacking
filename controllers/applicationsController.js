const { logger, stringify } = require('../helpers/logger')
const Firestore = require('../model/firestore.js')
const Authentication = require('../model/authentication')

const ApplicationsController = module.exports

ApplicationsController.getApplication = async (req, res, next) => {
  try {
    logger.verbose('Getting application...')

    let user = await Firestore.getUser(req.locals.uuid)

    if (!user) {
      logger.verbose('New applicant! Creating application...')
      const { email } = await Authentication.getUser(req.locals.uuid)
      user = await Firestore.createApplication(req.locals.uuid, email)
      logger.verbose('Application created!')
    }

    logger.debug(stringify(user))
    logger.verbose('Application retrieved')
    return res.status(200).send({ application: user.application, status: user.appStatus })
  } catch (error) {
    logger.error(`Error retrieving application: ${error}`)
    next(error)
  }
}

ApplicationsController.updateApplication = (req, res, next) => {
  try {
    logger.verbose('Updating application...')

    Firestore.updateApplication(req.locals.uuid, req.body.application)

    logger.verbose('Application updated')
    return res.sendStatus(200)
  } catch (error) {
    logger.error(`Error updating application: ${error}`)
    next(error)
  }
}

ApplicationsController.setStatus = (req, res, next) => {
  try {
    const { uuid } = req.locals
    const { status } = req.body

    logger.verbose(`Setting application status for ${uuid} to ${status}`)

    switch (status) {
      case 'unsubmitted':
        Firestore.startApplication(uuid)

      case 'submitted':
        Firestore.submitApplication(uuid)
    }

    logger.verbose(`Application status for ${uuid} set to ${status}`)
    return res.sendStatus(200)
  } catch (error) {
    logger.error(`Error setting status: ${error}`)
    next(error)
  }
}
