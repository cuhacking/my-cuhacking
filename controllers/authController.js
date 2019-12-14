const { logger, stringify } = require('../helpers/logger')
const Authentication = require('../model/authentication')

const AuthController = module.exports

AuthController.verify = async (req, res, next) => {
  try {
    const uuid = await Authentication.verifyToken(req.params.token)
    req.locals = { uuid }
    logger.debug(`locals: ${stringify(req.locals)}`)
    next()
  } catch (error) {
    logger.error(`Error verifying token: ${error}`)
    next(error)
  }
}
