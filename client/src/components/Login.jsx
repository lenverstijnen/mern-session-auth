import React, { useState } from "react"
import { validate, Test } from "validator-dutch"
import { Link } from "react-router-dom"
import auth from "../services/authService"

import "./css/login.css"

const Login = props => {
  const [user, setUser] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState(null)

  const tests = {
    email: Test().email("Vul een geldig e-mailadres in"),
    password: Test().required("Wachtwoord is verplicht")
  }

  const handleLogin = async e => {
    e.preventDefault()
    const errors = validate(user, tests)
    if (errors) return setErrors(errors)

    try {
      await auth.login(user.email, user.password)
      window.location = "/"
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors({ email: error.response.data })
      }
    }
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      {errors && (
        <div className="error-box">
          <ul className="error-messages">
            {Object.keys(errors).map(key => (
              <li key={key}>{errors[key]}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleLogin}>
        <input
          className="input"
          type="text"
          placeholder="E-mailadres"
          onChange={e => setUser({ ...user, email: e.target.value })}
        />
        <input
          className="input"
          type="password"
          placeholder="Wachtwoord"
          onChange={e => setUser({ ...user, password: e.target.value })}
        />
        <button type="submit" className="btn-med" onClick={handleLogin}>
          Submit
        </button>
      </form>
      <div className="align-right">
        <Link className="register-link" to="/register">
          Account aanmaken?
        </Link>
      </div>
    </div>
  )
}

export default Login
