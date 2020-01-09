const qr = require('qr-image')
const { logger, stringify } = require('../helpers/logger')

const BadgeController = module.exports

BadgeController.getBadge = async (req, res, next) => {
  try {
    logger.verbose('Generating a badge...')
    const badge = qr.image(req.params.uuid, { size: 10 })

    logger.verbose('Generation complete!')
    res.setHeader('Content-Disposition', 'attachment; filename="cuhacking-badge.png"')
    badge.pipe(res)
  } catch (error) {
    logger.error(`Could not generate badge: ${error}`)
    next(error)
  }
}
