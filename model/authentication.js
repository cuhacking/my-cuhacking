const { logger } = require('../helpers/logger')

const Authentication = module.exports
let auth = undefined

Authentication.init = admin => {
  logger.verbose('Initializing Authentication')
  auth = admin.auth()
}

Authentication.verifyToken = async idToken => {
  try {
    const { uid } = await auth.verifyIdToken(idToken)
    return uid
  } catch (error) {
    logger.error(`Token verificaiton failed: ${error}`)
    throw error
  }
}
