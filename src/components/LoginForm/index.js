import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginForm extends Component {
  state = {
    userId: '',
    pin: '',
    onSubmitError: false,
    errorMsg: '',
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({
      onSubmitError: true,
      errorMsg,
    })
  }

  onSubmit = async event => {
    event.preventDefault()

    const {userId, pin} = this.state
    console.log(userId, pin)
    const userDetails = {user_Id: userId, pin}
    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    console.log(options)
    const response = await fetch(apiUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onChangeInput = event => {
    this.setState({userId: event.target.value})
  }

  render() {
    const {userId, pin, onSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="website-login"
          />
          <div className="login-form">
            <h1 className="login-h1">Welcome Back!</h1>
            <form className="form" onSubmit={this.onSubmit}>
              <div className="wrap-inputs">
                <label className="label" htmlFor="userId">
                  USER ID
                </label>
                <input
                  className="input"
                  id="userId"
                  placeholder="Enter User ID"
                  value={userId}
                  onChange={this.onChangeInput}
                />
              </div>
              <div className="wrap-inputs">
                <label className="label" htmlFor="pin">
                  PIN
                </label>
                <input
                  className="input"
                  type="password"
                  value={pin}
                  id="pin"
                  placeholder="Enter PIN"
                  onChange={this.onChangePin}
                />
              </div>
              <button type="submit" className="button">
                Login
              </button>
              {onSubmitError ? <p className="errMsg">{errorMsg}</p> : ''}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
