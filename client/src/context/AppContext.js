import React, { useReducer } from "react"
import { reducer } from "../reducers/AppReducer"

const initialState = { user: {}, loggedIn: false }

const AppContext = React.createContext(initialState)

const AppContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider }
