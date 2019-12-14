const { logger } = require('../helpers/logger')

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

Firestore.updateApplication = (uuid, application) => {
  fb.collection('Users')
    .doc(uuid)
    .update({
      application
    })
}

Firestore.startApplication = uuid => {
  fb.collection('Users')
    .doc(uuid)
    .update({
      appStatus: 'unsubmitted',
      review: {
        wave: 2
      }
    })
}

Firestore.submitApplication = uuid => {
  fb.collection('Users')
    .doc(uuid)
    .update({ appStatus: 'submitted' })
}

Firestore.getApplicationWindow = async () => {
  return (
    await fb
      .collection('meta')
      .doc('applicationWindow')
      .get()
  ).data()
}
