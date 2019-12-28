const { logger } = require('../helpers/logger')
const defaultUser = require('./defaultUser.json')

const Firestore = module.exports

let fb
Firestore.init = admin => {
  logger.verbose('Initializing Firestore')
  fb = admin.firestore()
}

// Async
Firestore.getUser = async uuid => {
  const doc = await fb
    .collection('Users')
    .doc(uuid)
    .get()

  return doc.data()
}

Firestore.createApplication = async (uuid, email) => {
  const newUser = {
    ...defaultUser,
    uid: uuid,
    email
  }

  await fb
    .collection('Users')
    .doc(uuid)
    .set(newUser)

  return newUser
}

Firestore.submitApplication = (uuid, application) => {
  fb.collection('Users')
    .doc(uuid)
    .update({ appStatus: 'submitted', application })
}

Firestore.submitConsentForm = uuid => {
  fb.collection('Users')
    .doc(uuid)
    .update({ consentForm: true })
}

Firestore.setStatus = (uuid, appStatus) => {
  fb.collection('Users')
    .doc(uuid)
    .update({ appStatus })
}

Firestore.getApplicationWindow = async () => {
  return (
    await fb
      .collection('meta')
      .doc('applicationWindow')
      .get()
  ).data()
}
