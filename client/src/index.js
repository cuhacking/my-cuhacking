import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Login, NotFound, Register, ResetPassword } from 'pages'
import './index.css'

// function PrivateRoute({ children, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         fakeAuth.isAuthenticated ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/login',
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   )
// }

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/resetPassword' component={ResetPassword} />
        {/* <Route path='/application' component={Application} /> */}
        {/* <Route path='/status' component={Application} /> */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
