import { UserContext } from "../contexts/userContext";
import { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const {dispatch} = useUserContext()

  const login = async (username, password) => {
    setIsLoading(true)
    setError(null)
    ///api/user/signup

    const response = await fetch('/api/userProfiles/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    })
    const json = await response.json()

    if (!response.ok) {
        setIsLoading(false)
        setError(json.error)
    }

    if(response.ok) {
        localStorage.setItem('user', JSON.stringify(json))

        dispatch({type: 'SET_USER', payload:json})
        setIsLoading(false)
    }
  }

  return {login, isLoading, error}
}