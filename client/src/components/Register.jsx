import React, { useState } from "react"
import { validate, Test } from "validator-dutch"
import http from "../services/httpService"
import auth from "../services/authService"

import "./css/register.css"

const Register = props => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  })
  const [errors, setErrors] = useState(null)

  const tests = {
    name: Test().fullName(),
    email: Test().email("Vul een geldig e-mailadres in"),
    password: Test()
      .required("Wachtwoord is verplicht")
      .minLength(8, "Wachtwoord moet minimaal 8 karakters lang zijn"),
    password2: Test().shouldEqual(
      "password",
      "De wachtwoorden komen niet overeen"
    )
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errors = validate(user, tests)
    if (errors) return setErrors(errors)

    try {
      await http.post(`${process.env.REACT_APP_API_URL}/users`, user)

      await auth.login(user.email, user.password)
      window.location = "/"
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors({ email: error.response.data })
      }
    }
  }

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      {errors && (
        <div className="error-box">
          <ul className="error-messages">
            {Object.keys(errors).map(key => (
              <li key={key}>{errors[key]}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Voor en achternaam"
          onChange={e => setUser({ ...user, name: e.target.value })}
        />
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
        <input
          className="input"
          type="password"
          placeholder="Bevestig wachtwoord"
          onChange={e => setUser({ ...user, password2: e.target.value })}
        />
        <button type="submit" className="btn-med" onClick={handleSubmit}>
          Registreer en login
        </button>
      </form>
    </div>
  )
}

export default Register
