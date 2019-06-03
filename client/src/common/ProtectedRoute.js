import React, { useEffect, useState } from "react"
import { Route, Redirect } from "react-router-dom"
import auth from "../services/authService"

const ProtectedRoute = ({
  component: Component,
  allowedRole,
  render,
  ...rest
}) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [authorized, setAuthorized] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await auth.getCurrentUser()
        setUser(user)
        setLoading(false)
        if (allowedRole) setAuthorized(allowedRole === user.role)
      } catch (error) {
        setAuthorized(false)
      }
    }
    getUser()
  }, [allowedRole])

  return (
    <Route
      {...rest}
      render={props => {
        if (!authorized) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        } else if (loading) {
          return <h1>Loading...</h1>
        } else if (user) {
          return Component ? <Component {...props} /> : render(props)
        }
      }}
    />
  )
}

export default ProtectedRoute
