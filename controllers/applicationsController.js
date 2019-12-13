const { logger } = require('../helpers/logger')
const Firestore = require('../model/firestore.js')

const ApplicationsController = module.exports

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
