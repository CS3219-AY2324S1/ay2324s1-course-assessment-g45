import { UserContext } from "../contexts/userContext";
import { useState } from "react";
import { useUserContext } from "./useUserContext";
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../apis/UserProfileApi'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const {dispatch} = useUserContext()
  const navigate = useNavigate()

  const login = async (username, password) => {
    setIsLoading(true)
    setError(null)

    const response = await loginUser({username, password})
    const json = await response.json()

    if (!response.ok) {
        setIsLoading(false)
        setError(json.error)
    }

    if(response.ok) {
        localStorage.setItem('user', JSON.stringify(json))

        dispatch({type: 'SET_USER', payload:json})
        setIsLoading(false)

        if (json.role == 'maintainer') {
          navigate("/maintainer")
        } else {
          navigate("/")
        }
    }
  }

  return {login, isLoading, error}
}