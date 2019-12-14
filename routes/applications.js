const express = require('express')
const router = express.Router()

const ApplicationsController = require('../controllers/applicationsController.js')
const AuthController = require('../controllers/authController.js')

router.get('/:token', AuthController.verify, ApplicationsController.getApplication)
router.put('/', AuthController.verify, ApplicationsController.updateApplication)
router.post('/', AuthController.verify, ApplicationsController.setStatus)

module.exports = router
