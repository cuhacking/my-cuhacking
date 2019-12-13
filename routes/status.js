const express = require('express')
const router = express.Router()

const StatusController = require('../controllers/statusController.js')

router.get('/', StatusController.getStatus)

module.exports = router
