// Dependencies
import React, { useContext, useEffect } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { AppContext } from "./context/AppContext"
import auth from "./services/authService"
// Components
import ProtectedRoute from "./common/ProtectedRoute"
import NotFound from "./components/NotFound"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import Logout from "./components/Logout"
// CSS
import "./App.css"

function App() {
  const { dispatch } = useContext(AppContext)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await auth.getCurrentUser()
        dispatch({ type: "ADD_USER", payload: user })
      } catch (error) {}
    }
    fetchUser()
  }, [dispatch])

  return (
    <div className="App">
      <Switch>
        <Route path="/404" component={NotFound} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/register" component={Register} />
        <ProtectedRoute path="/" exact component={Home} />
        <Redirect to="/404" />
      </Switch>
    </div>
  )
}

export default App
