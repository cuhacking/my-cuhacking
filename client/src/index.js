import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import * as firebase from 'firebase/app'
import firebaseConfig from './firebase-config.json'
import { Forgot, Login, NotFound, Register } from 'pages'
import useAuth from 'hooks/useAuth'
import './index.css'

firebase.initializeApp(firebaseConfig)

const App = () => {
  const auth = useAuth()

  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/forgot' component={Forgot} />
        {/* <Route path='/application' component={Application} /> */}
        {/* <Route path='/status' component={Application} /> */}
        <Redirect to='/login' />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
