import auth from "../services/authService"

const Logout = props => {
  auth.logout()
  props.history.push("/login")
  return null
}

export default Logout
