import http from "../services/httpService"

const apiEndpoint = process.env.REACT_APP_API_URL + "/auth"

async function login(email, password) {
  await http.post(apiEndpoint + "/login", { email, password })
}

async function logout() {
  try {
    await http.get(apiEndpoint + "/logout")
  } catch (error) {
    alert("Kan niet uitloggen!")
  }
}

async function getCurrentUser() {
  const { data: user } = await http.get(
    `${process.env.REACT_APP_API_URL}/users/currentuser`
  )
  return user
}

async function verifyUser() {
  try {
    await http.get(`${process.env.REACT_APP_API_URL}/auth/verify`)
  } catch (error) {
    logout()
    window.location = "/login"
  }
  return true
}

export default {
  login,
  logout,
  getCurrentUser,
  verifyUser
}
