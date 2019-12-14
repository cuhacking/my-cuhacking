const express = require('express')
const router = express.Router()

const multer = require('multer')

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'resumes/')
  },
  filename: function(req, file, cb) {
    cb(null, req.body.email + '.pdf')
  }
})

const upload = multer({ storage })

const ApplicationsController = require('../controllers/applicationsController.js')
const AuthController = require('../controllers/authController.js')

router.get('/:token', AuthController.verify, ApplicationsController.getApplication)
router.post('/:token', AuthController.verify, upload.single('resume'), ApplicationsController.submitApplication)

module.exports = router
