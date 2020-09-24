import React from 'react'
import logo from '../../assets/logo.png'
import { TextField, FormControl, FormHelperText } from '@material-ui/core'
import MatButton from '../../components/MatButton/MatButton'
import { authenticateUserRequest } from '../../utilities/requests'
import './Login.css'


class Login extends React.Component {

  state = {
    email: '',
    password: '',
    errors: {
      email: '',
      password: ''
    },
    loginDisabled: true
  }

  login = () => {
    const { email, password  } = this.state

    authenticateUserRequest(email, password)
      .then(guid => {
        localStorage.setItem('userGuid', guid)
        this.props.history.push('/profile')
      })
      .catch(err => console.log('authenticate user failed at Login.js', {err}))
  }

  handleChange = e => {
    e.preventDefault()
    const { name, value } = e.target
    let { errors } = this.state

    switch (name) {
      case 'email': 
        errors.email = 
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
            ? ''
            : 'A valid email is required.';
        break
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'Password must be 8 characters long.'
            : ''
        break
      default:
        break
    }

    this.setState({errors, [name]: value}, this.checkLoginButton)
  }

  // asyncronous state updates don't catch pasting values
  checkLoginButton = () => {
    const {email, password, errors} = this.state
    if (!(errors.email || errors.password) && (email.length > 0 && password.length > 0)) {
      this.setState({loginDisabled: false})
    } else {
      this.setState({loginDisabled: true})
    }
  }

  render() {
    const { errors, loginDisabled } = this.state

    return (
      <div className="login__container" data-testid="login-container">
        <div className="login__logo">
          <img src={logo} alt="Logo"></img>
        </div>
        <form>
          <FormControl className="login__input">
            <TextField
              inputProps={{ "data-testid": "login-email" }} // fix mat-ui not picking up test-ids
              required
              name="email"
              label="Email"
              placeholder="enter email"
              variant="outlined"
              onChange={this.handleChange}
            />
            {errors.email && 
              <FormHelperText
                error={true}
                data-testid="email-error-text"
                >
                  {errors.email}
              </FormHelperText>
            }
          </FormControl>
          <br /> 
          <FormControl className="login__input">
            <TextField
              inputProps={{ "data-testid": "login-password" }}
              required
              type="password"
              name="password"
              label="Password"
              placeholder="enter password"
              variant="outlined"
              onChange={this.handleChange}
            />
            {errors.password && 
              <FormHelperText
                error={true}
                data-testid="password-error-text"
                >
                  {errors.password}
              </FormHelperText>
            }
          </FormControl>
          <br />
          <div
            className="login__submit"
            data-testid="login-submit"
            >
            <MatButton
              disabled={loginDisabled}
              fullWidth={true}
              handler={this.login}
              >
                LOGIN
              </MatButton>
          </div>
        </form>
      </div>
    )
  }
}

export default Login