const express = require('express')
const router = express.Router()

const BadgeController = require('../controllers/badgeController.js')

router.get('/:uuid', BadgeController.getBadge)

module.exports = router
