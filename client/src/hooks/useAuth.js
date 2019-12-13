import * as firebase from 'firebase/app'
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth'

export default () => {
  const [user, loading, error] = useAuthState(firebase.auth())

  const login = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password)

  const logout = () => firebase.auth().signOut()

  const register = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password)

  const resetPassword = email => firebase.auth().sendPasswordResetEmail(email)

  return {
    user,
    loading,
    error,
    login,
    logout,
    resetPassword,
    register
  }
}
