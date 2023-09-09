import { createContext, useReducer } from 'react'

export const UserContext = createContext()

export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      console.log(action.payload)
      return { user : action.payload }
    case 'LOGOUT':
      return { user: null }
    case 'EDIT_USER':
      return { user: action.payload }
    default:
      return state
  }
}

export const UserContextProvider = ({children}) => {
  const [ state, dispatch ] = useReducer(userReducer, {
    user: null
  })
  console.log('Auth context state: ', state)

  return (
    <UserContext.Provider value = {{...state, dispatch}}>
      { children }
    </UserContext.Provider>
  )
}