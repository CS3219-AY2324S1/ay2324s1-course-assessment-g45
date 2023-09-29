import { createContext, useReducer, useEffect } from 'react'

export const MaintainerContext = createContext()

export const maintainerReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_USERS":
      return { userList : action.payload }
    case "UPDATE_ROLE":
        return { userList : action.payload }
    default:
      return state
  }
}

export const MaintainerContextProvider  = ({children}) => {
  const [ state, dispatch ] = useReducer(maintainerReducer, {
    userList:null
  })

  return (
    <MaintainerContext.Provider value = {{...state, dispatch}}>
      { children }
    </MaintainerContext.Provider>
  )
}