import { createContext, useReducer, useEffect } from 'react'

export const UserContext = createContext()

export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
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
    // user: {
    //   _id:"64f98bd9de4f0ac4adf1feac",
    //   username:"test3",
    //   password:"",
    //   email:"test3@gmail.com",
    //   createdAt:"2023-09-07T08:37:45.582Z",
    //   updatedAt:"2023-09-10T03:50:00.081Z",
    //   __v:0
    // }
    user:null
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: 'SET_USER', payload: user })
    }
  }, [])

  console.log('Auth context state: ', state)

  return (
    <UserContext.Provider value = {{...state, dispatch}}>
      { children }
    </UserContext.Provider>
  )
}