const express = require('express')
const path = require('path')
const app = express()

const admin = require('firebase-admin')
const serviceAccount = require('./firebase-admin.json')
const { init: initFirestore } = require('./model/firestore')
const { init: initAuth } = require('./model/authentication')

const { logger, stringify } = require('./helpers/logger')
const { applications, status } = require('./routes')

const env = process.env.PROD ? 'production' : 'development'
const config = require('./config.json')[env]

// Allow the server to parse JSON
app.use(express.json({ limit: '5mb' }))
app.use('/resources', express.static('./resources'))

// Log each request the server receives
app.use('*', (req, res, next) => {
  logger.info(`HTTP request received: ${req.method} -> ${req.originalUrl}`)
  next()
})

// Log all errors
app.use((error, req, res, next) => {
  logger.error(`Express error: ${stringify(error)}`)
  res.sendStatus(error.status || 500)
})

// Initialize Firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.firebaseUrl,
  databaseAuthVariableOverride: 'my-cuhacking'
})

// Initializing firebase
initFirestore(admin)
initAuth(admin)

// Frontend
app.use(express.static(path.join(__dirname, './client/build')))
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

// Backend routes
const backendRouter = express.Router()

backendRouter.use('/applications', applications)
backendRouter.use('/status', status)

app.use('/api', backendRouter)

const port = process.env.PORT || 3000
app.listen(port)

logger.info(`My cuHacking is listening on port ${port}${process.env.DEV ? ' in development mode' : ''}`)
