import { createContext, useReducer, useEffect } from 'react'

export const UserContext = createContext()

export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    case 'EDIT_USER':
      return { user: action.payload }
    default:
      return state
  }
}

export const UserContextProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [state, dispatch] = useReducer(userReducer, {
    user: (user ? user : null)
  })

  useEffect(() => {
    if (user) {
      dispatch({ type: 'SET_USER', payload: user })
    }
  }, [])

  // Save the state back to localStorage whenever it changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}