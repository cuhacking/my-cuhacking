import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import * as firebase from 'firebase/app'
import firebaseConfig from './firebase-config.json'
// TODO: Make it easy to switch back and forth between dev mode and prod
import { Application, Forgot, Login, NotFound, Register } from 'pages'
import useAuth from 'hooks/useAuth'
import './index.css'

firebase.initializeApp(firebaseConfig)

const AuthRoute = ({ component: Component, ...props }) => {
  const auth = useAuth()

  if (auth.loading) {
    return <div />
  } else {
    return <Route {...props} render={props => (auth.user ? <Component {...props} /> : <Redirect to='/login' />)} />
  }
}

const UnAuthRoute = ({ component: Component, ...props }) => {
  const auth = useAuth()

  if (auth.loading) {
    return <div />
  } else {
    return (
      <Route
        {...props}
        render={props => (auth.user ? <Redirect to='/application/status' /> : <Component {...props} />)}
      />
    )
  }
}

const App = () => {
  const auth = useAuth()

  return (
    <Router>
      <Switch>
        <UnAuthRoute path='/login' component={Login} />
        <UnAuthRoute path='/register' component={Register} />
        <UnAuthRoute path='/forgot' component={Forgot} />
        <AuthRoute path='/application' component={Application} />
        <Route exact path='/' render={() => (auth.user ? <Redirect to='/application' /> : <Redirect to='/login' />)} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
