const express = require('express')
const router = express.Router()

const ApplicationsController = require('../controllers/applicationsController.js')
const AuthController = require('../controllers/authController.js')

router.put('/', AuthController.verify, ApplicationsController.updateApplication)
router.post('/', AuthController.verify, ApplicationsController.setStatus)

module.exports = router
