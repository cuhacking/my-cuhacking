const express = require('express')
const router = express.Router()

const multer = require('multer')

const resumeStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'resumes/')
  },
  filename: function(req, file, cb) {
    cb(null, req.body.email + '.pdf')
  }
})

const consentFormStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'consentForms/')
  },
  filename: function(req, file, cb) {
    cb(null, req.body.email + '.pdf')
  }
})

const uploadResume = multer({ storage: resumeStorage })
const uploadConsentForm = multer({ storage: consentFormStorage })

const ApplicationsController = require('../controllers/applicationsController.js')
const AuthController = require('../controllers/authController.js')

router.get('/:token', AuthController.verify, ApplicationsController.getApplication)
router.post('/:token', AuthController.verify, uploadResume.single('resume'), ApplicationsController.submitApplication)
router.post('/:token/status', AuthController.verify, ApplicationsController.setStatus)
router.post(
  '/:token/consentForm',
  AuthController.verify,
  uploadConsentForm.single('consentForm'),
  ApplicationsController.submitConsentForm
)
module.exports = router
