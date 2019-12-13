const { logger } = require('../helpers/logger')
const Authentication = require('../model/authentication')

const AuthController = module.exports

AuthController.verify = async (req, res, next) => {
  try {
    const uuid = Authentication.verifyToken(req.body.idToken)
    res.locals.uuid = uuid
    next()
  } catch (error) {
    logger.error(`Error verifying token: ${error}`)
    next(error)
  }
}
