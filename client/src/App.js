import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Profile from './views/Profile/Profile'
import Login from './views/Login/Login'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  )
}

export default App;
