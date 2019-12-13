const { logger, stringify } = require('../helpers/logger')
const Firestore = require('../model/firestore.js')

const StatusController = module.exports

StatusController.getStatus = async (req, res, next) => {
  try {
    logger.verbose('Asking whether applications are open...')

    const now = Date.now()
    const applicationWindow = await Firestore.getApplicationWindow()

    const openDate = applicationWindow.open.seconds * 1000 + applicationWindow.open.nanoseconds
    const closeDate = applicationWindow.close.seconds * 1000 + applicationWindow.close.nanoseconds
    let status, date

    if (now < openDate) {
      status = 'pre'
      date = openDate
    } else if (now > closeDate) {
      status = 'post'
      date = null
    } else {
      status = 'open'
      date = closeDate
    }

    logger.debug(`NOW: ${now}`)
    logger.debug(`window: ${applicationWindow}`)

    logger.verbose('Inquiry complete')
    return res.status(200).send({ status, date })
  } catch (error) {
    logger.error(`Error getting status: ${error}`)
    next(error)
  }
}
